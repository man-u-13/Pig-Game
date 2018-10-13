
var active,currentScore,glbScore,dice,player1,player2,gamePlaying;

player1=prompt('Enter name of player 1');
player2=prompt('Enter name of player 2');
init();

function init(){
	active=0;
	currentScore=0;
	glbScore=[0,0];
	gamePlaying=true;

	document.querySelector('.dice').style.display='none';	

	//Getting names of players from user 
	
	document.getElementById('score-0').textContent=0;
	document.getElementById('score-1').textContent=0;
	document.getElementById('current-0').textContent=0;
	document.getElementById('current-1').textContent=0;
	document.getElementById('name-0').textContent=player1;
	document.getElementById('name-1').textContent=player2;

	//Remove winner class
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	//Remove active class from both panels
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	//Add active class for first panel
	document.querySelector('.player-0-panel').classList.add('active');
}


//ROLL DICE EVENT 
document.querySelector('.btn-roll').addEventListener('click',function(){

	if(gamePlaying){
	//Random Number
	dice=Math.floor(Math.random()*6)+1;

	//Display
	var diceImg=document.querySelector('.dice');
	diceImg.style.display='block';
	diceImg.src='dice-'+dice+'.png';

	//update score if rolled number was not 1
	if(dice!==1){
		//Update score
		currentScore+=dice;
		document.querySelector('#current-'+active).textContent=currentScore;
	}
	else{
		//Next player's turn
		changePlayer();
	}
	}
});

//HOLD EVENT
document.querySelector('.btn-hold').addEventListener('click',function(){
	if(gamePlaying)
	{
	//Add score to global score
	glbScore[active]+=currentScore;
	//Update the UI
	document.querySelector('#score-'+active).textContent=glbScore[active];

	//fetching the value input from the user
	var input=document.querySelector('.final-score').value;
	var winningScore;
	if(input){
		winningScore=input;
	}
	else{
		winningScore=100;
	}

	//Check if player won the game
	if(glbScore[active]>=winningScore)
	{
		//Player Won
		document.querySelector('#name-'+active).textContent='Winner!'
		document.querySelector('.dice').style.display='none';
		document.querySelector('.player-'+active+'-panel').classList.add('winner');
		document.querySelector('.player-'+active+'-panel').classList.remove('active');
		gamePlaying=false; 
	}
	else
		changePlayer();
	}
});

function changePlayer(){
	active===0?active=1:active=0;
	currentScore=0;

	document.getElementById('current-0').textContent='0';
	document.getElementById('current-1').textContent='0';

	document.querySelector('.player-0-panel').classList.toggle('active');  
	document.querySelector('.player-1-panel').classList.toggle('active');  

	document.querySelector('.dice').style.display='none';
}

document.querySelector('.btn-new').addEventListener('click',function(){
	init();
});




