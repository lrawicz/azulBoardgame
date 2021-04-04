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