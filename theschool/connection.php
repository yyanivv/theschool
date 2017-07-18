<?php
require_once('env.php');
class Database {
    private static $connect_db;
    private $connect;
    private function __construct(){
        $this->connect = mysqli_connect( host , user , pass , db );
        if(mysqli_connect_error()){
            die('connection to db failed, err number: '. mysqli_connect_errno());
        }
    }
    public static function connect(){
        if(!isset(self::$connect_db)) {
            self::$connect_db = new Database();
        }
        return self::$connect_db;
    }
    public function getConnect(){
        return $this->connect;
    }
    public function closeConnect(){
        return mysqli_close($this->connect);
    }
}
$db_conn = Database:: connect();
//$db_conn->getConnect(); --- open connection to db
//$db_conn->closeConnect() --- close connection to db
?>
