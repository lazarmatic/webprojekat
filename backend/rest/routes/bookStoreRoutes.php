<?php

// Get a specific book Store by userID
Flight::route('GET /bookPurchasesByUser/@user_id', function ($user_id) {
    Flight::json(Flight::bookStoreService()->getPurchaseByUserId($user_id));
});
// Get a specific book Store by bookID
Flight::route('GET /bookPurchasesByBook/@book_id', function ($book_id) {
    Flight::json(Flight::bookStoreService()->getPurchaseByBookId($book_id));
});
// Get all book Stores
Flight::route('GET /bookPurchases', function () {
    Flight::json(Flight::bookStoreService()->getAll());
});

// Add a new book Store..
Flight::route('POST /bookPurchases', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::bookStoreService()->create($data));
});

// Update a book Store by ID
Flight::route('PUT /bookPurchases/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::bookStoreService()->update($id, $data));
});

// Delete book Store by ID
Flight::route('DELETE /bookPurchases/@id', function ($id) {
    Flight::json(Flight::bookStoreService()->delete($id));
});
