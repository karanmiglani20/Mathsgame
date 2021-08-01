var playing = false;
var score ;
var action;
var timeremaining;
var correctAnswer;
function play() {
    var audio = new Audio('sound.mp3');
    audio.play();
  }


// if we click satrt reset button
document.getElementById("startreset").onclick = function(){
 play();
    // if we are playing
    if(playing == true){

        location.reload();
    }else{ // not playing
        // change the mode to playing
        playing = true;
        score = 0;
        document.getElementById('scorevalue').innerHTML = score;
        //show countdown box;
        show('timeremaining')
        timeremaining = 60;
        document.getElementById('timeremainingvalue').innerHTML = timeremaining;

        // hide gameover box
        hide("gameOver");

        // change start button to reset
        document.getElementById('startreset').innerHTML = "Reset Game"

        // start countdown
        startCountdown();

        // generate question
        generateQA();

    }
}


// click on answer box

for(i=1;i<5;i++){
    document.getElementById('box'+i).onclick = function(){
        // alert(correctAnswer);
        // check if we are playing
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                // correct answer

                // increase the score by 1
                score++;
                document.getElementById('scorevalue').innerHTML = score;
                //hide wrong box show correct box
                hide('wrong');
                show('correct');
                setTimeout(function(){
                    hide('correct');
                },1000);
                generateQA();
            }else{
                hide('correct');
                show('wrong');
                setTimeout(function(){
                    hide("wrong");   
                }, 1000);
            }
        }
    }
}


function startCountdown(){
    action = setInterval(() => {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){
            stopCountdown();
            show('gameOver');
            document.getElementById('gameOver').innerHTML = "<p>Game Over!</p> Your score is: " + score + ".</p>";
            hide("timereamining");
            hide("correct");
            // hide("choices");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountdown(){
    clearInterval(action);

}

function show(id){
    document.getElementById(id).style.display = "block";
}

function hide(id){
    console.log(id);
    document.getElementById(id).style.display = "none";
}


// generate question and multiple answer
function generateQA(){
    var x = 1 +  Math.round(9*Math.random());
    var y = 1 +  Math.round(9*Math.random());
    correctAnswer = x*y;
    // console.log(correctAnswer);

    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 +  Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;

    var answers = [correctAnswer];

    for(i=1;i<5;i++){
        if(i!=correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer = (1 +  Math.round(9*Math.random())) * (1 +  Math.round(9*Math.random()));//wrong answer generate

            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

