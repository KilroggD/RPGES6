import Prefab from '../Prefab.js';

class EnemySpawner extends Prefab {
    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
        this.game_state.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.overlapping = true;
    }

    update() {
        this.overlapping = this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.check_for_spawn, null, this);
    }

    check_for_spawn() {
        let spawn_chance, encounter_index, enemy_encounter;
        // check for spawn only once for overlap
        if (!this.overlapping) {
            spawn_chance = this.game_state.game.rnd.frac();
            // check if the enemy spawn probability is less than the generated random number for each spawn
            for (encounter_index = 0; encounter_index < this.game_state.level_data.enemy_encounters.length; encounter_index += 1) {
                enemy_encounter = this.game_state.level_data.enemy_encounters[encounter_index];
                if (spawn_chance <= enemy_encounter.probability) {
                    // save current player position for later
                    this.game_state.player_position = this.game_state.prefabs.player.position;
                    // call battle state
                    this.game_state.game.state.start("BootState", false, false, "assets/levels/battle.json", "BattleState", {enemy_data: enemy_encounter.enemy_data, party_data: this.game_state.party_data});
                    break;
                }
            }
        }
    }

}
;

export default EnemySpawner;

