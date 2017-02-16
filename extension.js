const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Util = imports.misc.util;
const Shell   = imports.gi.Shell;
const Lang    = imports.lang;

var dt = new Date();
let button;

function init(extensionMeta)
{
	button = new St.Bin({style_class: 'panel-button',
						 reactive: true,
						 can_focus: true,
						 x_fill: true,
						 y_fill: false,
						 track_hover: true});
	let icon = new St.Icon({icon_name: 'accessories-calculator-symbolic',
							style_class: 'system-status-icon'});
	button.set_child(icon);
	button.connect('button-press-event', Lang.bind(this, _toggleCalculator));
}

function enable()
{
	let children = Main.panel._rightBox.get_children();
	Main.panel._rightBox.insert_child_at_index(button, 0)
}

function disable()
{
	Main.panel._rightBox.remove_child(button);
}

function _toggleCalculator()
{
	let win = _getWindowActor();

	if (win === 'start')
	{
		if (new Date().getTime() > dt.getTime() )
		{
			dt.setTime( new Date().getTime() + 400 );
			_startApplication();
			return;
		}				
	}

	if (!win)
	{
		dt.setTime( new Date().getTime() + 200 );
		return;
	}

	if (win.has_focus())
	{
		if (win.minimized)
		{
			if (new Date().getTime() > dt.getTime() )
			{
		  		win.unminimize();
		   		win.activate(global.get_current_time());
		   		dt.setTime( new Date().getTime() + 40 );
			}
       	}
       	else
       	{
			if (new Date().getTime() > dt.getTime() )
			{
				dt.setTime( new Date().getTime() + 40 );
				win.minimize();
			}
         }
	}
	else
	{
		win.unminimize();
		win.activate(global.get_current_time());
		dt.setTime( new Date().getTime() + 200 );
	}
}

function _getWindowActor()
{
	ApplicationString = _('gnome-calculator.desktop');
	let window =Shell.AppSystem.get_default().lookup_app(ApplicationString).get_windows()[0];
	if(typeof window == 'undefined')
	{
		window = 'start';
	}
	return window;
}

function _startApplication()
{
	Main.Util.trySpawnCommandLine('gnome-calculator');
}
