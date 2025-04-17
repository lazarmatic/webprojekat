<?php

/**
 * @OA\Get(
 *     path="/bookReviewsByBookId/{book_id}",
 *     tags={"bookReviews"},
 *     summary="Get book reviews by book ID",
 *     @OA\Parameter(
 *         name="book_id",
 *         in="path",
 *         required=true,
 *         description="ID of the book",
 *         @OA\Schema(type="integer", example=9)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns reviews for a specific book"
 *     )
 * )
 */
Flight::route('GET /bookReviewsByBookId/@book_id', function ($book_id) {
    Flight::json(Flight::bookReviewService()->getReviewByBookId($book_id));
});

/**
 * @OA\Get(
 *     path="/bookReviews",
 *     tags={"bookReviews"},
 *     summary="Get all book reviews",
 *     @OA\Response(
 *         response=200,
 *         description="Returns all book reviews"
 *     )
 * )
 */
Flight::route('GET /bookReviews', function () {
    Flight::json(Flight::bookReviewService()->getAll());
});

/**
 * @OA\Post(
 *     path="/bookReviews",
 *     tags={"bookReviews"},
 *     summary="Add a new book review",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"user_id", "book_id", "review_text", "review_date"},
 *             @OA\Property(property="user_id", type="integer", example=12),
 *             @OA\Property(property="book_id", type="integer", example=7),
 *             @OA\Property(property="review_text", type="string", example="A must-read for everyone."),
 *             @OA\Property(property="review_date", type="string", format="date", example="2025-04-17")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="New book review created"
 *     )
 * )
 */
Flight::route('POST /bookReviews', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::bookReviewService()->create($data));
});

/**
 * @OA\Put(
 *     path="/bookReviews/{id}",
 *     tags={"bookReviews"},
 *     summary="Update a book review by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID of the book review",
 *         @OA\Schema(type="integer", example=10)
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"user_id", "book_id", "review_text", "review_date"},
 *             @OA\Property(property="user_id", type="integer", example=12),
 *             @OA\Property(property="book_id", type="integer", example=7),
 *             @OA\Property(property="review_text", type="string", example="Found it very inspiringgggg."),
 *             @OA\Property(property="review_date", type="string", format="date", example="2025-04-15")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Book review updated"
 *     )
 * )
 */
Flight::route('PUT /bookReviews/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::bookReviewService()->update($id, $data));
});

/**
 * @OA\Delete(
 *     path="/bookReviews/{id}",
 *     tags={"bookReviews"},
 *     summary="Delete a book review by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID of the book review",
 *         @OA\Schema(type="integer", example=11)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Book review deleted"
 *     )
 * )
 */
Flight::route('DELETE /bookReviews/@id', function ($id) {
    Flight::json(Flight::bookReviewService()->delete($id));
});
