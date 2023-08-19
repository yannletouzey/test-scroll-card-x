import imgCard from './uv.jpg';

const body = document.querySelector('body')
body.style.width = window.innerWidth + "px"
body.style.height = window.innerHeight + "px"

const main = document.querySelector('main')
main.style.height = `${window.innerHeight}px`

for (let index = 0; index < 30; index++) {
    const card = document.createElement('div')
    card.className = "card"
    const img = document.createElement('img')
    card.append(img)
    card.append(img)
    img.src = imgCard
    main.append(card)
}

const cards = document.querySelectorAll('.card')
main.style.paddingLeft = `${(window.innerWidth / 2) - ((4 * 16) + cards[0].clientWidth / 2)}px`
main.style.paddingRight = `${(window.innerWidth / 2) - ((4 * 16) + cards[0].clientWidth / 2)}px`

const scales = [];
const nbr = 30
const defaultNbr = 25;

for (let indexCard = 0; indexCard < cards.length; indexCard++) {
    cards[indexCard].style.opacity = 0.275

    const sizeCardCenter = cards[indexCard].getBoundingClientRect()
    const leftCardCenter = sizeCardCenter.left
    const widthCard = sizeCardCenter.width
    
    let chosenScale = 1;
    let opacity

    for (let s = 0; s < nbr; s++) {
        const scaleNbr = (defaultNbr * s);
        const scaleNbr2 = ((defaultNbr * s) + defaultNbr);
        const scaleCentieme = scaleNbr + ((defaultNbr * nbr) - (scaleNbr * 2))
        const scale = (scaleCentieme / 1000) + 1
        scales.push({ min: -scaleNbr2, max: scaleNbr, scale: `${scale}` },)
        scales.push({ min: -scaleNbr, max: scaleNbr2, scale: `${scale}` })
    }
    
    for (const scale of scales) {
        if (leftCardCenter >= (window.scrollX + scale.min + (window.innerWidth / 2) - widthCard / 2) && leftCardCenter <=(window.scrollX + scale.max + (window.innerWidth / 2) - widthCard / 2)
        ) {
          chosenScale = scale.scale;
          opacity = ((chosenScale - 1) + 0.25)
          break;
        }
    }
    cards[indexCard].style.transform = `scale(${chosenScale})`;
    cards[indexCard].style.opacity = `${opacity}`;
    
    addEventListener('scroll', () => {
          for (const scale of scales) {
            if (leftCardCenter >= (window.scrollX + scale.min + (window.innerWidth / 2) - widthCard / 2) && leftCardCenter <=(window.scrollX + scale.max + (window.innerWidth / 2) - widthCard / 2)
            ) {
              chosenScale = scale.scale;
              opacity = ((chosenScale - 1) + 0.25)
              break;
            }
        }
        cards[indexCard].style.transform = `scale(${chosenScale})`;
        cards[indexCard].style.opacity = `${opacity}`;
    })
}

addEventListener('resize', () => {
    body.style.width = window.innerWidth + "px"
    body.style.height = window.innerHeight + "px"
    main.style.height = window.innerHeight + "px"
    main.style.paddingLeft = `${(window.innerWidth / 2) - ((4 * 16) + cards[0].clientWidth / 2)}px`
    main.style.paddingRight = `${(window.innerWidth / 2) - ((4 * 16) + cards[0].clientWidth / 2)}px`
})