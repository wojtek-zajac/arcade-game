// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here

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
    // Multiply any movement by the dt parameter
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


// Our Player
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
        // If the player is dead = hit an enemy for the 5th time
        if(this.dead) {
            // Open a Game Over modal
            openModal();
        }
    }

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPressed) {
        // Declaclare the player's range of movements
        const xJump = 100;
        const yJump = 82;
        const maxLeftPostiion = 5;
        const water = -10;
        const maxRightPostition = 405;
        const maxDownPosition = 400;
        
        switch(keyPressed) {
            // If you press the Left arrow on keyboard, the player moves by the pre-defined jump value
            case 'left':
                this.x -= xJump;
                    // If the player tries to go off screen, he's set to the max frame position
                    if (this.x <= maxLeftPostiion) {
                        this.x = maxLeftPostiion;
                    }
            break;
            // If you press the Up arrow on keyboard, the player moves by the pre-defined jump value
            case 'up':
                this.y -= yJump;
                    // If the player tries to go off screen, he's set to the max frame position
                    if (this.y <= water) {
                        this.y = water;
                    }
            break;
            // If you press the Reft arrow on keyboard, the player moves by the pre-defined jump value
            case 'right':
                this.x += xJump;
                    // If the player tries to go off screen, he's set to the max frame position
                    if (this.x >= maxRightPostition) {
                        this.x = maxRightPostition;
                    }
            break;
            // If you press the Deft arrow on keyboard, the player moves by the pre-defined jump value
            case 'down':
                this.y += yJump;
                    // If the player tries to go off screen, he's set to the max frame position
                    if (this.y >= maxDownPosition) {
                        this.y = maxDownPosition;
                    }
            break;
        }
        // Player reaches the water
        if (this.y === water) {
            // Player scores
            this.win();
            setTimeout( () => {
                // Player goes to the start
                this.restart();
            }, 350);    
        }
    }
}


Player.prototype.win = function() {
    // Add 1 point to the score 
    this.score++;
    // Update the score on screen
    document.querySelector('.score').textContent = this.score;
}


Player.prototype.die = function() {
    // Substract 1 player's life (of 5)
    this.lives--;
    // Update the number of lives on screen
    document.querySelector('.lives').textContent = this.lives;
    
    // If the player reaches 0 lives
    if (this.lives === 0) {
        // Set the death property
        this.dead = true;
        // And attach the earned points to modal
        attachResult();
    }
}


// Re-set the player to the starting box (grass)
Player.prototype.restart = function() {
    this.x = 205;
    this.y = 400;
}


Player.prototype.resetScore = function() {
    // Re-set properties to the original ones
    this.score = 0;
    this.lives = 5;
    this.dead = false;
    // Update the score and number of lives on screen (back to the original ones)
    document.querySelector('.score').textContent = this.score;
    document.querySelector('.lives').textContent = this.lives; 
}


// Instantiate the enemies objects.
const enemy1 = new Enemy(-180, 65, 140);
const enemy2 = new Enemy(-500, 145, 180);
const enemy3 = new Enemy(-400, 230, 100);


// Place all enemy objects in an array
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);


// Place the player object
const player = new Player(205, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// This opens the Game Over modal
function openModal() {
    const modal = document.querySelector('.modal');

    modal.style.display = 'block';
}


//T his closes the Game Over modal
function closeModal() {
    const modal = document.querySelector('.modal');

    modal.style.display = 'none';
    player.resetScore();
}


// This displays the score on modal
function attachResult() {
    let result = document.querySelector('.result');
    // Plural/Singular output form validator
    if (player.score > 1 || player.score === 0) {
        result.textContent = `${player.score} times.`;
    } else {
        result.textContent = `${player.score} time.`;
    }
}


// This listens for clicks on the Play Again button and restarts the game
// This should be called after the DOM is fully loaded
// Otherwise - it will return null
window.onload = () => {
    const button = document.querySelector('.button');

    button.addEventListener('click', closeModal);
}