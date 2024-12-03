import Phaser from 'phaser'
import GameScene from './GameScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 512,
	height: 512,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [GameScene],
}

export default new Phaser.Game(config)


