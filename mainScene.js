export default class mainScene extends Phaser.Scene {
    constructor(){
        super('mainScene')
        this.ground;
        this.platforms;
        this.cursor;
        this.player;
        this.enemyDirection = 'right';



    }
    preload(){
        this.load.image('sky', '../../assets/sky.png')
        this.load.image('ground', '../../assets/ground.png')
        this.load.image('platform', '../../assets/platform.jpg')
        this.load.spritesheet('player', '../../assets/player/player.png',{frameWidth: 32, frameHeight: 32} )
        this.load.spritesheet('enemy', '../../assets/enemy/enemy.png',{frameWidth: 32, frameHeight: 32})
        

    }
    create(){  
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
            kay:'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        })
        this.enemy = this.physics.add.sprite(500, 300, 'enemy');
        this.enemy.setCollideWorldBounds(true);
        this.enemy.setBounce(0.2)
        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.collider(this.enemy, this.ground); 
        
    }
    update(){
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
}
if (this.enemyDirection === 'right') {
    this.enemy.setVelocityX(120)
    this.enemy.flipX = false;
    this.enemy.anims.play('runEnemy',true);

} else if (this.enemyDirection === 'left') {
    this.enemy.setVelocityX(-120)
    this.enemy.flipX = true;
    this.enemy.anims.play('runEnemy',true);
}






    }
}