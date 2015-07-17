//Possible enemy speeds and starting locations.
var enemySpeeds = [60,95,150,260,330,450];
var enemyStartRows = [64,147,230,313];

// The enemy object represents an object on the board that the player must avoid.
var Enemy = function() {
	//Define an image to use for the enemy.
	this.sprite = 'images/enemy-bug.png';

	//Assign an initial starting position for the enemy.
	this.x = this.startPosX();
	this.y = this.startPosY();

	//each enemy will move at a speed chosen when it is created, but it will always move at the same speed once it is created.
	this.speed = enemySpeeds[Math.round(Math.random()*5)];
};

Enemy.prototype.startPosX = function() {
	//Start the enemy off screen (reason for a negative start position).   Use a number about as wide as the canvas so they appear at different times.
	return -(Math.round(Math.random()*1000));
};

Enemy.prototype.startPosY = function() {
	//Pick a row to start the enemy in from the list of positions.
	return enemyStartRows[Math.round(Math.random()*3)];
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.x += this.speed*dt;
	//If our enemies move off the screen, restart them again at the beginning and pick a new speed.
	if(this.x > 1000) {
		this.x = this.startPosX();
		this.y = this.startPosY();
		this.speed = enemySpeeds[Math.round(Math.random()*5)];
	}
	else
	{
		//Check for a collision between the current enemy (this) and the player.
		if((player.x - this.x < 50 && player.y - this.y < 50) && (player.x - this.x > -50 && player.y - this.y > -50)) {
			resetPositions();
		}
	}
};

Enemy.prototype.render = function() {
	//This function draws the individual enemy on the screen.
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
	//load an image for the player, and pick a start position for the player.
	this.sprite = 'images/char-boy.png';
	this.playerX = [300,400,500,600,700,800];
	this.playerY = [400];
	this.x = this.startPosX();
	this.y = this.startPosY();
};

Player.prototype.startPosX = function () {
	return this.playerX[Math.round(Math.random()*5)];
};

Player.prototype.startPosY = function() {
	return this.playerY[0];
};

Player.prototype.reset = function() {
	this.x = this.startPosX();
	this.y = this.startPosY();
};

Player.prototype.render = function() {
	//This function draws the player on the canvas.
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (num) {
	//the following if statements keep the player object on the board.
	switch(num) {
		case 'left':
			if(this.x > 15) {
				this.x-=100;
			}
			break;
		case 'up':
			if(this.y > 0) {
				this.y-=90;
			}
			break;
		case 'right':
			if(this.x < 900) {
				this.x+=100;
			}
			break;
		case 'down':
			if(this.y < 375) {
				this.y+=90;
			}
			break;
		default:
			return;
	}
	// Check to see if the player fell in the water.   If so, reset the game.
	if(this.y < 0) {
		resetPositions();
	}
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[];
for (i=0; i<9; i++) {
	allEnemies.push(new Enemy());
}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});

function resetPositions() {
	player.reset();
	for(var j in allEnemies) {
		allEnemies[j].x = allEnemies[j].startPosX();
		allEnemies[j].y = allEnemies[j].startPosY();
	}
}
