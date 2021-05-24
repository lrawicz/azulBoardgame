import "./style/main.scss";
import { pick, pickClick,pickFromFactory0,pickMouseOver,
        placeOnClick, placeOnEnter
    , undo, }
from "./ts/userInteraction"
import { generatePrivateBoard, createFactory} from "./ts/setup"
import {   ScoreAnim_PR } from "./ts/animations";
import { scorePartial } from "./ts/score";
export {
    pickClick, pickMouseOver,
    placeOnClick, placeOnEnter, undo, scorePartial,
    createFactory, ScoreAnim_PR, pickFromFactory0, pick,
    
}


createFactory(5)
generatePrivateBoard()
