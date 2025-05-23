<?php
require_once 'baseService.php';
require_once __DIR__ . '/../dao/authDao.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class AuthService extends BaseService
{
    private $auth_dao;
    public function __construct()
    {
        $this->auth_dao = new AuthDao();
        parent::__construct(new AuthDao);
    }


    public function get_user_by_username($email)
    {
        return $this->auth_dao->get_user_by_username($email);
    }


    public function register($entity)
    {
        if (empty($entity['email']) || empty($entity['passw'])) {
            return ['success' => false, 'error' => 'Email and password are required.'];
        }


        $email_exists = $this->auth_dao->get_user_by_email($entity['email']);
        if ($email_exists) {
            return ['success' => false, 'error' => 'Email already registered.'];
        }


        $entity['passw'] = password_hash($entity['passw'], PASSWORD_BCRYPT);


        $entity = parent::create($entity);


        //unset($entity['passw']);


        return ['success' => true, 'data' => $entity];
    }


    public function login($entity)
    {
        if (empty($entity['username']) || empty($entity['passw'])) {
            return ['success' => false, 'error' => 'Username and password are required.'];
        }


        $user = $this->auth_dao->get_user_by_username($entity['username']);
        if (!$user) {
            return ['success' => false, 'error' => 'Invalid username or password.'];
        }


        if (!$user || !password_verify($entity['passw'], $user['passw']))
            return ['success' => false, 'error' => 'Invalid username or password.'];


        unset($user['passw']);

        $jwt_payload = [
            'user' => $user,
            'iat' => time(),
            // If this parameter is not set, JWT will be valid for life. This is not a good approach
            'exp' => time() + (60 * 60 * 24) // valid for day
        ];


        $token = JWT::encode(
            $jwt_payload,
            Config::JWT_SECRET(),
            'HS256'
        );


        return ['success' => true, 'data' => array_merge($user, ['token' => $token])];
    }
}
