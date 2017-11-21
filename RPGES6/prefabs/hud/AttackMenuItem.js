import MenuItem from './MenuItem';

class AttackMenuItem extends MenuItem {
    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
    }
    
    select() {
        // disable actions menu
        this.game_state.prefabs.actions_menu.disable();
        // enable enemy units menu so the player can choose the target
        this.game_state.prefabs.enemy_units_menu.enable();
    }
};

export default AttackMenuItem;
