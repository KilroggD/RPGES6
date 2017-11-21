import Prefab from '../Prefab';
import Phaser from 'phaser';

class Menu extends Prefab {
       
    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
        this.visible = false;
        this.disabled = false;
        this.menu_items = properties.menu_items;
        this.current_item_index = 0;
    }
    
    process_input(event) {
        switch (event.keyCode) {
            case Phaser.Keyboard.UP:
                if (this.current_item_index > 0) {
                    // navigate to previous item
                    this.move_selection(this.current_item_index - 1);
                }
                break;
            case Phaser.Keyboard.DOWN:
                if (this.current_item_index < this.menu_items.length - 1) {
                    // navigate to next item
                    this.move_selection(this.current_item_index + 1);
                }
                break;
            case Phaser.Keyboard.SPACEBAR:
                if(this.menu_items[this.current_item_index] && !this.disabled) {
                    this.menu_items[this.current_item_index].select();
                }
                break;
        }
    }

    init_mouse() {
        this.menu_items.forEach((item) => {
            //attach mouse events
            item.inputEnabled = true;
            item.events.onInputOver.add(() => {
                if(!this.disabled) {
                    this.move_selection(this.find_item_index(item.text));
                }
            }, this);

            item.events.onInputDown.add(() => {
                if(!this.disabled) {
                    item.select();
                    this.move_selection(this.find_item_index(item.text));
                }
            }, this);
        });
    }
    
    move_selection(item_index) {
        if(this.menu_items[this.current_item_index]) {
            this.menu_items[this.current_item_index].selection_out();
        }
        this.current_item_index = item_index;
        if(this.menu_items[this.current_item_index]) {
            this.menu_items[this.current_item_index].selection_over();
        }
    }
    
    find_item_index(text) {
        for (let item_index = 0; item_index < this.menu_items.length; item_index += 1) {
            if (this.menu_items[item_index].text === text) {
                return item_index;
            }
        }
    }
    
    remove_item(index) {
        let menu_item = this.menu_items[index];
        // remove menu item
        this.menu_items.splice(index, 1);
        // update current_item_index if necessary
        if (this.current_item_index === index) {
            this.current_item_index = 0;
        }
        return menu_item;
    }
    
    enable() {
        this.disabled = false;
        this.current_item_index = 0;
        if (this.menu_items.length > 0) {
            this.menu_items[this.current_item_index].selection_over();
        }
        this.init_mouse();
        this.game_state.game.input.keyboard.addCallbacks(this, this.process_input);
    }
    
    disable() {
        if (this.menu_items.length > 0) {
            this.menu_items[this.current_item_index].selection_out();
        }
        this.current_item_index = 0;
        this.disabled = true;
    }
    
};

export default Menu;


