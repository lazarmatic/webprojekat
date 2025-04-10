<?php

// Get a specific bookReview by bookID
Flight::route('GET /bookReviewsByBookId/@book_id', function ($book_id) {
    Flight::json(Flight::bookReviewService()->getReviewByBookId($book_id));
});
// Get all bookReviews
Flight::route('GET /bookReviews', function () {
    Flight::json(Flight::bookReviewService()->getAll());
});

// Add a new bookReview..
Flight::route('POST /bookReviews', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::bookReviewService()->create($data));
});

// Update a bookReview by ID
Flight::route('PUT /bookReviews/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::bookReviewService()->update($id, $data));
});

// Delete bookReview by ID
Flight::route('DELETE /bookReviews/@id', function ($id) {
    Flight::json(Flight::bookReviewService()->delete($id));
});
