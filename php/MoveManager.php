<?php

class MoveManager
{
    public function getMoveCells($board, $cell){
        $validMoves = [];
        $rows = count($board);
        $columns = count($board[0]);
        
        
        $offsets = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1]
        ];
    
        foreach ($offsets as $offset) {
            $newX = $cell->x + $offset[0];
            $newY = $cell->y + $offset[1];
        
            if ($newX >= 0 && $newX < $rows && $newY >= 0 && $newY < $columns && !$board[$newX][$newY]) {
                $validMoves[] = [$newX, $newY]; 
            }
        }
        return $validMoves;
    }
    public function makeMove($board, $cellFrom, $cellTo){
        $pos = $cellFrom;
        if(!$board[$cellTo->x][$cellTo->y] && in_array([$cellTo->x, $cellTo->y], $this->getMoveCells($board, $cellFrom))){
            $board[$cellTo->x][$cellTo->y] = true;
            $pos = $cellTo;
        }
        return array(
            "board" => $board,
            "knightPos" => $pos,
        );
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