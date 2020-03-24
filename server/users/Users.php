<?php
/**
 * This is the User class
 * This class query users info
 */
class User
{
    //Database variables
    protected $db;

    //user data variables
    public $uid;
    public $name;
    public $email;


    public function __construct($uid, $db_cofig)
    {
        //assign user id
        $this->uid = $uid;

        //PDO DB access
        $this->db = $db_cofig;
    }

    private function setUserData ()
    {
        $stmt = $this->db->prepare("SELECT * FROM `users` WHERE `uid`=:uid");
        $stmt->bindValue(':uid', $this->uid, PDO::PARAM_INT);

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $row = $rows[0];
            $this->name = $row['uname'];
            $this->email = $row['uemail'];
        }
    }

    public function getUserData ()
    {
        $this->setUserData ();
    }
}