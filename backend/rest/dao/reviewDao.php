<?php
require_once 'baseDao.php';


class reviewDao extends baseDao
{
    public function __construct()
    {
        parent::__construct("review");
    }

    public function getReviewByBookId($book_id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM review WHERE book_id = :book_id");
        $stmt->bindParam(':book_id', $book_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function insertReview($user_id, $book_id, $review_text, $review_date)
    {
        $data = [
            'user_id' => $user_id,
            'book_id' => $book_id,
            'review_text' => $review_text,
            'review_date' => $review_date
        ];

        return $this->insert($data); // Call the base DAO's insert method
    }
    public function updateReview($id, $user_id, $book_id, $review_text, $review_date)
    {
        $data = [
            'user_id' => $user_id,
            'book_id' => $book_id,
            'review_text' => $review_text,
            'review_date' => $review_date
        ];

        return $this->update($id, $data); // Call BaseDao's update method
    }
    public function deleteReview($id)
    {
        return $this->delete($id); // Call BaseDao's delete method
    }
}
