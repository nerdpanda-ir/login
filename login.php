<?php
$data = $_POST;
$getUserName = $data['userId'];
$userPassword = $data['userPassword'];
$user = array('userId'=>'itone','userPassword'=>'12345678910','userFirstName'=>'mohammad reza','userLastName'=>'shams','userEmail'=>'itone.itone@yahoo.com','userPhone'=>'09014773870',"profilePic"=>"img/boy.png");
$cand = in_array($getUserName,$user) && in_array($userPassword,$user);
sleep(3);
if($cand)
{
    $UserInfoJson ="{\"u_Fname\":\"$user[userFirstName]\",\"u_Lname\":\"$user[userLastName]\",\"avatar\":\"$user[profilePic]\"}";
    echo $UserInfoJson;
}
else
{
    echo false;
}
