<?php

// Get a specific book by id
Flight::route('GET /books/@id', function ($book_id) {
    Flight::json(Flight::bookService()->getByID($book_id));
});
// Get a specific book by author
Flight::route('GET /books/@author', function ($book_author) {
    Flight::json(Flight::bookService()->getByBookAuthor($book_author));
});
// Get a specific book by title
Flight::route('GET /books', function () {
    Flight::json(Flight::bookService()->getAll());
});

// Add a new book..
Flight::route('POST /books', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::bookService()->create($data));
});

// Update a book by ID
Flight::route('PUT /books/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::bookService()->update($id, $data));
});

// Delete book by ID
Flight::route('DELETE /books/@id', function ($id) {
    Flight::json(Flight::bookService()->delete($id));
});
