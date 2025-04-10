<?php

// Get a specific user by email
Flight::route('GET /users/@email', function ($email) {
    Flight::json(Flight::userService()->getUserByEmail($email));
});
// Get a specific user by title
Flight::route('GET /users', function () {
    Flight::json(Flight::userService()->getAll());
});

// Add a new user..
Flight::route('POST /users', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::userService()->create($data));
});

// Update a user by ID
Flight::route('PUT /users/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::userService()->update($id, $data));
});

// Delete user by ID
Flight::route('DELETE /users/@id', function ($id) {
    Flight::json(Flight::userService()->delete($id));
});
