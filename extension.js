const St = imports.gi.St;
const Main = imports.ui.main;
const Util = imports.misc.util;
const Shell = imports.gi.Shell;

let button;

function toggleCalculator() {
	let win = _getWindowActor();
	
	if (!win) {
		Main.notify("Calculator Button Extension: Report this bug to the extension github page https://extensions.gnome.org/extension/1168/calculator-button/");
		return;
	}
	
	if (win === 'start') {
	    try {
			Util.trySpawnCommandLine('gnome-calculator');
		} catch(err) {
			Main.notify("Calculator Button Extension: Calculator not found. Is it installed?");
		}
	}

	if (win.has_focus()) {
		if (win.minimized) {
	  		win.unminimize();
	   		win.activate(global.get_current_time());
       	} else {
			win.minimize();
		}
	} else {
		win.unminimize();
		win.activate(global.get_current_time());
	}
}

function _getWindowActor() {
	
	ApplicationString = _('org.gnome.Calculator.desktop');
	
	var window = Shell.AppSystem.get_default().lookup_app(ApplicationString).get_windows()[0];
	if(typeof window == 'undefined') {
		window = 'start';
	}
	return window;
}

function init(extensionMeta) {
}

function enable() {
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
	button.connect('button-press-event', toggleCalculator);
	
	Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
	Main.panel._rightBox.remove_child(button);
}
