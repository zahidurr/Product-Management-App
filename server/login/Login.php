<?php
/**
 * This is a class to verify user login
 */

class Login
{
    private $email;
    private $password;
    protected $db;
    protected $json_output;

    public function __construct($email, $password)
    {
        $this->email = $email;
        $this->password = md5($password);	//User password converted to secured md5

        //Default json output
        $this->json_output = array(
            "success" => 'false',
            "message" => 'The e-mail or password is incorrect.'
        );

        //Connect to DB
        $db_obj = new Database();
        $this->db = $db_obj->getDB();
    }

    public function isFormValid ()
    {
        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $this->json_output = array(
                "success" => 'false',
                "message" => 'Please enter a valid email address.'
            );

            return false;
        }

        return true;
    }

    public function verifyUser ()
    {
        if($this->isFormValid()) {
            $this->verifyDB();
        }

        return $this->json_output;
    }

    public function verifyDB ()
    {
        $stmt = $this->db->prepare("SELECT * FROM `users` WHERE `uemail`=:email AND `upassword`=:password");
        $stmt->bindValue(':email', $this->email, PDO::PARAM_STR);
        $stmt->bindValue(':password', $this->password, PDO::PARAM_STR);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
            $row = $rows[0];

            //Login success json output
            $this->json_output = array(
                "success" => "true",
                "message" => "Login successful.",
                "uid" => $row->uid
            );
        }

    }
}