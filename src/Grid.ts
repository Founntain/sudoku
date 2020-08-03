import * as $ from "jquery";
import { Cell } from "./Cell";
import { SolvedResult } from "./SolvedResult";
import { Difficulty } from "./Difficulty";
import { GetDifficultyString } from "./index";


export class Grid{
    Size: number;
    CurrentSelectedCell: HTMLDivElement;
    Cells: Cell[][];
    Grid: number[][];
    Solution: number[][];
    CurrentSelectedInput: number = 0;
    Difficulty: Difficulty;

    constructor(size: number = 9){
        this.Size = size;
        this.Cells = [];
    }

    public GenerateGrid(){
        let gameGrid = $("#gameGrid"); 

        let cellId = 0;

        for(var i = 0; i < this.Size; i++){
            let div = $(document.createElement("div"));

            div.addClass("row");

            let array: Cell[] = [];

            for(var j = 0; j < this.Size; j++){
                let cell = $(document.createElement("div"));

                cell.addClass(["col", "cell", "colMax"]);

                let cellObj = new Cell(cellId, cell, this.Cells);

                array.push(cellObj);

                div.append(cell);

                cellId++;
            }

            this.Cells.push(array);

            gameGrid.append(div)
        }
    }

    public GenerateBoard(gridToSolve: number[][], solution: number[][], difficulty: Difficulty){
        this.Grid = gridToSolve;
        this.Solution = solution;
        this.Difficulty = difficulty;
        
        for(var i = 0; i < this.Size; i++){
            for(var j = 0; j < this.Size; j++){
                let cell: Cell = this.Cells[i][j];

                cell.SetValue(this.Grid[i][j]);

                if(cell.Value > 0)
                    cell.SetIsGivenCell(true);

                if(cell.Value == 0)
                    cell.Cell.addClass("noValue");
                else
                    cell.Cell.addClass("generatedCell");

                    switch(i){
                        case 0:
                            cell.Cell.addClass("borderTop");
                            break;
                            
                        case 2:
                        case 5:
                        case 8:
                            cell.Cell.addClass("borderBottom");
                            break;
                    }

                    switch(j){
                        case 0:
                            cell.Cell.addClass("borderLeft");
                            break;
                        case 2:
                        case 5:
                        case 8:
                            cell.Cell.addClass("borderRight");
                            break;
                    }

                cell.UpdateCell();
            }
        }

        let text = $("#sudokuInfo");

        text.html("difficulty: " + GetDifficultyString(this.Difficulty));
    }

    public GenerateInput(){
        let inputGrid = $("#inputGrid"); 

        for(var i = 0; i < this.Size+1; i++){
            let div = $(document.createElement("div"));

            div.addClass(["col", "inputButton"]);

            let value = i+1 == 10 ? 0 : i+1;

            div.html(value.toString());

            div.click(() => {
                this.GetCurrentSelectedInput();
                this.CurrentSelectedInput = value;
                div.addClass("selectedInput");
            });

            inputGrid.append(div)
        }
    }

    public CheckIfSolved(): SolvedResult{
        let errorCount: number = 0;
        let notFilledCount: number = 0;

        for(var i = 0; i < this.Size; i++){
            for(var j = 0; j < this.Size; j++){
                if(this.Cells[i][j].Value != this.Solution[i][j] && this.Cells[i][j].Value > 0){
                    errorCount++;
                }

                if(this.Cells[i][j].Value == 0)
                    notFilledCount++;
            }
        }

        return errorCount > 0 || notFilledCount > 0
            ? new SolvedResult(errorCount, notFilledCount, false) 
            : new SolvedResult(errorCount, notFilledCount, true);
    }

    public PrintGrid(){
        let o = "";
        
        for(const cells of this.Cells){
            for(const cell of cells){
                o += " " + cell.Value + " "
            }
            o += "\n";
        }

        console.log(o);
    }

    private GetCurrentSelectedInput(): void{
        let div = $(".selectedInput");

        div.removeClass("selectedInput");
    }
}