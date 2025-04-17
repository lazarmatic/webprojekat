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
}
