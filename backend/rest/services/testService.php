<?php
require_once 'bookService.php';
require_once 'bookRentalService.php';
require_once 'bookStoreService.php';
require_once 'bookReviewService.php';
require_once 'userService.php';

$book_rental_service = new bookRentalService();
$book_purchase_service = new bookStoreService();
$book_service = new bookService();
$book_review_service = new bookReviewService();
$user_service = new userService();


// $books_by_id = $book_service->getByID(9);
// $books_by_author = $book_service->getByBookAuthor('Lazar Matic');
// $books_by_title = $book_service->getByBookTitle('Moby Dick');
// print_r($books_by_id);

// $book_rentals_by_id = $book_rental_service->getByID(11);
// $book_rentals_by_userID = $book_rental_service->getRentalByUserID(11);
// $book_rentals_by_bookID = $book_rental_service->getRentalByBookID(7);
// print_r($book_rentals_by_bookID);

// $book_purchase_by_id = $book_purchase_service->getByID(7);
// $book_purchase_by_userID = $book_purchase_service->getPurchaseByUserID(7);
// $book_purchase_by_bookID = $book_purchase_service->getPurchaseByBookID(7);
// print_r($book_purchase_by_id);

// $book_review_by_id = $book_review_service->getByID(2);
// $book_review_by_bookID = $book_review_service->getReviewByBookID(7);
// print_r($book_review_by_id);

// $user_by_id = $user_service->getByID(2);
// $user_by_email = $user_service->getUserByEmail(7);
// print_r($user_by_email);
