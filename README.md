# Flex Living - Reviews Dashboard

## Tech Stack

*   **Backend:** Node.js, Express
*   **Frontend:** HTML, CSS, JavaScript

## Key Design and Logic Decisions

*   **Backend:** A simple Express server provides a REST API to serve the review data. The review data is mocked from a `reviews.json` file as per the assessment instructions. The server is responsible for parsing and normalizing the review data from the (mocked) Hostaway API.

*   **Frontend:** The dashboard is a single-page application that fetches reviews from the backend. It allows managers to filter reviews by property, rating, and channel. A checkbox for each review allows managers to select which reviews should be displayed on the public website (this is a UI element and the logic for storing and retrieving this state would need to be implemented).

*   **Data Normalization:** The backend is responsible for parsing and normalizing the review data from the Hostaway API (mocked). The provided JSON data is already in a usable format, so no major normalization was required for this initial version.

## API Behaviors

*   `GET /api/reviews`: Returns a JSON array of all reviews from the `reviews.json` file.
*   `POST /api/reviews/:id/approve`: Updates the `display` status of a review.

## Google Reviews Findings

The integration of Google Reviews is feasible through the Google Places API. Here's a summary of the proposed implementation:

1.  **API Key:** A Google Cloud project with the Places API enabled is required to obtain an API key.
2.  **Place ID Lookup:** The first step is to find the unique `place_id` for each property. This can be done using the a "Find Place" request, searching by property name and address.
3.  **Place Details Request:** Once the `place_id` is obtained, a "Place Details" request can be made to retrieve the reviews. The `reviews` field in the response contains an array of up to five reviews.
4.  **Data Normalization:** The Google Reviews data will be in a different format than the Hostaway data. A normalization function will be created on the backend to transform the Google Reviews data to match the structure of the existing `reviews.json` file. This will allow the frontend to handle both data sources seamlessly.
5.  **Backend Implementation:** A new API endpoint, such as `GET /api/reviews/google`, will be created to handle the fetching and normalization of Google Reviews. This endpoint will take a property identifier (e.g., name or address) as a query parameter.
6.  **Frontend Implementation:** The `property.js` file will be updated to call the new endpoint and display the Google Reviews alongside the Hostaway reviews.

Due to the constraints of this assessment (no real-time API access), the Google Reviews integration will be mocked. A `google-reviews.json` file will be created to simulate the data that would be returned by the Google Places API.

## Running the Application

1.  Install Node.js and npm.
2.  Run `npm install` to install the dependencies.
3.  Run `npm start` to start the server.
4.  Open `index.html` in your browser to view the dashboard.
5.  Open `property.html` to view the public-facing review display page.