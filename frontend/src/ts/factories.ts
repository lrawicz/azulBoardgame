import { pickClick, pickMouseOver } from "./userInteraction";
import { Ifactory, Itile} from "../../../common/interfaces"
export function factories_showAll() {
    let factories= Array.from(document.getElementsByClassName('factory') as HTMLCollectionOf<HTMLElement>)
    let giroBase = `${360 / factories.length}deg`
    for (let i = 0; i < factories.length; i++) {
        factories[i].classList.add(`factory${i + 1}_show`);
    }
    document.documentElement.style.setProperty('--giroBase', giroBase);

    for (let index = 0; index < factories.length; index++) {
        factories[index].style.webkitAnimation = 'none';
        void factories[index].offsetWidth;
        factories[index].style.webkitAnimation = '';
    }
}

export function factories_showByID(id:number) {
    let factory = document.getElementById(`factory${id}`);

    factory.classList.remove(`factory${id}_hide`);
    factory.classList.add(`factory${id}_show`);
}
export function factories_hideAll() {
    let factories = document.getElementsByClassName("factory")

    for (let index = 0; index < factories.length; index++) {
        factories[index].classList.remove(`factory${index + 1}_show`);
        factories[index].classList.add(`factory${index + 1}_hide`);

    }

}
export function factories_hideById(id:string) {
    console.log("WF",id)
    let factory = document.getElementById(id);

    factory.classList.remove(`${id}_show`);
    factory.classList.add(`${id}_hide`);
}
export class Factory implements Ifactory {
    tiles: Itile[] = []
    constructor(colors: string[]) {
        colors.forEach(element => {
            this.tiles.push({ color: element, amount: 0 })
        });
    }
    add(color: string, amount: number): void {
        this.tiles.map((x) => {
            if (x.color == color) {
                x.amount += amount
            }
            return x
        })
    }
    remove(color: string, amount: number = 0): number {
        let result: number = amount
        this.tiles.map((x) => {
            if (x.color == color) {
                if (amount == 0) {
                    result = x.amount
                    x.amount = 0
                } else {
                    x.amount -= amount
                }
            }
            return x
        })
        return result
    }
    addRandomColor(): void {
        let allColors: string[] = this.tiles.map((x) => { return x.color })
        this.add(
            allColors[
                Math.floor(
                    Math.random() * allColors.length)],
            1)
    }

}

export function createFactory(amount:number){
    let factoriesDOM = document.getElementsByClassName("factories")[0]
    while (factoriesDOM.childElementCount>0) {
        factoriesDOM.removeChild(factoriesDOM.firstChild)
    }
    for (let FactIndex = 0; FactIndex < amount; FactIndex++) {
        let Fact: Ifactory = new Factory(["Blue", "Yellow", "Black", "Red", "Pink"])
        for (let index = 0; index < 4; index++) {
            Fact.addRandomColor()
        }
        
        let factoryDOM: HTMLElement = document.createElement('div')
        factoryDOM.setAttribute("id",`factory${FactIndex+1}`)
        factoryDOM.classList.add(`factory`)
        /*factoryDOM.classList.add(`factory${FactIndex}_show`)*/
        Fact.tiles.map((coin)=>{
            for (let index = 0; index < coin.amount; index++) {
                let coinDOM: HTMLElement = document.createElement('div')
                coinDOM.classList.add(`coin`)
                coinDOM.classList.add(`coin${coin.color}`)
                coinDOM.addEventListener('click', function (this) { pickClick(this)})
                coinDOM.addEventListener('mouseover', function (this) { pickMouseOver(this) })
                factoryDOM.appendChild(coinDOM)
            }
        })
        factoriesDOM.appendChild(factoryDOM)
    }
    factories_showAll()
}