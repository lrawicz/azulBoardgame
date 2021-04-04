import "./style/main.scss";
//import  { test3} from "./ts/factories";
//export { , test3}
import {addCoinToPlace,pickClick,pickMouseOver,
playCoinOver,playCoinClick,undo,score,setupFactories} 
from "./ts/userInteraction"
import{
factories_showAll,
factories_showByID,
factories_hideAll,
factories_hideById,
    createFactory
} from "./ts/factories"

import {generatePrivateBoard} from "./ts/privateboard"
export {
    addCoinToPlace, pickClick, pickMouseOver,
    playCoinOver, playCoinClick, undo, score, setupFactories,
    createFactory
}
export function testLean() {
    console.log("testLean123")
}
/*factories_showAll(5)*/

export let factories = (document.getElementsByClassName('factory') as HTMLCollectionOf<HTMLElement>)
createFactory(5)

generatePrivateBoard()