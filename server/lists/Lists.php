<?php
/**
 *  List class to edit update delete and display
 */

class Lists
{
    protected $db;
    protected $uid;
    protected $title;
    protected $img;
    protected $small_titl1;
    protected $small_tip1;
    protected $small_titl2;
    protected $small_tip2;
    protected $middle_title;
    protected $item_type;
    protected $tags;
    protected $active;
    public $json_output;

    public function __construct($uid, $db)
    {
        $this->uid = $uid;
        $this->db = $db;
    }

    public function showItem()
    {
        $output = array();

        $stmt = $this->db->prepare("SELECT * FROM `lists` WHERE `uid`=:uid ORDER BY `lid` DESC");
        $stmt->bindValue(':uid', $this->uid, PDO::PARAM_INT);

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $rows = $stmt->fetchAll(PDO::FETCH_OBJ);

            foreach ($rows as $row)
            {
                $output[] = $row;
            }
        }

        return $output;
    }

    public function showOneItem($lid)
    {
        $output = array();

        $stmt = $this->db->prepare("SELECT * FROM `lists` WHERE `lid`=:lid");
        $stmt->bindValue(':lid', $lid, PDO::PARAM_INT);

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $rows = $stmt->fetchAll(PDO::FETCH_OBJ);

            $output[] = $rows[0];
        }

        return $output;
    }

    public function addItem($data_arr)
    {
        $stmt = $this->db->prepare("INSERT INTO `lists` (`uid`, `title`, `img`, `small_titl1`, `small_tip1`, `small_titl2`, `small_tip2`, `middle_title`, `type`, `tags`, `actvie`)
                                    VALUES(:uid, :title, :img, :small_titl1, :small_tip1, :small_titl2, :small_tip2, :middle_title, :item_type, :tags, :actvie)");

        $stmt->bindValue(':uid', $data_arr[0], PDO::PARAM_INT);
        $stmt->bindValue(':title', $data_arr[1], PDO::PARAM_STR);
        $stmt->bindValue(':img', $data_arr[2], PDO::PARAM_STR);
        $stmt->bindValue(':small_titl1', $data_arr[3], PDO::PARAM_STR);
        $stmt->bindValue(':small_tip1', $data_arr[4], PDO::PARAM_STR);
        $stmt->bindValue(':small_titl2', $data_arr[5], PDO::PARAM_STR);
        $stmt->bindValue(':small_tip2', $data_arr[6], PDO::PARAM_STR);
        $stmt->bindValue(':middle_title', $data_arr[7], PDO::PARAM_STR);
        $stmt->bindValue(':item_type', $data_arr[8], PDO::PARAM_STR);
        $stmt->bindValue(':tags', $data_arr[9], PDO::PARAM_STR);
        $stmt->bindValue(':actvie', $data_arr[10], PDO::PARAM_INT);
        $stmt->execute();
    }

    public function editItem($data_arr)
    {
        $stmt = $this->db->prepare("UPDATE `lists` SET `title`=:title, `img`=:img, `small_titl1`=:small_titl1, 
                                    `small_tip1`=:small_tip1, `small_titl2`=:small_titl2, `small_tip2`=:small_tip2, `middle_title`=:middle_title,
                                    `type`=:item_type, `tags`=:tags, `actvie`=:actvie
                                    WHERE `lid`=:lid");
        $stmt->bindValue(':title', $data_arr[1], PDO::PARAM_STR);
        $stmt->bindValue(':img', $data_arr[2], PDO::PARAM_STR);
        $stmt->bindValue(':small_titl1', $data_arr[3], PDO::PARAM_STR);
        $stmt->bindValue(':small_tip1', $data_arr[4], PDO::PARAM_STR);
        $stmt->bindValue(':small_titl2', $data_arr[5], PDO::PARAM_STR);
        $stmt->bindValue(':small_tip2', $data_arr[6], PDO::PARAM_STR);
        $stmt->bindValue(':middle_title', $data_arr[7], PDO::PARAM_STR);
        $stmt->bindValue(':item_type', $data_arr[8], PDO::PARAM_STR);
        $stmt->bindValue(':tags', $data_arr[9], PDO::PARAM_STR);
        $stmt->bindValue(':actvie', $data_arr[10], PDO::PARAM_INT);
        $stmt->bindValue(':lid', $data_arr[11], PDO::PARAM_INT);
        $stmt->execute();
    }

    public function deleteItem($lid)
    {
        $stmt = $this->db->prepare("DELETE FROM `lists` WHERE `lid`=:lid");
        $stmt->bindValue(':lid', $lid, PDO::PARAM_INT);

        $stmt->execute();
    }
}