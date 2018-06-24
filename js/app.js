// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.width = 101;
    this.height = 171;
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
        this.width = 101;
        this.height = 171;
        this.x = x;
        this.y = y;
    }

    update() {
        
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPressed) {
        const xJump = 100;
        const yJump = 82;
        const maxLeftPostiion = 5;
        const maxUpPosition = -10;
        const maxRightPostition = 405;
        const maxDownPosition = 400;

        switch(keyPressed) {
            case 'left':
                this.x -= xJump;
                    if (this.x <= maxLeftPostiion) {
                        this.x = maxLeftPostiion;
                    }
            break;
            case 'up':
                this.y -= yJump;
                    if (this.y <= maxUpPosition) {
                        this.y = maxUpPosition;
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
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
const enemy1 = new Enemy(-180, 65, 80);
allEnemies.push(enemy1);
const enemy2 = new Enemy(-600, 145, 150);
allEnemies.push(enemy2);
const enemy3 = new Enemy(-1500, 230, 110);
allEnemies.push(enemy3);
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

function checkCollisions() {
    const comfortZone = 70;
    for (const enemy of allEnemies) {
        if (player.x < enemy.x + comfortZone &&
            player.x + comfortZone > enemy.x &&
            player.y < enemy.y + comfortZone &&
            player.y + comfortZone > enemy.y) {
           
            console.log('collision!');
            enemy.speed = 0;
            // player.x = 205;
            // player.y = 400;        
        }
    }
}