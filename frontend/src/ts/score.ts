import { ScoreAnim_PR } from "./animations"


export async function scorePartial(){
    for (let index = 0; index < 6; index++) {
        let rowData:string[] = scoreRow(index)
        await ScoreAnim_PR(rowData)
    }
}

function scoreRow(row:number):string[] {
    let DOMrows = document.getElementsByClassName("grid_places")[0] as HTMLElement
        let DOMRow: HTMLElement = DOMrows.children[row] as HTMLElement
        let places: [HTMLElement] = [].slice.call(DOMRow.children as (HTMLCollectionOf<HTMLElement>))
        let EmptyPlaces: HTMLElement[] = places.
        filter((place: HTMLElement) => {
            return place.childElementCount == 0
        })
        if (EmptyPlaces.length == 0) {
            let color: string = places[0].children[0].classList[1].substr(4)

            for (let index = 0; index < DOMRow.childElementCount; index++) {
                const place: HTMLElement = DOMRow.children[index] as HTMLElement;
                place.removeChild(place.firstChild)
            }

            //Remove PR_transp
            
            document.getElementsByClassName(`PR  PR_Row${row+1} PR_${color}`)[0]
                .classList.remove("PR_transp")
            //animation
            let rowData:string[] =  scoreRow_data(row+1, color)
            return rowData
        }
}
function scoreRow_data(row: number = 3, color: string = "Red"):string[] {
    let PR: Element = document.getElementsByClassName(`PR_Row${row} PR_${color}`)[0]
    let column = PR.classList[1].substr(-1)
    let PRRowPlus1 = []
    let PRRowLess1 = []
    let PRColumnPlus1 = []
    let PRColumnLess1 = []
    let change: number = row+1
    while (change < 6) {
        if (!document.getElementsByClassName
            (`PR_Column${column} PR_Row${change} `)[0]
            .classList.contains("PR_transp")) {
                PRRowPlus1.push(`PR_Column${column} PR_Row${change} `)
            } else {
                change= 6;
            }
            change += 1
    }
    change = row-1
    while (change > 0) {
        if (!document.getElementsByClassName
            (`PR_Column${column} PR_Row${change} `)[0]
            .classList.contains("PR_transp")) {
            PRRowLess1.push(`PR_Column${column} PR_Row${change} `)
        } else { change = 0 }
        change -= 1

    }
    change = Number(column)+1
    while (change < 6) {
        if (!document.getElementsByClassName
            (`PR_Column${change} PR_Row${row} `)[0]
            .classList.contains("PR_transp")) {
            PRColumnPlus1.push(`PR_Column${change} PR_Row${row} `)
        } else { change = 6 }
        change += 1

    }
 
    change = Number(column)-1
    while (change > 0) {
        if (!document.getElementsByClassName
            (`PR_Column${change} PR_Row${row} `)[0]
            .classList.contains("PR_transp")) {
            PRColumnLess1.push(`PR_Column${change} PR_Row${row} `)
        } else { change = 0 }
        change -= 1
    }



    let totalAnim: string[] = []
    if ((PRRowPlus1.length + PRRowLess1.length + PRColumnPlus1.length + PRColumnLess1.length)
        == 0) {
        totalAnim = totalAnim.concat([`PR_Column${column} PR_Row${row} `])
    } else {
        if ((PRRowPlus1.length + PRRowLess1.length) > 0) {
            totalAnim = totalAnim.concat(PRRowLess1.reverse())
            totalAnim = totalAnim.concat([`PR_Column${column} PR_Row${row} `])
            totalAnim = totalAnim.concat(PRRowPlus1.reverse())
        }
        if ((PRColumnPlus1.length + PRColumnLess1.length) > 0) {
            totalAnim = totalAnim.concat(PRColumnLess1.reverse())
            totalAnim = totalAnim.concat([`PR_Column${column} PR_Row${row} `])
            totalAnim = totalAnim.concat(PRColumnPlus1.reverse())
        }

    }
    
    return totalAnim
    
    
}