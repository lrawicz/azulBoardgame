let onceAnimationEnd = 
(el: HTMLElement, animation: string = "resizePW_Base 0.7s ease") => {
        

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

export async function animPlacesByRow(row:number){
    let rowDom:HTMLElement = document.getElementsByClassName(`grid_placesRow${row}`)[0] as HTMLElement
    let column:number;
    let color:string = rowDom.children[0].children[0].classList[1].substr(4);
    column = Number(document.getElementsByClassName( `PR PR_Row${row} PR_${color}`)[0].classList[1].substr(-1))
    for (let index = rowDom.childElementCount -1; index > -1; index--) {
        const place:HTMLElement = rowDom.children[index] as HTMLElement;
        if(place.childElementCount> 0){
            
            let coin:HTMLElement = place.children[0] as HTMLElement;
            //var snd = new Audio("file.wav");
            //snd.play();
            if(index == 0){
                coin.style.zIndex = "50";
                coin.style.position = "absolute";
                let sec:number= 0.1 + (column*0.2)
                await onceAnimationEnd(coin, `moveCoinPlace${column} ${sec}s`)
            }else{
                await onceAnimationEnd(coin, `moveCoinPlace 0.5s `)

            }
            coin.classList.add("hide")

            }
        
    }
  
  
    /* if(DOMClassess.length == anim.length){
        for (let index = 0; index < DOMClassess.length; index++) {
            const DOMelement:HTMLElement = document.getElementsByClassName( DOMClassess[index])[0] as HTMLElement
            await onceAnimationEnd(DOMelement, `${anim[index]} ${time}.5s `)
            
        }

    }*/
}