import 'pixi';
import 'p2';
import Phaser from 'phaser';
import BootState from './states/BootState';
import LoadingState from './states/LoadingState';
import BattleState from './states/BattleState';
import WorldState from './states/WorldState';

window.onload = function () {
    let game = new Phaser.Game(320, 320, Phaser.CANVAS);
    game.state.add("BootState", new BootState());
    game.state.add("LoadingState", new LoadingState());
    game.state.add("WorldState", new WorldState());
    game.state.add("BattleState", new BattleState());
    game.state.start("BootState", true, false, "assets/levels/level1.json", "WorldState", {});
};