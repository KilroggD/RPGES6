import Unit from './Unit';

class PlayerUnit extends Unit {
    
    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
        this.anchor.setTo(0.5);
    }
    
    act() {
        // search for the index of this unit in the player_units_menu
        let unit_index = this.game_state.prefabs.player_units_menu.find_item_index(this.name);
        this.game_state.prefabs.player_units_menu.move_selection(unit_index);
        // enable menu for choosing the action
        this.game_state.prefabs.actions_menu.enable();
    }
    
    kill() {
        let menu_item_index;
        super.kill();
        // remove from the menu
        menu_item_index = this.game_state.prefabs.player_units_menu.find_item_index(this.name);
        this.game_state.prefabs.player_units_menu.menu_items[menu_item_index].alpha = 0.5;
    }
    
};

export default PlayerUnit;
