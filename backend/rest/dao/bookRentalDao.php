<?php
require_once 'baseDao.php';


class bookRentalDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("bookRental");
    }


    public function getRentalByBookId($book_id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM bookRental WHERE book_id = :book_id");
        $stmt->bindParam(':book_id', $book_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }
    public function getRentalByUserId($user_id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM bookRental WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
