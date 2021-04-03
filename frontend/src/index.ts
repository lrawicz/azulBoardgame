import "./style/main.scss";
//import  { test3} from "./ts/factories";
//export { , test3}
import {addCoinToPlace,pickClick,pickMouseOver,
playCoinOver,playCoinClick,undo,score,setupFactories} from "./ts/firstload"
import{
factories_showAll,
factories_showByID,
factories_hideAll,
factories_hideById
} from "./ts/factories"
export {
    addCoinToPlace, pickClick, pickMouseOver,
    playCoinOver, playCoinClick, undo, score, setupFactories
}
export function testLean() {
    console.log("testLean123")
}
factories_showAll(5)

export let factories = (document.getElementsByClassName('factory') as HTMLCollectionOf<HTMLElement>)