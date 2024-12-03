import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
	fields: any[]
	constructor() {
		super("game-scene")
	}

	preload() {
		this.load.image('background', '/assets/Background.jpg')
		this.load.image('field', '/assets/Field.png')

		this.load.image('sunflower1', '/assets/Sunflower1.png')
		this.load.image('sunflower2', '/assets/Sunflower2.png')
		this.load.image('sunflower3', '/assets/Sunflower3.png')

		this.load.image('herb1', '/assets/herb1.png')
		this.load.image('herb2', '/assets/herb2.png')
		this.load.image('herb3', '/assets/herb3.png')
	}

	create() {
		let background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background');
		background.setScale(2, 2);

		// Define grid properties
		const gridStartX = 100;
		const gridStartY = 250;
		const numRows = 5;
		const numCols = 8;
		const cellSpacingX = 50;
		const cellSpacingY = 50;
		const fieldScale = 0.2;

		//store fields in array
		this.fields = [];

		// Create the grid
		for (let row = 0; row < numRows; row++) {
			for (let col = 0; col < numCols; col++) {
				const x = gridStartX + col * cellSpacingX;
				const y = gridStartY + row * cellSpacingY;

				// Add a field image at each grid position
				let field = this.add.image(x, y, 'field');
				field.setScale(fieldScale);

				// Add field properties 
				field.waterLevel = 0;
				field.sunLevel = 0;
				field.plantState = 0;

				this.fields.push(field);
			}
		}
		
		this.fields.forEach((field, index) => {
			console.log(`Field ${index}: Water ${field.waterLevel}, Sun ${field.sunLevel}, State ${field.plantState}`);
		});
	}

	update() {
		
	}
}
