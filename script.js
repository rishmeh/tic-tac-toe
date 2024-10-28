let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".resetbtn");
let win =  document.querySelector(".won");
let winStatement = document.querySelector("#winner");
let hide = document.querySelector(".hide");
let playAgain = document.querySelector(".playAgain");
let nameX = document.querySelector("#inputX");
let nameO = document.querySelector("#inputO");
let circlex =  document.querySelector(".circlex");
let circleo = document.querySelector(".circleo");


let playerX = 0; //0 for player O and 1 for player x.
let naO = ''; //name of the player choosen for O.
let naX = ''; //name of the player choosen for X.
let clicks = 0;

let winpos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

nameX.addEventListener("input",function(event){
        naX  = nameX.value.trim();
        if (naX === '') {
            naX = 'Player X';
        }
})

nameO.addEventListener("input",function(event){
        naO  = nameO.value.trim();
        if (naO === '') {
            naO = 'Player O';
        }
})

reset.addEventListener("click", () => {
    reStart();
});

playAgain.addEventListener("click", () => {
    reStart();
});

boxes.forEach(box => {
    box.addEventListener("click", () => {
        clicks ++;
        console.log("clicked.");
        if (playerX === 0){
            box.innerText = "O";
            playerX = 1;
            playerocolor();
        } else{
            box.innerText = "X";
            playerX = 0;
            playerxcolor();
        }
        box.disabled = true;
        checkForTie();
        checkForWin();
        disableInput();
    })
});

const disableInput = () =>{
    if(clicks > 0){
        nameX.disabled = true;
        nameO.disabled = true;
        nameX.style.color = "#49567B";
        nameO.style.color = "rgb(187, 63, 63)";
    }
}

const checkForTie = () =>{
    if (clicks === 9){
        win.classList.remove("hide");
        winStatement.innerHTML = "<i>Oops! looks like it is a draw.</i>";
        reset.classList.add("hide");
    }
}

const checkForWin = () => {
    winpos.forEach(pos => {
        let pos1 = pos[0];
        let pos2 = pos[1];
        let pos3 = pos[2];

        

        if(boxes[pos1].innerText !== '' && boxes[pos2].innerText !== '' && boxes[pos3].innerText !== ''){
            if(boxes[pos1].innerText === boxes[pos2].innerText &&  boxes[pos2].innerText === boxes[pos3].innerText){
                console.log("winner.");
                winSituation(boxes[pos1].innerText);
            }
        }
    })
}

const winSituation = (OorX) => {
    if(OorX === "O"){
        if (naO === '') {
            naO = 'Player O';
        }
        legend = naO;
    }else{
        if (naX === '') {
            naX = 'Player X';
        }
        legend = naX;
    }

    win.classList.remove("hide");
    winStatement.innerHTML = "<i>Congratulations, the  winner is " + legend + "!</i>";
    reset.classList.add("hide");
    for(let box of boxes) {
        box.disabled = true;
    }

}


const reStart = () =>{
    boxes.forEach(box =>{
        box.disabled = false;
        box.innerText = "";
        win.classList.add("hide");
        reset.classList.remove("hide");
        playerX = 0;
        document.body.style.backgroundColor = "#8E4162";
        nameX.disabled = false;
        nameO.disabled = false;
        clicks = 0;
        circleo.classList.remove("expando");
        circlex.classList.remove("expandx");
        nameX.style.color = "white";
        nameO.style.color = "white";
    }
    )
}


const playerxcolor = () =>
{
    circleo.classList.remove("expando");
    circlex.classList.add("expandx");
    setTimeout(function() {
        document.body.style.backgroundColor = "#49567B";
      }, 1000);
    
}

const playerocolor = () =>
    {
        circleo.classList.add("expando");
        circlex.classList.remove("expandx");
        setTimeout(function() {
            document.body.style.backgroundColor = "rgb(187, 63, 63)";
          }, 1000);
    }