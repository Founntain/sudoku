export class Cell{
    ID: number;
    Value: number;
    Cell: JQuery<HTMLDivElement>;
    Cells: Cell[][];
    IsSelected: boolean;
    IsGivenCell: boolean;

    constructor(id: number, cell: JQuery<HTMLDivElement>, cells: Cell[][]){
        this.ID =id;
        this.Cell = cell;
        this.Cells = cells;

        this.Cell.click(() => {
            if(this.IsGivenCell)
                return;

            let value: number = Number($(".selectedInput").html());

            this.SetValue(value);
        })
    }

    public SetValue(value: number){
        if(this.IsGivenCell)
            return;

        this.Value = value;

        this.Cell.html(value.toString());

        if(this.Value == 0)
            this.Cell.addClass("noValue");
        else
            this.Cell.removeClass("noValue");
    }

    public SetIsGivenCell(value: boolean){
        this.IsGivenCell = value;
    }

    public UpdateCell(){
        this.Cell.html(this.Value.toString());

        if(this.Value == 0)
            this.Cell.addClass("noValue");
        else
            this.Cell.removeClass("noValue");
    }

    private GetCurrentSelectedCell(): Cell{
        for(const cells of this.Cells){
            for(const cell of cells){
                if(cell.IsSelected)
                    return cell;
            }
        }

        return null;
    }

}