<?php
session_start();
require_once("connection.php");
if(isset($_SESSION['userid'])) {
    $userId = $_SESSION['userid'];

    $sql = "SELECT Users.nickname, Users.email, Profiles.avatar, Profiles.rating FROM Users INNER JOIN Profiles ON Users.profileID = Profiles.ID WHERE Users.ID = $userId";
    
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        $nickname = $row["nickname"];
        $email = $row["email"];
        $avatar = $row["avatar"];
        $rating = $row["rating"];
		echo "<div class='profile-info'> 
            <img src='/img/image/$avatar' alt='Avatar' /> 
            <h2>$nickname</h2> 
            <p>Rating: $rating</p> 
        </div>";
    } else {
        echo "Пользователь не найден";
    }
} else {
    echo "Пользователь не авторизован";
}
?>
