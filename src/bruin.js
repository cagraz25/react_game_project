const cursor = document.querySelector('.cursor')
const den = [...document.querySelectorAll('.den')]
const scoreEl = document.querySelector('.score span')
let score = 0

const sound = new Audio("./smash.mp3")

function run() {
    const i = Math.floor(Math.random() * den.length);
    const targ_den = den[i];
    let timer = null;

    const img = document.createElement('img')
    img.classList.add('joe')
    img.src = "/joe.png"

    img.addEventListener('click', () => {
        score += 1;
        sound.play();
        scoreEl.textContent = score;
        clearTimeout(timer);
        setTimeout(() => {
            if (targ_den.contains(img)) {
            targ_den.removeChild(img);
            }
            run();
        }, 500);
    })
    targ_den.appendChild(img)

    timer = setTimeout(() => {
        if (targ_den.contains(img)) {
            targ_den.removeChild(img);
        }
        run()
    }, 1500);
}
run()

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})

window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})

window.addEventListener('mousemove', () => {
    cursor.classList.remove('active')
})
