let onceAnimationEnd = (el: HTMLElement, animation: string = "resizePW_Base 0.7s ease") => {
        

    return new Promise(resolve => {
        const onAnimationEndCb = () => {
            el.removeEventListener('animationend', onAnimationEndCb);
            console.log("fin animation")
            resolve(1);
        }
            el.addEventListener('animationend', onAnimationEndCb)
            void el.offsetWidth;
            el.style.animation = animation;
    }).catch(console.log);;
}

export async function  ScoreAnim_PR  (PWClassess:string[]=[]) {
    let Score_adding: Element = document.getElementsByClassName("Score_adding")[0]
    let base:string =  Score_adding.textContent 
    let score:number = 0
    for (let index = 0; index < PWClassess.length; index++) {
        const element:HTMLElement = document.getElementsByClassName (PWClassess[index])[0] as HTMLElement;
        score +=1
        Score_adding.textContent = `${base}+${score}`
        await onceAnimationEnd(element, 'resizePW_Base 0.5s ')
        element.style.animation =""
    }
}