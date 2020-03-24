<?php
/**
 *  Signup class to create new account
 */

class Signup
{
    private $email;
    private $password;
    private $name;
    protected $db;
    protected $json_output;

    public function __construct($signup_data_arr)
    {
        //Users data from app
        $this->email = $signup_data_arr[0];
        $this->password = $signup_data_arr[1];
        $this->name = $signup_data_arr[2];
        //Connect to DB
        $db_obj = new Database();
        $this->db = $db_obj->getDB();
    }

    public function isEmailAvailable()
    {
        //Check database records for existing email
        $stmt = $this->db->prepare("SELECT * FROM `users` WHERE `uemail`=:email");
        $stmt->bindValue(':email', $this->email, PDO::PARAM_STR);
        $stmt->execute();

        if ($stmt->rowCount() < 1) {
            return false;
        }

        return true;
    }

    public function isEmailValid($email)
    {
        $email_pm = explode('@', $email);		//email username part
        $email_pm2 = explode('.', $email_pm[1]);		//email domain part

        //Verify if email format is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) return false;
        elseif (preg_match('/[^A-Za-z0-9\-_.]/', $email_pm[0])) return false;
        elseif (strlen($email_pm2[1]) < 2) return false;

        return true;
    }

    public function verifySignup()
    {
        //Default json output
        $this->json_output = array(
            "success" => "false",
            "message" => "Signup failed! Please try again later."
        );

        //Signup data verification
        if (!$this->isEmailValid($this->email)) {
            $this->json_output = array(
                "success" => "false",
                "message" => "Please enter a valid email address."
            );

        } else if($this->isEmailAvailable()) {
            $this->json_output = array(
                "success" => "false",
                "message" => "A user with that email address already exists."
            );

        } else if($this->insertIntoDB()) {
            $this->json_output = array(
                "success" => "true",
                "message" => "Success"
            );
        }

        return $this->json_output;
    }

    public function insertIntoDB()
    {
        $stmt = $this->db->prepare("INSERT INTO `users` (`uname`,`uemail`,`upassword`) VALUES(:uname, :email, :password)");

        $stmt->bindValue(':uname', $this->name, PDO::PARAM_STR);
        $stmt->bindValue(':email', $this->email, PDO::PARAM_STR);
        $stmt->bindValue(':password', md5($this->password), PDO::PARAM_STR);
        $report = $stmt->execute();

        //Show DB error
        //print_r($stmt->errorInfo());

        return $report;
    }
}