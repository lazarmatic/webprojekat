<?php
require_once 'baseService.php';
require_once '../dao/bookDao.php';

class bookService extends BaseService
{

    public function __construct()
    {
        $dao = new bookDao();
        parent::__construct($dao);
    }

    public function getByBookAuthor($book_author)
    {
        return $this->dao->getByBookAuthor($book_author);
    }

    public function getByBookTitle($book_title)
    {
        return $this->dao->getByBookTitle($book_title);
    }
}
