<?php
require '../vendor/autoload.php'; //run autoloader

/* 
Flight::route('/', function () {  //define route and define function to handle request
    echo 'Hello world!';
}); */

Flight::register('bookService', 'bookService');
Flight::register('bookRentalService', 'bookRentalService');
Flight::register('bookStoreService', 'bookStoreService');
Flight::register('bookReviewService', 'bookReviewService');
Flight::register('userService', 'userService');

require_once './rest/services/bookService.php';
require_once './rest/services/bookRentalService.php';
require_once './rest/services/bookStoreService.php';
require_once './rest/services/bookReviewService.php';
require_once './rest/services/userService.php';


require_once './rest/routes/bookRoutes.php';
require_once './rest/routes/bookRentalRoutes.php';
require_once './rest/routes/bookStoreRoutes.php';
require_once './rest/routes/bookReviewRoutes.php';
require_once './rest/routes/userRoutes.php';


Flight::start();  //start FlightPHP
