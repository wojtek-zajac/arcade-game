// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // Check if the enemy is off screen
    if (this.x >= 600) {
        // If so, move it to start
        this.x = -200;
    }
}

// Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-horn-girl.png';
        this.x = x;
        this.y = y;
        this.comfortZone = 75;
        this.score = 0;
        this.lives = 5;
        this.dead = false;
    }

    update() {
        if(this.dead) {
            openModal();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPressed) {
        const xJump = 100;
        const yJump = 82;
        const maxLeftPostiion = 5;
        const water = -10;
        const maxRightPostition = 405;
        const maxDownPosition = 400;
        //If the player tries to go off screen, he's set to the max frame position
        switch(keyPressed) {
            case 'left':
                this.x -= xJump;
                    if (this.x <= maxLeftPostiion) {
                        this.x = maxLeftPostiion;
                    }
            break;
            case 'up':
                this.y -= yJump;
                    if (this.y <= water) {
                        this.y = water;
                    }
            break;
            case 'right':
                this.x += xJump;
                    if (this.x >= maxRightPostition) {
                        this.x = maxRightPostition;
                    }
            break;
            case 'down':
                this.y += yJump;
                    if (this.y >= maxDownPosition) {
                        this.y = maxDownPosition;
                    }
            break;
        }
        //Player reaches the water
        if (this.y === water) {
            this.win();
            setTimeout( () => {
              this.restart();
              }, 350);    
        }
    }
}


Player.prototype.win = function() { 
    this.score++;
    document.querySelector('.score').textContent = this.score;
}


Player.prototype.die = function() {
    player.lives--;
    document.querySelector('.lives').textContent = this.lives;
    
    if (this.lives === 0) {
        this.dead = true;
        attachResult();
    }
}


Player.prototype.restart = function() {
    this.x = 205;
    this.y = 400;
}


Player.prototype.resetScore = function() {
    this.score = 0;
    this.lives = 5;
    this.dead = false;
    document.querySelector('.score').textContent = this.score;
    document.querySelector('.lives').textContent = this.lives; 
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemy1 = new Enemy(-180, 65, 140);
const enemy2 = new Enemy(-500, 145, 180);
const enemy3 = new Enemy(-400, 230, 100);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);


// Place the player object in a variable called player
const player = new Player(205, 400);


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


//2D collision detector from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function checkCollisions() {
    for (const enemy of allEnemies) {
        if (player.x < enemy.x + player.comfortZone &&
            player.x + player.comfortZone > enemy.x &&
            player.y < enemy.y + player.comfortZone &&
            player.y + player.comfortZone > enemy.y) {
                
                player.die();
                player.restart();
        } 
    }
}


function openModal() {
    const modal = document.querySelector('.modal');

    modal.style.display = 'block';
}


function closeModal() {
    const modal = document.querySelector('.modal');

    modal.style.display = 'none';
    player.resetScore();
}


function attachResult() {
    let result = document.querySelector('.result');
    
    if (player.score > 1 || player.score === 0) {
        result.textContent = `${player.score} times.`;
    } else {
        result.textContent = `${player.score} time.`;
    }
}


window.onload = () => {
    const button = document.querySelector('.button');

    button.addEventListener('click', closeModal);
}