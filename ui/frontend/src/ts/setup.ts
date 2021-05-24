import { factories_showAll } from "./factories"
import { Ifactory, Itile } from "../../../../common/interfaces"
import { pickClick, pickMouseOver } from "./userInteraction"

export function generatePrivateBoard(){
    let PR:string[][]=
    [["Red","Pink","Blue","Yellow","Black"],
    ["Black","Red", "Pink", "Blue", "Yellow"],
    ["Yellow", "Black","Red", "Pink", "Blue"],
    ["Blue", "Yellow", "Black","Red", "Pink"],
    ["Pink","Blue", "Yellow", "Black", "Red" ]]

    let PB_Right_DOM:Element = document.getElementsByClassName("PB_Right")[0]
    for (let row = 1; row <= 5; row++) {
        for (let column = 1; column <= 5; column++) {
            let PR_DOM: HTMLElement = document.createElement('div')
            /*PR_DOM.setAttribute("id", `factory${FactIndex + 1}`)*/
            PR_DOM.classList.add(`PR`)
            PR_DOM.classList.add(`PR_Column${column}`)
            PR_DOM.classList.add(`PR_Row${row}`)
            PR_DOM.classList.add(`PR_transp`)
            PR_DOM.classList.add(`PR_${PR[row-1][column-1]}`)

            PR_DOM.style.gridColumn = column.toString()
            PR_DOM.style.gridRow = row.toString()
            
            PB_Right_DOM.appendChild(PR_DOM)
        }
    }
}
export class Factory implements Ifactory {
    tiles: Itile[] = []
    constructor(colors: string[]) {
        colors.forEach(element => {
            this.tiles.push({ color: element, amount: 0 })
        });
    }
    add(color: string, amount: number): void {
        this.tiles.map((x) => {
            if (x.color == color) {
                x.amount += amount
            }
            return x
        })
    }
    remove(color: string, amount: number = 0): number {
        let result: number = amount
        this.tiles.map((x) => {
            if (x.color == color) {
                if (amount == 0) {
                    result = x.amount
                    x.amount = 0
                } else {
                    x.amount -= amount
                }
            }
            return x
        })
        return result
    }
    addRandomColor(): void {
        let allColors: string[] = this.tiles.map((x) => { return x.color })
        this.add(
            allColors[
            Math.floor(
                Math.random() * allColors.length)],
            1)
    }

}

export function createFactory(amount: number) {
    let factoriesDOM = document.getElementsByClassName("factories")[0]
    while (factoriesDOM.childElementCount > 0) {
        factoriesDOM.removeChild(factoriesDOM.firstChild)
    }
    for (let FactIndex = 0; FactIndex < amount; FactIndex++) {
        let Fact: Ifactory = new Factory(["Blue", "Yellow", "Black", "Red", "Pink"])
        for (let index = 0; index < 4; index++) {
            Fact.addRandomColor()
        }

        let factoryDOM: HTMLElement = document.createElement('div')
        factoryDOM.setAttribute("id", `factory${FactIndex + 1}`)
        factoryDOM.classList.add(`factory`)
        /*factoryDOM.classList.add(`factory${FactIndex}_show`)*/
        Fact.tiles.map((coin) => {
            for (let index = 0; index < coin.amount; index++) {
                let coinDOM: HTMLElement = document.createElement('div')
                coinDOM.classList.add(`coin`)
                coinDOM.classList.add(`coin${coin.color}`)
                coinDOM.addEventListener('click', function (this) { pickClick(this) })
                coinDOM.addEventListener('mouseover', function (this) { pickMouseOver(this) })
                factoryDOM.appendChild(coinDOM)
            }
        })
        factoriesDOM.appendChild(factoryDOM)
    }
    factories_showAll()
}