<?php
$data = json_decode(file_get_contents('php://input'), true);
$board = $data['board'];
$cellFrom = $data['cellFrom'];
$cellFrom =  json_decode(json_encode($cellFrom));
$cellTo = $data['cellTo'];
$cellTo = json_decode(json_encode($cellTo));

require_once __DIR__ . "/MoveManager.php";
$MoveManager = new MoveManager();

$processedData = $MoveManager->makeMove($board, $cellFrom, $cellTo);

if(!empty($processedData)){
    $answer = array();
    $answer['answerType'] = "success";
    $answer['board'] = $processedData;
    echo json_encode($answer);
    }
    else{
    $answer = array();
    $answer['answerType'] = "error";
    $answer['board'] = $processedData;
    echo json_encode($answer);
}

