let eY = [9]
let eX = [0]

let topP  = 180
let leftP = 0


const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

const concludedImg  = document.createElement('img')
const ballImg   = document.createElement('img')
const msgWin    = document.createElement('p')

concludedImg.src    = './assets/img/porta.jpg'
ballImg.src     = './assets/img/bolinha.png' 


const body      = document.getElementById('body')
const labyrinth = document.getElementById('labyrinth')

const createMaze = maze => {
    let caminho = " "
    let parede  = 'W'
    let inicio  = 'S'
    let fim     = 'F'

    for(let y = 0; y < maze.length; y++){
        let play = maze[y];
        const row = document.createElement('div')
        row.classList.add('row')
        labyrinth.appendChild(row)

        for(let x = 0; x < play.length; x++){
            let char = play[x];
            let block = document.createElement('div')
            row.appendChild(block)

            if(char === caminho){
                block.classList.add('caminho')
            }
            if(char === parede){
                block.classList.add('parede')
            }
            if(char === inicio){
                const player = document.createElement('div')
                player.appendChild(ballImg)
                block.appendChild(player)
                player.setAttribute('id','start')
                player.classList.add('ball')
                block.classList.add('inicio')
            }
            if(char === fim){
                const concluded = document.createElement('div')
                concluded.appendChild(concludedImg)
                block.appendChild(concluded)
                block.setAttribute('id','finish')
                concluded.classList.add('concluded')
                block.classList.add('fim')
            }
        }

    }
}

createMaze(map)

const soma = value =>{
    let result = []
    for(let i = 0; i < value.length ; i++){
        let num = value[i]
        result.push(num + 1)
    }
    return result
}

const subtr = value =>{
    let result = []
    for(let i = 0; i < value.length ; i++){
        let num = value[i]
        result.push(num - 1)
    }
    return result
}

const movement = command =>{

    if(command === 'ArrowUp'){
        if(map[subtr(eY)][eX] === " "){
            topP -= 20
            eY = subtr(eY)
        }
    }

    if(command === 'ArrowDown'){
        if(map[soma(eY)][eX] === " "){
            topP += 20
            eY = soma(eY)
        }
    }

    if(command === 'ArrowLeft'){
        if(map[eY][subtr(eX)] === " " || map[eY][subtr(eX)] === 'S'){
            leftP -= 20
            eX = subtr(eX)
        }
    }

    if(command === 'ArrowRight'){
        if(map[eY][soma(eX)] === " " || map[eY][soma(eX)] === 'F'){
            leftP += 20
            eX = soma(eX)
        }
    }
    
    if(map[eY][eX] === map[8][20]){
        msgWin.innerText = 'Parabéns, você ganhou!'
        body.appendChild(msgWin)
        setTimeout(function(){
            window.location.href = './index.html'
        }, 4000)
    }
}

document.addEventListener('keydown', (evt) =>{
    const key = evt.key

    movement(key)

    document.getElementById("start").style.top = topP + "px";
    document.getElementById("start").style.left = leftP + "px";
})