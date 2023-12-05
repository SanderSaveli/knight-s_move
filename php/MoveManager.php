<?php

class MoveManager
{
    public function getMoveCells($board, $cell){
        return [[1,1],[2,2], [3,3]];
    }
    public function makeMove($board, $cellFrom, $cellTo){
        $arr = $this->generateFalseArray(count($board), count($board[0]));
        $arr[$cellFrom->x][$cellFrom->y] = true;
        $arr[$cellTo->x][$cellTo->y] = true;
        return $arr;
    }
    private function generateFalseArray($rows, $columns) {
    $falseArray = array();
    
    for ($i = 0; $i < $rows; $i++) {
        $row = array();
        for ($j = 0; $j < $columns; $j++) {
            $row[] = false;
        }
        $falseArray[] = $row;
    }
    
    return $falseArray;
}
}