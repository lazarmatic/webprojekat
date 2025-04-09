<?php
require_once 'baseDao.php';


class userDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("user");
    }


    public function getByEmail($email)
    {
        $stmt = $this->connection->prepare("SELECT * FROM user WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        return $stmt->fetch();
    }
}
