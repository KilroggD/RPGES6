import Unit from './Unit';

class EnemyUnit extends Unit {
  
    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
        this.anchor.setTo(0.5);
        this.scale.setTo(-1, 1);
    }
    
    act() {
        let target_index, target, damage;
        // randomly choose target
        target_index = this.game_state.rnd.between(0, this.game_state.groups.player_units.countLiving() - 1);
        target = this.game_state.groups.player_units.children[target_index];
        this.attack(target);
    }
    
    kill() {
        let menu_item_index, menu_item;
        super.kill();
        menu_item_index = this.game_state.prefabs.enemy_units_menu.find_item_index(this.name);
        menu_item = this.game_state.prefabs.enemy_units_menu.remove_item(menu_item_index);
        menu_item.kill();  
    }
    
};

export default EnemyUnit;
