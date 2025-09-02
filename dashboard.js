document.addEventListener('DOMContentLoaded', () => {
  const reviewsList = document.getElementById('reviews-list');
  const propertySelect = document.getElementById('property-select');
  const ratingSelect = document.getElementById('rating-select');
  const channelSelect = document.getElementById('channel-select');

  let reviews = [];

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      reviews = await response.json();
      populateFilters();
      renderReviews();
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const populateFilters = () => {
    const properties = [...new Set(reviews.result.map(review => review.listingName))];
    properties.forEach(property => {
      const option = document.createElement('option');
      option.value = property;
      option.textContent = property;
      propertySelect.appendChild(option);
    });

    const channels = [...new Set(reviews.result.map(review => review.channel.name))];
    channels.forEach(channel => {
      const option = document.createElement('option');
      option.value = channel;
      option.textContent = channel;
      channelSelect.appendChild(option);
    });
  };

  const renderReviews = () => {
    reviewsList.innerHTML = '';
    const filteredReviews = reviews.result.filter(review => {
      const propertyFilter = propertySelect.value === '' || review.listingName === propertySelect.value;
      const ratingFilter = ratingSelect.value === '' || review.review.rating.toString() === ratingSelect.value;
      const channelFilter = channelSelect.value === '' || review.channel.name === channelSelect.value;
      return propertyFilter && ratingFilter && channelFilter;
    });

    filteredReviews.forEach(review => {
      const reviewCard = document.createElement('div');
      reviewCard.classList.add('review-card');

      let actionButton;
      if (review.display) {
        actionButton = `<button onclick="approveReview(${review.id}, false)">Hide from website</button>`;
      } else {
        actionButton = `<button onclick="approveReview(${review.id}, true)">Show on website</button>`;
      }

      reviewCard.innerHTML = `
        <h4>${review.listingName}</h4>
        <p class="rating">${review.review.rating} Stars</p>
        <p>${review.review.comments}</p>
        <p><strong>- ${review.author.firstName}</strong> on ${review.channel.name}</p>
        ${actionButton}
      `;
      reviewsList.appendChild(reviewCard);
    });
  };

  window.approveReview = async (reviewId, isApproved) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ display: isApproved }),
      });

      if (response.ok) {
        const reviewIndex = reviews.result.findIndex(r => r.id === reviewId);
        if (reviewIndex !== -1) {
          reviews.result[reviewIndex].display = isApproved;
          renderReviews();
        }
      } else {
        console.error('Failed to approve review');
      }
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  propertySelect.addEventListener('change', renderReviews);
  ratingSelect.addEventListener('change', renderReviews);
  channelSelect.addEventListener('change', renderReviews);

  fetchReviews();
});