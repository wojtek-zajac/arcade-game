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
    constructor(x, y, speed) {
        this.sprite = 'images/char-horn-girl.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
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
const enemy1 = new Enemy(60, 65, 10);
allEnemies.push(enemy1);
const enemy2 = new Enemy(100, 145, 10);
allEnemies.push(enemy2);
const enemy3 = new Enemy(140, 230, 20);
allEnemies.push(enemy3);
const enemy4 = new Enemy(260, 65, 10);
allEnemies.push(enemy4);
const enemy5 = new Enemy(300, 145, 10);
allEnemies.push(enemy5);
const enemy6 = new Enemy(340, 230, 20);
allEnemies.push(enemy6);
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
