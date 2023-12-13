<?php
$data = json_decode(file_get_contents('php://input'), true);
$board = $data['board'];
$cellFrom = json_decode(json_encode($data['cellFrom']));

require_once __DIR__ . "/MoveManager.php";
$MoveManager = new MoveManager();

$processedData = $MoveManager->getMoveCells($board, $cellFrom);

if(!empty($processedData)){
    $answer = array();
    $answer['answerType'] = "success";
    $answer['cellsToMove'] = $processedData;
    echo json_encode($answer);
    }
    else{
    $answer = array();
    $answer['answerType'] = "error";
    $answer['cellsToMove'] = $processedData;
    echo json_encode($answer);
}
