<?php
/**
 * This class create DB connection using PDO.
 */
class Database
{
    private $db;
    private $host;
    private $dbname;
    private $dbuser;
    private $dbpass;

    public function __construct()
    {
        //DB credentials
        $this->host = '127.0.0.1';
        $this->dbname = 'bnxvojdp_test';
        $this->dbuser = 'bnxvojdp_test';
        $this->dbpass = 'Zah987Cp1!0';

    }

    private function setDB()
    {
        //start connection
        $this->db = new PDO("mysql:host=$this->host;dbname=$this->dbname;charset=utf8", $this->dbuser, $this->dbpass);
    }


    public function getDB()
    {
        //Call and send DB config
        $this->setDB();

        return $this->db;
    }
}