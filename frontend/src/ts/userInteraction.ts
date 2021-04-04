import { factories_hideById } from './factories'
let fabricChoosen:number;
//internal
function resetPlaces():void {
    let places = document.getElementsByClassName("PB_Left")[0].children;
    for (let index = 0; index < places.length; index++) {
        const place = places[index];
        if (place.children.length == 1 &&
            place.children[0].classList.contains("transparentAnim")) {
            place.removeChild(place.children[0])
        }
    }

}
export function addCoinToPlace(color:string, row:number) {
    let DOMRow = document.getElementsByClassName(`grid_placesRow${row}`)[0]
    let powerRangersRow = document.getElementsByClassName(`PR_Row${row} PR_${color} PR_transp`)

    if (powerRangersRow.length == 0) {
        return false
    }
    else {
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
            newCoin.classList.add("transparentAnim")
            DOMRow.children[firstEmptySpace].appendChild(newCoin)
            return true
        } else { false }
    }
}
/*function scoreRow(row:number) {
    let placesRow = document.getElementsByClassName(`placeRow${row}`)
    if (placesRow[row].classList.length > 1) {
        let powerRangers = document.getElementsByClassName(`PR_Row${row} PR_${color} PR_transp`)
        powerRangers[0].classList.remove("PR_transp")
    }
    //calcular puntaje
    //effectos locos
}*/
// Users Actions
// public board
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
export function playCoinOver(rowDOM:HTMLElement) {
    //place.clientHeight
    if (rowDOM.childElementCount> 0)
    {
        let row: number = Number(rowDOM.classList[0].substr(-1))
        let coin: Element = document.getElementsByClassName("Row1_1")[0].children[0]
        let amount:number = rowDOM.children.length
        let color:string = coin.classList[1].substr(4)
        let hazard:number = 0
        //reset all places
        resetPlaces()

        while (amount > 0) {
            if (!addCoinToPlace(color, row)) {
                hazard += 1
            }
            amount -= 1
        }
    }
}
export function playCoinClick() {
    //reset all places
    let places = document.getElementsByClassName("PB_Left")[0].children;

    for (let index = 0; index < places.length; index++) {
        const place = places[index];
        if (place.children.length == 1) {
            place.children[0].classList.remove("transparentAnim")
        }
    }
    let Row1_1 = document.getElementsByClassName("Row1_1")[0]
    let Row1_2 = document.getElementsByClassName("Row1_2")[0]
    while (Row1_1.firstChild) {
        Row1_1.removeChild(Row1_1.firstChild);
    }
    //Row1_2.removeChild(Row1_2.firstChild)
}
//UnDo (WIP)
export function undo() {
    let tiles = document.getElementById("fabric" + fabricChoosen).children
    for (let index = 0; index < tiles.length; index++) {
        tiles[index].classList.remove("transparent")
    }
    //show_fabricsById(fabricChoosen) VOLVER
}


function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function score(row:number = 3, color:string = "Red") {
    let PR:Element = document.getElementsByClassName(`PR_Row${row} PR_${color}`)[0]
    let column = 3//PR.classList[0].substr(-1)
    let PRRowPlus1 = []
    let PRRowLess1 = []
    let PRColumnPlus1 = []
    let PRColumnLess1 = []
    let change:number = row
    while (change < 6) {
        change += 1
        if (!document.getElementsByClassName
            (`PR_Column${column} PR_Row${change} `)[0]
            .classList.contains("PR_transp")) {
            PRRowPlus1.push(`PR_Column${column} PR_Row${change} `)
        } else {
            break;
        }
    }
    change = row
    while (change > 1) {
        change -= 1
        if (!document.getElementsByClassName
            (`PR_Column${column} PR_Row${change} `)[0]
            .classList.contains("PR_transp")) {
            PRRowLess1.push(`PR_Column${column} PR_Row${change} `)
        } else { break }
    }
    change = column
    while (change < 6) {
        change += 1
        if (!document.getElementsByClassName
            (`PR_Column${change} PR_Row${row} `)[0]
            .classList.contains("PR_transp")) {
            PRColumnPlus1.push(`PR_Column${change} PR_Row${row} `)
        } else { break }
    }
    change = column

    while (change > 1) {
        change -= 1
        if (!document.getElementsByClassName
            (`PR_Column${change} PR_Row${row} `)[0]
            .classList.contains("PR_transp")) {
            PRColumnLess1.push(`PR_Column${change} PR_Row${row} `)
        } else { break }
    }
    console.log({
        "PRRowPlus1": PRRowPlus1,
        "PRRowLess1": PRRowLess1,
        "PRColumnPlus1": PRColumnPlus1,
        "PRColumnLess1": PRColumnLess1,
    })
    /*function refresh_element(node:Element) {
        node.style.setProperty('transform', 'translateZ(0)');
        requestAnimationFrame(() => { node.style.removeProperty('transform'); });
    }*/
    /*function reanimate(DOM) {
        DOM.style.webkitAnimation = 'none';
        void DOM.offsetWidth;
        DOM.style.webkitAnimation = '';
    }*/
    function agrandarArray(DOMclasses: string[], startBy:number = 1)  {
        for (let index = 0; index < DOMclasses.length; index++) {
            const DOMclass = DOMclasses[index];
            console.log(DOMclass)
            const DOM = document.getElementsByClassName(DOMclass)[0]
            console.log(DOM)
            //DOM.classList.add("doubleSize")
            console.log("DOSTAFF")
            DOM.classList.add(`PW_Anim${startBy + index}`)
            //refresh_element(DOM)
            //reanimate(DOM)
            //await sleep(500);
            console.log("Points:+1")
            //DOM.style.transform = "scale(1)"
            //DOM.classList.remove("doubleSize")
        }
        return DOMclasses.length + startBy
    }
    let num = 0
    if ((PRRowPlus1.length + PRRowLess1.length + PRColumnPlus1.length + PRColumnLess1.length)
        == 0) {
        agrandarArray([`PR_Column${column} PR_Row${row} `], 1)
        return 1
    } else {
        if (PRRowPlus1.length + PRRowLess1.length > 0) {
            /*
            num = agrandarArray(PRRowPlus1, 1)
            num = agrandarArray(PRRowLess1, num + 1)
            [`PR_Column${column} PR_Row${row} `]
            */
        }
        if (PRColumnPlus1.length + PRColumnLess1.length > 0) {
            /*
            num = agrandarArray(PRColumnLess1, num)
            num = agrandarArray(PRColumnLess1, num + 1),
            */
        }

        //HACER COSAS LOCAS
        /*
        function cosaLoca(Dom, primera, segunda) {
            .PW_AnimExtra {
                animation: resizePW_Base 1s;
                -webkit - animation - iteration - count: 2;
                -webkit - animation - delay: (primera * 0.5s) (segunda * 0.5s);
            }
        }*/

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
