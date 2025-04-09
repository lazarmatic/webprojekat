<?php
require_once 'baseService.php';
require_once '../dao/userDao.php';

class userService extends BaseService
{

    public function __construct()
    {
        $dao = new userDao();
        parent::__construct($dao);
    }

    public function getUserByEmail($email)
    {
        return $this->dao->getUserByEmail($email);
    }
}
