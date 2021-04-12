import { Ijugada } from '../../../common/interfaces';
import { factories_hideById, factories_showByID } from './factories'
let fabricChoosen:number;
export let pick:{factory:number, color:string, amount:number}| null;
//internal
let factory0 = document.getElementsByClassName("factory0")[0]
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
    if (powerRangersRow.length == 0){
        return false
    }
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

function addToFactory0(color: string, amount: number) {
    let factory0: Element = document.getElementsByClassName("factory0")[0]
    let colorChild: Element;
    for (let index = 0; index < factory0.childElementCount; index++) {
        const child = factory0.children[index];
        if (child.children[0].classList.contains(`coin${color}`)) {
            colorChild = child
            break
        }
    }
    let prevVal: number = Number(colorChild.children[1].textContent)
    colorChild.children[1].textContent = (prevVal + amount).toString()
    if (!colorChild.classList.contains("fact0Active")) { colorChild.classList.add("fact0Active") }
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
function cleanRow_1(){
    let Row1_1 = document.getElementsByClassName("Row1_1")[0]
    let Row1_2 = document.getElementsByClassName("Row1_2")[0]
    if (Row1_2.childElementCount>0) {
        Row1_2.removeChild(Row1_2.firstChild);
    }
    while (Row1_1.firstChild) {
        Row1_1.removeChild(Row1_1.firstChild);
    }
}
function addToRow_1(color:string,amount:number){
    let Row1_1 = document.getElementsByClassName("Row1_1")[0]
    //let coin = `<div class ="coin ${tile.classList[1]}"></div>`
    for (let index = 0; index < amount; index++) {
        let coin = document.createElement("div");
        coin.classList.add("coin")
        coin.classList.add(`coin${color}`)
        Row1_1.appendChild(coin)
    }
    //undoCoin
    let Row1_2 = document.getElementsByClassName("Row1_2")[0]
    let coinUndo = document.createElement("div");
    coinUndo.classList.add("coin")
    coinUndo.classList.add("coinUndo")
    coinUndo.onclick = (e) => { undo() }
    Row1_2.appendChild(coinUndo)
}
export function pickClick(tile:HTMLElement) {
    undo()
    let fabricChoosen:string = tile.offsetParent.id
    factories_hideById(fabricChoosen)
    let children = tile.offsetParent.children
    let amount = 0
    let color: string = tile.classList[1].substr(4)
    //public board
    for (let index = 0; index < children.length; index++) {
        let child = children[index];
        if (child.classList[1] == tile.classList[1]) {
            //coin same color opacity =0%
            child.classList.add("transparent")
            amount += 1
        }
    }

    //let jugada = {color, amount, 0} //volver 
    pick = {
        factory:Number(fabricChoosen.substr(-1)),
        color: color, amount:amount}
    //private board
    cleanRow_1()
    addToRow_1(pick.color, pick.amount)
    addToFactory0(pick.color, pick.amount)
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

export function pickFromFactory0(div:HTMLElement){
    if (pick != null){
        undo()
    }
    if (div.classList.contains("fact0Active")){
        let color:string = div.children[0].classList[1].substr(4)
        let amount:number= Number(div.children[1].textContent)
        div.children[1].textContent = "0"
        console.log(color)
        console.log(amount)
        pick = {color: color, amount:amount, factory:0}
        div.classList.remove("fact0Active")
        addToRow_1(pick.color, pick.amount)

    }
}

//private board
export function placeOnEnter(rowDOM:HTMLElement) {
    addCoinsToRow(rowDOM,true)
}
export function placeOnClick(rowDOM: HTMLElement) {
    addCoinsToRow(rowDOM,false)
    cleanRow_1()
}
//UnDo (WIP)
export function undo() {

    if (!(pick == null)){
        resetPlaces()
        cleanRow_1()
        let factory0Pick: Element

        let factory0: Element = document.getElementsByClassName("factory0")[0]
        for (let index = 0; index < factory0.childElementCount; index++) {
            const child = factory0.children[index];
            if (child.children[0].classList.contains(`coin${pick.color}`)) {
                factory0Pick = child;
                
                break;
            }
        }




        if (pick.factory>0){
            console.log("B")
            let tiles = document.getElementById("factory" + pick.factory).children
            for (let index = 0; index < tiles.length; index++) {
                console.log("C")
                tiles[index].classList.remove("transparent")
            }
            factories_showByID(pick.factory)
            factory0Pick.children[1].textContent = 
            String(
                Number(factory0Pick.children[1].textContent) 
                - pick.amount)
            if (factory0Pick.children[1].textContent == "0"){
                factory0Pick.classList.remove("fact0Active")
            }
            //factory0 + pick
        }else{
            console.log("D")
            factory0Pick.children[1].textContent = String(pick.amount)
            factory0Pick.classList.add("fact0Active")
        }
        console.log("test")
        pick = null
    }

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
