import Phaser from 'phaser';

class TilePrefab extends Phaser.TileSprite {
    constructor(game_state, name, position, properties) {
        super(game_state.game, position.x, position.y, properties.width, properties.height, properties.texture);
        this.game_state = game_state;
        this.name = name;
        this.game_state.groups[properties.group].add(this);
        this.frame = +properties.frame;
        this.game_state.prefabs[name] = this;
    }
};

export default TilePrefab;

