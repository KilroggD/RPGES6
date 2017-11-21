import Phaser from 'phaser';

class Prefab extends Phaser.Sprite {

    constructor(game_state, name, position, properties) {
        super(game_state.game, position.x, position.y, properties.texture);
        this.game_state = game_state;
        this.name = name;
        this.game_state.groups[properties.group].add(this);
        this.frame = +properties.frame;
        if (properties.scale) {
            this.scale.setTo(properties.scale.x, properties.scale.y);
        }
        this.game_state.prefabs[name] = this;
    }

}
;

export default Prefab;

