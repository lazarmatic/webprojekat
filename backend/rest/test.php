<?php
require_once 'dao/userDao.php';
require_once 'dao/bookDao.php';
require_once 'dao/reviewDao.php';
require_once 'dao/bookStoreDao.php';
require_once 'dao/bookRentalDao.php';


$userDao = new userDao();
$bookDao = new bookDao();
$reviewDao = new reviewDao();
$bookStoreDao = new bookStoreDao();
$bookRentalDao = new bookRentalDao();

$bookRentalDao->insertRental(7, 7, date('Y-m-d H:i:s'), date('Y-m-d H:i:s'), 'Rented');


// $reviewDao->deleteReview(4);
// $userDao->deleteUser(4);
// $bookDao->deleteBook(6);

// $reviewDao->updateReview(
//     1,
//     4,
//     9,
//     'Updated review',
//     date('Y-m-d H:i:s')
// );
// $userDao->updateUser(
//     1,
//     'updatedUsername',
//     'Updated User',
//     'updated@gmail.com',
//     '123456789',
//     'password123',
//     'admin'
// );
// $bookDao->updateBook(
//     11,
//     'The Great Gatsby (Updated)',
//     'F. Scott Fitzgerald',
//     6.99,
//     13.99,
//     'An updated short description...',
//     'An updated long detailed description...',
//     8,
//     1,
//     1
// );

// $userDao->insertUser(
//     'testusername',
//     'Lazar Matic',
//     'testing@gmail.com',
//     '063312245',
//     'passwordtest',
//     'admin'

// );

// $reviewDao->insertReview(
//     4,
//     11,
//     'Testing book review',
//     date('Y-m-d H:i:s')

// );
// $bookDao->insertBook(
//     "The Newest Book",
//     "Lazar Matic",
//     5.99,
//     12.99,
//     "A short description...",
//     "A long detailed description...",
//     10,
//     1,
//     1
// );

// print_r($bookDao->getByBookTitle('The Great Gatsby'));

// // Insert a new user (Customer)
// $userDao->insert([
//     'username' => 'johndoeNEWEST',
//     'full_name' => 'John Newest',
//     'email' => 'johnNEWEST@example.com',
//     'phone' => 063515244,
//     'passw' => password_hash('password123', PASSWORD_DEFAULT),
//     'role' => 'User'
// ]);

// //insert a new book
// $bookDao->insert([
//     'title' => 'Test book',
//     'author' => 'Lazar Matic',
//     'rent_price' => 5.99,
//     'buy_price' => 24.99,
//     'description_short' => 'short description',
//     'description_long' => 'Test book long description',
//     'stock_quantity' => 5,
//     'available_for_rent' => 0,
//     'available_for_purchase' => 1
// ]);

// // Insert a new review
// $reviewDao->insert([
//     'user_id' => 3,
//     'book_id' => 10,
//     'review_text' => 'Review text',
//     'review_date' => date('Y-m-d H:i:s')
// ]);





// // Fetch all users
// $user = $userDao->getAll();
// print_r($user);


// // Fetch all books
// $book = $bookDao->getAll();
// print_r($book);

// // Fetch all reviews
// $review = $reviewDao->getAll();
// print_r($review);
