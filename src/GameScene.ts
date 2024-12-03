import Phaser from 'phaser';

type CustomField = Phaser.GameObjects.Image & {
  waterLevel: number;
  sunLevel: number;
  plantState: number;
};

export default class GameScene extends Phaser.Scene {
  private keyA!: Phaser.Input.Keyboard.Key;
  private keyS!: Phaser.Input.Keyboard.Key;
  private keyD!: Phaser.Input.Keyboard.Key;
  private keyW!: Phaser.Input.Keyboard.Key;
  private stage3Counter: number = 0;
  private counterText!: Phaser.GameObjects.Text;
  fields: CustomField[] = [];
  farmer!: Phaser.GameObjects.Sprite;

  constructor() {
    super('game-scene');
  }

  preload() {
    this.load.image('background', 'assets/Background.jpg');
    this.load.image('field', 'assets/Field.png');
    this.load.image('sunflower1', 'assets/Sunflower1.png');
    this.load.image('sunflower2', 'assets/Sunflower2.png');
    this.load.image('sunflower3', 'assets/Sunflower3.png');
    this.load.image('herb1', 'assets/herb1.png');
    this.load.image('herb2', 'assets/herb2.png');
    this.load.image('herb3', 'assets/herb3.png');
    this.load.image('farmer', 'assets/farmer.png');
  }

  create() {
    this.keyA = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    let background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background');
    background.setScale(2, 2);

    const gridStartX = 100;
    const gridStartY = 250;
    const numRows = 5;
    const numCols = 8;
    const cellSpacingX = 50;
    const cellSpacingY = 50;
    const fieldScale = 0.2;

    this.fields = [];
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const x = gridStartX + col * cellSpacingX;
        const y = gridStartY + row * cellSpacingY;

        let field = this.add.image(x, y, 'field') as CustomField;
        field.setScale(fieldScale);

        field.waterLevel = 0;
        field.sunLevel = 0;
        field.plantState = 0;

        this.fields.push(field);
      }
    }

    this.counterText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height - 10,
      `Plants at stage 3: ${this.stage3Counter}`,
      { font: '20px Arial' }
    );
    this.counterText.setOrigin(0.5, 1);

    this.input.keyboard!.on('keydown-SPACE', this.incrementCounter, this);

    this.farmer = this.add.sprite(75, 75, 'farmer');
    this.farmer.setScale(0.5, 0.5);

    const button = this.add.text(400, 300, 'Click Me', {
      fontSize: '32px',
      backgroundColor: '#0088cc',
      padding: { x: 20, y: 10 },
      align: 'center',
    });
    button.setX(this.cameras.main.width - button.width - 20);
    button.setY(20);
    button.setInteractive();
    button.on('pointerdown', () => {
      console.log('hi');
    });
  }

  update() {
    const moveSpeed = 3;
    if (this.keyA.isDown) {
      this.farmer.x -= moveSpeed;
    } else if (this.keyD.isDown) {
      this.farmer.x += moveSpeed;
    }
    if (this.keyW.isDown) {
      this.farmer.y -= moveSpeed;
    } else if (this.keyS.isDown) {
      this.farmer.y += moveSpeed;
    }
  }

  private incrementCounter() {
    this.stage3Counter++;
    this.counterText.setText(`Plants at stage 3: ${this.stage3Counter}`);
  }
}
