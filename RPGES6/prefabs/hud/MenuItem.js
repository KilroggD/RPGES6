import TextPrefab from '../TextPrefab';

class MenuItem extends TextPrefab {
    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
        this.selected = false;
    }
    
   selection_over() {
        this.fill = "#FFFF00";
    };

    selection_out() {
        this.fill = "#FFFFFF";
    };

    
};

export default MenuItem;
