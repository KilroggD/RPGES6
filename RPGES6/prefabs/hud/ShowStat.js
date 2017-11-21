import TextPrefab from '../TextPrefab';

class ShowStat extends TextPrefab {
    constructor(game_state, name, position, properties){
        super(game_state, name, position, properties);
        this.prefab = this.game_state.prefabs[properties.prefab];
        this.stat = properties.stat;
    }
    
    update() {
        this.text = this.prefab.stats[this.stat];
    }
    
};

export default ShowStat;

