import * as $ from "jquery";
import { Grid } from "./Grid";
import { SudokuSolver } from "./SudokuSolver/SudokuSolver";
import { Difficulty } from "./Difficulty";
import { SolvedResult } from "./SolvedResult";

var grid: Grid;

$(document).ready(() => {
    grid = new Grid(9);
    let solution: number[][] = SudokuSolver.generate();
    let gridToSolve: number[][] = SudokuSolver.carve(solution, Difficulty.VeryHard);
    
    LoadDifficulties();

    grid.GenerateGrid();
    grid.GenerateInput();

    grid.GenerateBoard(gridToSolve, solution, Difficulty.VeryHard);

    grid.PrintGrid();

    console.log(solution);
});

$("#genNewBoardBtn").click(() => {

    let difficulty: Difficulty = GetDifficultyFromString(<string> $("#difficultCombobox").val());

    let solution: number[][] = SudokuSolver.generate();
    let gridToSolve: number[][] = SudokuSolver.carve(solution, difficulty);

    grid.GenerateBoard(gridToSolve, solution, difficulty);

    console.log("Generated new board");
    console.log(gridToSolve, solution);
});

$("#checkBoardBtn").click(() => {
    let solvedResult: SolvedResult = grid.CheckIfSolved();

    let text = $("#solvedText");

    if(solvedResult.Solved){
        text.html("You solved the sudoku!");
    }else{
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        text.html("Your sudoku has " + solvedResult.ErrorCount + " errors and "+ solvedResult.NotFilledCount +" cells are not filled!<br/>Last checked: " + time);
    }
})

function LoadDifficulties(){
    let box = $("#difficultCombobox");

    for(const dif of Object.keys(Difficulty)){
        if(isNaN(Number(dif))){
            let option = $(document.createElement("option"));
            option.val(dif);
            option.html(GetDifficultyString(GetDifficultyFromString(dif)));

            box.append(option);

            console.log(dif);
        }
    }

    box.val("VeryHard");
}

export function GetDifficultyString(difficulty: Difficulty): string{
    switch(difficulty){
        case Difficulty.Test: return "test";
        case Difficulty.Baby: return "baby";
        case Difficulty.Casual: return "casual";
        case Difficulty.Easy: return "easy";
        case Difficulty.Medium: return "medium";
        case Difficulty.Hard: return "hard";
        case Difficulty.VeryHard: return "very hard";
        case Difficulty.Master: return "master";
        case Difficulty.Inhuman: return "inhuman";
    }
}

export function GetDifficultyFromString(difficulty: string): Difficulty{
    switch(difficulty){
        case "Test": return Difficulty.Test;
        case "Baby": return Difficulty.Baby;
        case "Casual": return Difficulty.Casual;
        case "Easy": return Difficulty.Easy;
        case "Medium": return Difficulty.Medium;
        case "Hard": return Difficulty.Hard;
        case "VeryHard": return Difficulty.VeryHard;
        case "Master": return Difficulty.Master;
        case "Inhuman": return Difficulty.Inhuman;
    }
}