export default class mainScene extends Phaser.Scene {
    constructor(){
        super('mainScene')
        this.ground;
        this.platforms;
        this.cursor;
        this.player;
        this.enemyDirection = 'right';
        this.playerHealth = 100;



    }
    preload(){
        this.load.image('sky', '../../assets/sky.png')
        this.load.image('ground', '../../assets/ground.png')
        this.load.image('platform', '../../assets/platform.jpg')
        this.load.spritesheet('player', '../../assets/player/player.png',{frameWidth: 32, frameHeight: 35} )
        this.load.spritesheet('enemy', '../../assets/enemy/enemy.png',{frameWidth: 32, frameHeight: 33})
        

    }
    create(){  
        this.createHelthBar()
        this.add.image(400, 600, 'sky')
        this.ground = this.physics.add.staticGroup() //
        this.ground.create(400, 600, 'ground')
        this.platforms = this.physics.add.staticGroup() //
        this.platforms.create(450, 300, 'platform')
        this.platforms.create(250, 400, 'platform')
        this.platforms.create(70, 490, 'platform')
        this.platforms.create(700, 200, 'platform')
        this.platforms.create(200, 150, 'platform')
        this.platforms.create(500, 100, 'platform')


        this.player = this.physics.add.sprite(100, 450, 'player')
        this.player.setCollideWorldBounds(true)
        this.player.setBounce(0.2)
        this.cursor = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.player, this.ground)
        this.anims.create({
            key:'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        })
        this.enemy = this.physics.add.sprite(500, 300, 'enemy');
        this.enemy.setCollideWorldBounds(true);
        this.enemy.setBounce(0.2)
        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.collider(this.enemy, this.ground); 
        this.anims.create({
            key: 'runEnemy',
            frames: this.anims.generateFrameNumbers('enemy', {start: 0, end: 7 }),
        })
        this.createHelthBar()
        
    }
    createHelthBar(){
        this.HelthBar = this.add.graphics();
        this.updateHelthBar();
    }
    updateHelthBar(){
        if (this.playerHealth <= 0){
            this.playerHealth = 0;
        }
        const x = 10;
        const y = 10;
        const width = 200;
        const height = 20;

        this.HelthBar.clear();
        this.HelthBar.fillStyle(0x177245)
        this.HelthBar.fillRect(x, y, width * (this.playerHealth / 100), height);
        this.HelthBar.lineStyle(2, 0x000000)
        this.HelthBar.strokeRect(x, y, width, height);
        console.log(this.playerHealth)
    }
    handleColision() {
        this.playerHealth -= 0.01;
        if (this.playerHealth <= 0) {
            this.restartGame();
        }
        this.updateHelthBar();
    }
    restartGame(){
        this.playerHealth = 100;
        this.scene.restart();
    }
    update(){
        this.physics.add.overlap(this.player, this.enemy, this.handleColision, null, this);
if (this.cursor.left.isDown){
    this.player.setVelocityX(-120)
    this.player.anims.play('run', true);
    this.player.flipX = true;

}
else if (this.cursor.right.isDown){
    this.player.setVelocityX(120)
    this.player.anims.play('run', true);
    this.player.flipX = false;
}
else {
    this.player.setVelocityX(0)
    this.player.anims.stop('run');
    this.player.setTexture('player', 0);


}


if (this.cursor.up.isDown && this.player.body.touching.down){
    this.player.setVelocityY(-255)
    
}if (this.enemyDirection === 'right') {
    this.enemy.setVelocityX(120)
    this.enemy.flipX = false;
    this.enemy.anims.play('runEnemy',true);

} else if (this.enemyDirection === 'left') {
    this.enemy.setVelocityX(-120)
    this.enemy.flipX = true;
    this.enemy.anims.play('runEnemy',true);
}else {
    this.enemy.setVelocityX(0)
    this.enemy.anims.stop('run');
    this.enemy.setTexture('enemy', 0);


}

if (this.enemy.body.blocked.right) {
    this.enemyDirection = 'left';
} else if (this.enemy.body.blocked.left) {
    this.enemyDirection = 'right';
}






    }
}
