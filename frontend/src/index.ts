import "./style/main.scss";
import { pickClick,pickMouseOver,
        placeOnClick, placeOnEnter
    , undo, }
from "./ts/userInteraction"
import { generatePrivateBoard, createFactory} from "./ts/setup"
import {  ScoreAnim_PR } from "./ts/animations";
import { scorePartial } from "./ts/score";
export {
    pickClick, pickMouseOver,
    placeOnClick, placeOnEnter, undo, scorePartial,
    createFactory, ScoreAnim_PR
}


createFactory(5)
generatePrivateBoard()
