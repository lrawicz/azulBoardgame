import { pickClick, pickMouseOver } from "./userInteraction";
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
    let factory = document.getElementById(id);

    factory.classList.remove(`${id}_show`);
    factory.classList.add(`${id}_hide`);
}
