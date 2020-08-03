export class SolvedResult{
    ErrorCount: number;
    NotFilledCount: number;
    Solved: boolean;

    constructor(errorCount: number, notFilledCount: number, solved: boolean){
        this.ErrorCount = errorCount;
        this.NotFilledCount = notFilledCount;
        this.Solved = solved;
    }
}