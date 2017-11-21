import Phaser from 'phaser';
import Prefab from '../prefabs/Prefab';
import TilePrefab from '../prefabs/TilePrefab';
import PlayerUnit from '../prefabs/units/PlayerUnit';
import EnemyUnit from '../prefabs/units/EnemyUnit';
import PlayerMenuItem from '../prefabs/hud/PlayerMenuItem';
import EnemyMenuItem from '../prefabs/hud/EnemyMenuItem';
import AttackMenuItem from '../prefabs/hud/AttackMenuItem';
import Menu from '../prefabs/hud/Menu';
import PriorityQueue from '../utils/PriorityQueue';

class BattleState extends Phaser.State {

    constructor() {
        super();
        this.prefab_classes = {
            "background": TilePrefab.prototype.constructor,
            "rectangle": Prefab.prototype.constructor,
            "player_unit": PlayerUnit.prototype.constructor,
            "enemy_unit": EnemyUnit.prototype.constructor
        };
        this.TEXT_STYLE = {font: "14px Arial", fill: "#FFFFFF"};
    }

    init(level_data, extra_parameters) {
        this.level_data = level_data;
        this.enemy_data = extra_parameters.enemy_data;
        this.party_data = extra_parameters.party_data;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.current_turn = 0;
    }

    create() {
        let prefab_name;

        // create groups
        this.groups = {};
        this.level_data.groups.forEach((group_name) => {
            this.groups[group_name] = this.game.add.group();
        });

        // create prefabs
        this.prefabs = {};
        for (prefab_name in this.level_data.prefabs) {
            if (this.level_data.prefabs.hasOwnProperty(prefab_name)) {
                // create prefab
                this.create_prefab(prefab_name, this.level_data.prefabs[prefab_name]);
            }
        }

        // create enemy units
        for (let enemy_unit_name in this.enemy_data) {
            if (this.enemy_data.hasOwnProperty(enemy_unit_name)) {
                // create enemy units
                this.create_prefab(enemy_unit_name, this.enemy_data[enemy_unit_name]);
            }
        }

        // create player units
        for (let player_unit_name in this.party_data) {
            if (this.party_data.hasOwnProperty(player_unit_name)) {
                // create player units
                this.create_prefab(player_unit_name, this.party_data[player_unit_name]);
            }
        }
        this.init_hud();

        // store units in a priority queue which compares the units act turn
        this.units = new PriorityQueue((unit_a, unit_b) => {
            return unit_a.act_turn - unit_b.act_turn;
        });
        this.groups.player_units.forEach((unit) => {
            unit.calculate_act_turn(0);
            this.units.queue(unit);
        });
        this.groups.enemy_units.forEach((unit) => {
            unit.calculate_act_turn(0);
            this.units.queue(unit);
        });
        this.next_turn();
    }

    create_prefab(prefab_name, prefab_data) {
        let prefab;
        // create object according to its type
        if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
            prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, prefab_data.properties);
        }
    }

    init_hud() {
        // show player actions
        this.show_player_actions({x: 106, y: 210});
        // show player units
        this.show_units("player_units", {x: 202, y: 210}, PlayerMenuItem);
        // show enemy units
        this.show_units("enemy_units", {x: 10, y: 210}, EnemyMenuItem);
    }

    show_units(group_name, position, menu_item_constructor) {
        let unit_index, menu_items, unit_menu_item, units_menu;

        // create units menu items
        unit_index = 0;
        menu_items = [];
        this.groups[group_name].forEach((unit) => {
            unit_menu_item = new menu_item_constructor(
                    this,
                    unit.name + "_menu_item",
                    {x: position.x, y: position.y + unit_index * 20},
                    {group: "hud", text: unit.name, style: Object.create(this.TEXT_STYLE)}
            );
            unit_index += 1;
            menu_items.push(unit_menu_item);
        });
        // create units menu
        units_menu = new Menu(this, group_name + "_menu", position, {group: "hud", menu_items: menu_items});
    }

    show_player_actions(position) {
        let actions, actions_menu_items, action_index, actions_menu;
        // available actions
        actions = [{text: "Attack", item_constructor: AttackMenuItem}];
        actions_menu_items = [];
        action_index = 0;
        // create a menu item for each action
        actions.forEach((action) => {
            actions_menu_items.push(
                    new action.item_constructor(
                            this,
                            action.text + "_menu_item",
                            {x: position.x, y: position.y + action_index * 20},
                            {group: "hud", text: action.text, style: Object.create(this.TEXT_STYLE)}
                    )
                    );
            action_index += 1;
        });
        actions_menu = new Menu(this, "actions_menu", position, {group: "hud", menu_items: actions_menu_items});
    }

    next_turn() {
        if (this.groups.enemy_units.countLiving() === 0) {
            this.end_battle();
        }

        // if all player units are dead, restart the game
        if (this.groups.player_units.countLiving() === 0) {
            this.game_over();
        }
        this.current_turn++;
        console.log(`Turn ${this.current_turn} begins`);
        // takes the next unit
        console.log(this.units.items);
        this.current_unit = this.units.dequeue();
        // if the unit is alive, it acts, otherwise goes to the next turn
        if (this.current_unit.alive) {
            this.current_unit.act();
            this.current_unit.calculate_act_turn(this.current_unit.act_turn);
            this.units.queue(this.current_unit);
        } else {
            this.next_turn();
        }
    }

    game_over() {
        this.game.state.start("BootState", true, false, "assets/levels/level1.json", "WorldState", {restart_position: true});
    }

    end_battle() {
        this.groups.player_units.forEach((player_unit) => {
            this.party_data[player_unit.name].properties.stats = player_unit.stats;
        });
        // go back to WorldState with the current party data
        this.game.state.start("BootState", true, false, "assets/levels/level1.json", "WorldState", {party_data: this.party_data});
    }

}
;

export default BattleState;
