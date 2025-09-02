document.addEventListener('DOMContentLoaded', () => {
  const reviewsList = document.getElementById('reviews-list');

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const reviews = await response.json();
      renderReviews(reviews.result);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const renderReviews = (reviews) => {
    const approvedReviews = reviews.filter(review => review.display);

    approvedReviews.forEach(review => {
      const reviewCard = document.createElement('div');
      reviewCard.classList.add('review-card');
      reviewCard.innerHTML = `
        <div class="review-author">
          <img src="${review.author.pictureUrl}" alt="${review.author.firstName}">
        </div>
        <div class="review-content">
          <h4>${review.author.firstName}</h4>
          <div class="star-rating">${getStarRating(review.review.rating)}</div>
          <p>${review.review.comments}</p>
        </div>
      `;
      reviewsList.appendChild(reviewCard);
    });
  };

  const getStarRating = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars += '&#9733;'; // Full star
      } else {
        stars += '&#9734;'; // Empty star
      }
    }
    return stars;
  };

  fetchReviews();
});