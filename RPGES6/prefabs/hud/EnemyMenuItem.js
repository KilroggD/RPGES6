import MenuItem from './MenuItem';

class EnemyMenuItem extends MenuItem {
    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
    }
    
    select() {
        // get enemy prefab
        let enemy = this.game_state.prefabs[this.text];
        // attack selected enemy
        this.game_state.current_unit.attack(enemy);
        // disable menus
        this.game_state.prefabs.enemy_units_menu.disable();
        this.game_state.prefabs.player_units_menu.disable();
    }
};

export default EnemyMenuItem;
