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

    public function insertUser($username, $full_name, $email, $phone, $passw, $role)
    {
        $data = [
            'username' => $username,
            'full_name' => $full_name,
            'email' => $email,
            'phone' => $phone,
            'passw' => $passw,
            'role' => $role
        ];

        return $this->insert($data); // Call the base DAO's insert method
    }
}
