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


    public function insertRental($user_id, $book_id, $rental_date, $return_date, $status)
    {
        $data = [
            'user_id' => $user_id,
            'book_id' => $book_id,
            'rental_date' => $rental_date,
            'return_date' => $return_date,
            'status' => $status
        ];

        return $this->insert($data); // Call the base DAO's insert method
    }

    public function updateRental($id, $user_id, $book_id, $rental_date, $return_date, $status)
    {
        $data = [
            'user_id' => $user_id,
            'book_id' => $book_id,
            'rental_date' => $rental_date,
            'return_date' => $return_date,
            'status' => $status
        ];

        return $this->update($id, $data); // Call BaseDao's update method
    }
    public function deleteRental($id)
    {
        return $this->delete($id); // Call BaseDao's delete method
    }
}
