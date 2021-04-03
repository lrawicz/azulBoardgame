
export function factories_showAll(number:number) {
    let factories= Array.from(document.getElementsByClassName('factory') as HTMLCollectionOf<HTMLElement>)
    let giroBase = `${360 / number}deg`
    for (let i = 0; i < factories.length; i++) {
        factories[i].classList.add("hide");

        factories[i].classList.remove(`factory${i + 1}_hide`);
        factories[i].classList.add(`factory${i + 1}_show`);


    }
    document.documentElement.style.setProperty('--giroBase', giroBase);
    for (let index = 0; index < number; index++) {
        factories[index].classList.remove("hide");
    }
    for (let index = 0; index < 11; index++) {
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
export function factories_hideById(id:number) {
    let factory = document.getElementById(`factory${id}`);

    factory.classList.remove(`factory${id}_show`);
    factory.classList.add(`factory${id}_hide`);
}