const title = document.querySelector('#level-title')
const btn = document.querySelectorAll('button')
const body = document.querySelector('body')

let buttonColors = ['red','blue','green','yellow']
let gamePattern = []
let userClickedPattern= []
let userChosenColour =[]

let started = false
let level = 0

const wrong = new Audio('sounds/wrong.mp3')

const anyKey = () => {
    if(!started){
        body.classList.remove('game-over')
        title.textContent ='Press A Key to Start'
        started = true
        setTimeout(() => {
            randomColor()
        },200)
    }
    
}

const randomColor = (e) => {
     e = Math.floor(Math.random()*4)
     gamePattern.push(buttonColors[e])
     let sound = gamePattern.slice(-1)
     userClickedPattern = []
     changeOpacity(sound)
     sounds(sound)
}

const changeOpacity = (e) => {
    btn.forEach(btns => {
        if(btns.className===`btn ${e.slice(-1)}`){
            btns.classList.add('pressed')
            setTimeout(() =>{
                btns.classList.remove('pressed')
            },200)
        }
     })
}

const sounds = (e) => {
    const sounds = new Audio(`sounds/${e}.mp3`)
    sounds.play()
}


const addColor = (btn) => {
        let color = btn.target.id
        userClickedPattern.push(color)
        compareArrays(userClickedPattern,gamePattern)}


const compareArrays = (array1,array2) => {
    
    if(array1.every((element,index) => element === array2[index])){
       
        
        sounds(userClickedPattern.slice(-1))
     changeOpacity(userClickedPattern.slice(-1))
     if(array1.length === array2.length){
        setTimeout(()=>{
            randomColor()
        },500)
        level++
        title.textContent = `Level ${level}`
     }
    }
    else{
        title.textContent = `Game Over you reached level ${level} click any key to restart`
        body.classList.add('game-over')
        wrong.play()
        restart()
        
    }
    
}
const restart = () => {
    level = 0
    started = false
    userClickedPattern=[]
    gamePattern=[]
}


btn.forEach((btn) => {
    btn.addEventListener("click", addColor);
  });
document.addEventListener('keypress',anyKey)


