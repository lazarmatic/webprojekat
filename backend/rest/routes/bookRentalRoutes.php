<?php

// Get a specific book rental by userID
Flight::route('GET /bookRentalsByUser/@user_id', function ($user_id) {
    Flight::json(Flight::bookRentalService()->getRentalByUserId($user_id));
});
// Get a specific book rental by bookID
Flight::route('GET /bookRentalsByBook/@book_id', function ($book_id) {
    Flight::json(Flight::bookRentalService()->getRentalByBookId($book_id));
});
// Get all book rentals
Flight::route('GET /bookRentals', function () {
    Flight::json(Flight::bookRentalService()->getAll());
});

// Add a new book rental..
Flight::route('POST /bookRentals', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::bookRentalService()->create($data));
});

// Update a book rental by ID
Flight::route('PUT /bookRentals/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::bookRentalService()->update($id, $data));
});

// Delete book rental by ID
Flight::route('DELETE /bookRentals/@id', function ($id) {
    Flight::json(Flight::bookRentalService()->delete($id));
});
