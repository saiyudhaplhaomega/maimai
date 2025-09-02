const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
let reviews = require('./reviews.json');

app.use(express.static('.'));
app.use(express.json()); // To parse JSON bodies

app.get('/api/reviews', (req, res) => {
  fs.readFile('./reviews.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading reviews file');
    }
    res.send(data);
  });
});

app.post('/api/reviews/:id/approve', (req, res) => {
  const reviewId = parseInt(req.params.id, 10);
  const { display } = req.body;

  fs.readFile('./reviews.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading reviews file');
    }

    let reviewsData = JSON.parse(data);
    const reviewIndex = reviewsData.result.findIndex(r => r.id === reviewId);

    if (reviewIndex !== -1) {
      reviewsData.result[reviewIndex].display = display;

      fs.writeFile('./reviews.json', JSON.stringify(reviewsData, null, 2), (err) => {
        if (err) {
          console.error('Error writing to reviews.json:', err);
          return res.status(500).json({ error: 'Failed to update review' });
        }
        res.json({ success: true, message: `Review ${reviewId} updated.` });
      });
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});