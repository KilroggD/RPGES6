import MenuItem from './MenuItem';
import ShowStat from './ShowStat';

class PlayerMenuItem extends MenuItem {
    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
        this.player_unit_health = new ShowStat(
            this.game_state,
            this.text + "_health",
            {x: 280, y: this.y},
            {group: "hud", text: "", style: properties.style, prefab: this.text, stat: "health"}
        );
    }
    
};

export default PlayerMenuItem;
