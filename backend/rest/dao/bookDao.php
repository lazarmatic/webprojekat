<?php
require_once 'baseDao.php';


class bookDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("book");
    }


    public function getByBookID($book_id)
    {
        $stmt = $this->connection->prepare("SELECT * FROM book WHERE id = :book_id");
        $stmt->bindParam(':book_id', $book_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }
    public function getByBookAuthor($book_author)
    {
        $stmt = $this->connection->prepare("SELECT * FROM book WHERE author = :book_author");
        $stmt->bindParam(':book_author', $book_author);
        $stmt->execute();
        return $stmt->fetchAll();
    }
    public function getByBookTitle($book_title)
    {
        $stmt = $this->connection->prepare("SELECT * FROM book WHERE title = :book_title");
        $stmt->bindParam(':book_title', $book_title);
        $stmt->execute();
        return $stmt->fetchAll();
    }
    public function insertBook($title, $author, $rent_price, $buy_price, $description_short, $description_long, $stock_quantity, $available_for_rent, $available_for_purchase)
    {
        $data = [
            'title' => $title,
            'author' => $author,
            'rent_price' => $rent_price,
            'buy_price' => $buy_price,
            'description_short' => $description_short,
            'description_long' => $description_long,
            'stock_quantity' => $stock_quantity,
            'available_for_rent' => $available_for_rent,
            'available_for_purchase' => $available_for_purchase
        ];

        return $this->insert($data); // Call the base DAO's insert method
    }

    public function updateBook($id, $title, $author, $rent_price, $buy_price, $description_short, $description_long, $stock_quantity, $available_for_rent, $available_for_purchase)
    {
        $data = [
            'title' => $title,
            'author' => $author,
            'rent_price' => $rent_price,
            'buy_price' => $buy_price,
            'description_short' => $description_short,
            'description_long' => $description_long,
            'stock_quantity' => $stock_quantity,
            'available_for_rent' => $available_for_rent,
            'available_for_purchase' => $available_for_purchase
        ];

        return $this->update($id, $data); // Call BaseDao's update method
    }
    public function deleteBook($id)
    {
        return $this->delete($id); // Call BaseDao's delete method
    }
}
