<?php
require_once 'baseService.php';
require_once '../dao/bookRentalDao.php';

class bookRentalService extends BaseService
{

    public function __construct()
    {
        $dao = new bookRentalDao();
        parent::__construct($dao);
    }

    public function getRentalByUserId($user_id)
    {
        return $this->dao->getRentalByUserId($user_id);
    }
    public function getRentalByBookId($book_id)
    {
        return $this->dao->getRentalByBookId($book_id);
    }
}
