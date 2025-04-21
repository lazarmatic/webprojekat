<?php
require_once 'baseDao.php';


class bookStoreDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("bookStore");
    }


    public function getPurchaseByBookId($book_id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM bookStore WHERE book_id = :book_id");
        $stmt->bindParam(':book_id', $book_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }
    public function getPurchaseByUserId($user_id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM bookStore WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
