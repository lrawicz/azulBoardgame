import { factories_hideById } from './factories'
let fabricChoosen:number;
//internal
function resetPlaces():void {
    let DOMRows = document.getElementsByClassName("grid_places")[0].children;
    for (let index = 0; index < DOMRows.length; index++) {
        const Row = DOMRows[index];
        for (let column = 0; column < Row.childElementCount; column++) {
            const place = Row.children[column];
            if (place.children.length == 1 &&
            place.children[0].classList.contains("transparentAnim")) {
                place.removeChild(place.children[0])
            }
        }
    }
}

function addCoinToPlace(color:string, row:number,transp:boolean=false) {
    let DOMRow = document.getElementsByClassName(`grid_placesRow${row}`)[0]
    let powerRangersRow = document.getElementsByClassName(`PR_Row${row} PR_${color} PR_transp`)
    let firstEmptySpace = -1
    for (let index = 0; index < DOMRow.children.length; index++) {
        const place = DOMRow.children[index];
        if (place.children.length == 0) {
            firstEmptySpace = index
            break
        }
    }
    if (firstEmptySpace == -1) {
        return false
    } else { }
    if (DOMRow.children[0].children.length == 0
        || DOMRow.children[0].children[0].classList[1] == `coin${color}`) {
        let newCoin = document.createElement("div");
        newCoin.classList.add("coin")
        newCoin.classList.add(`coin${color}`)
        if (transp){
            newCoin.classList.add("transparentAnim")
        }
        DOMRow.children[firstEmptySpace].appendChild(newCoin)
        return true
    } else { false }
}


function addCoinsToRow(rowDOM: Element, transp: boolean = false) {
    let coins = document.getElementsByClassName("Row1_1")[0]
    
    if (rowDOM.childElementCount > 0 && coins.childElementCount>0) {
        let amount: number = coins.childElementCount
        let color: string = coins.children[0].classList[1].substr(4)
        let hazard: number = 0
        //reset all places
        resetPlaces()

        while (amount > 0) {
            if (!addCoinToPlace(color, Number(rowDOM.classList[0].substr(-1)), transp)) {
                hazard += 1
            }
            amount -= 1
        }
    }
}

function removeCoinsFromRow1(){
    let Row1_1 = document.getElementsByClassName("Row1_1")[0]
    let Row1_2 = document.getElementsByClassName("Row1_2")[0]
    while (Row1_1.firstChild) {
        Row1_1.removeChild(Row1_1.firstChild);
    }
    //Row1_2.removeChild(Row1_2.firstChild)
}
export function pickClick(tile:HTMLElement) {
    let fabricChoosen:string = tile.offsetParent.id
    factories_hideById(fabricChoosen)
    let children = tile.offsetParent.children
    let amount = 0
    //public board
    for (let index = 0; index < children.length; index++) {
        let child = children[index];
        if (child.classList[1] == tile.classList[1]) {
            //coin same color opacity =0%
            child.classList.add("transparent")
            amount += 1
        }
    }

    //private board
    let Row1_1 = document.getElementsByClassName("Row1_1")[0]
    let Row1_2 = document.getElementsByClassName("Row1_2")[0]
    while (Row1_1.firstChild) {
        Row1_1.removeChild(Row1_1.firstChild);
    }
    // REVISAR Esto no funciona
    if (Row1_2.firstChild) {
        Row1_2.removeChild(Row1_2.firstChild);
    }
    //let coin = `<div class ="coin ${tile.classList[1]}"></div>`
    let coinUndo = document.createElement("div");
    coinUndo.classList.add("coin")
    coinUndo.classList.add("coinUndo")
    for (let index = 0; index < amount; index++) {
        let coin = document.createElement("div");
        coin.classList.add("coin")
        coin.classList.add(tile.classList[1])
        Row1_1.appendChild(coin)
    }
    Row1_2.appendChild(coinUndo)
}
export function pickMouseOver(tile:HTMLElement) {

    let parent = tile.offsetParent;
    parent.children[0].classList[1]
    let allCoins: HTMLCollectionOf<Element> = document.getElementsByClassName("coin")
    for (let index = 0; index < allCoins.length; index++) {
        allCoins[index].classList.remove("doubleSize")
    }
    for (let index = 0; index < parent.children.length; index++) {
        let child = parent.children[index];
        if (child.classList[1] == tile.classList[1]) {
            child.classList.add("doubleSize")
        }
    }
}



//private board
export function placeOnEnter(rowDOM:HTMLElement) {
    //place.clientHeight
    addCoinsToRow(rowDOM,true)
}
export function placeOnClick(rowDOM: HTMLElement) {
    //reset all places
    addCoinsToRow(rowDOM,false)
    removeCoinsFromRow1()
    //Row1_2.removeChild(Row1_2.firstChild)
}
//UnDo (WIP)
export function undo() {
    let tiles = document.getElementById("factory" + fabricChoosen).children
    for (let index = 0; index < tiles.length; index++) {
        tiles[index].classList.remove("transparent")
    }
    //show_fabricsById(fabricChoosen) VOLVER
}


export function setupFactories(totalPlayers:number) {
    let totalfabric:number = 2 + totalPlayers * 2
    let colors:string[] = ["Red", "Pink", "Black", "Blue", "Yellow"]
    for (let index = 1; index < totalfabric + 1; index++) {
        let newFactory = document.createElement(`fabric${totalfabric}`);
        newFactory.classList.add("fabric")
        newFactory.classList.add(`fabric${totalfabric}_show`)
        for (let index = 0; index < 4; index++) {
            let newCoin:HTMLElement = document.createElement(`fabric${totalfabric}`);
            newCoin.onclick = (e) => { pickClick(this)}
            newCoin.onmouseover = (e) => { pickMouseOver(this) }
            newCoin.classList.add("coin")
            newCoin.classList.add(`coin${colors[0]}`)
            newFactory.appendChild(newCoin)
        }
    }
}
