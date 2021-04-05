import "./style/main.scss";
//import  { test3} from "./ts/factories";
//export { , test3}
import {pickClick,pickMouseOver,
        placeOnClick, placeOnEnter
        ,undo,score} 
from "./ts/userInteraction"
import{
    createFactory
} from "./ts/factories"

import {generatePrivateBoard} from "./ts/privateboard"
export {
    pickClick, pickMouseOver,
    placeOnClick, placeOnEnter, undo, score,
    createFactory
}


createFactory(5)
generatePrivateBoard()