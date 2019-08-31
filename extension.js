const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Util = imports.misc.util;

let button;

function init(extensionMeta) {

	button = new St.Bin({
		style_class: 'panel-button',
		reactive: true,
		can_focus: true,
		x_fill: true,
		y_fill: false,
		track_hover: true});
						 
	let icon = new St.Icon({
		icon_name: 'accessories-calculator-symbolic',
		style_class: 'system-status-icon'});
		
	button.set_child(icon);
	button.connect('button-press-event', _startApplication);
}

function enable() {
	let children = Main.panel._rightBox.get_children();
	Main.panel._rightBox.insert_child_at_index(button, children.length-1)
}

function disable() {
	Main.panel._rightBox.remove_child(button);
}

function _startApplication() {
    try {
        Util.trySpawnCommandLine("gnome-calculator");
    } catch(err) {
        Main.notify("Display button extension: error");
    }
}
