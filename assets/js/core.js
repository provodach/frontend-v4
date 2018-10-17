var
	localStorageAvailable = false,
	settings = {
		volume: 100,
		visualsActive : true
	};

function coreInit()
{
	localStorageAvailable = isLSAvailable();

	settings.volume = getVal('volume');

	/*if (getVal('visuals_active') == null)
		setVal('visuals_active', 1);

	settings.visualsActive = (+getVal('visuals_active') === 1) ? true : false;

	$('#volume-gauge-container').click(volumeBarPressed);

	if (settings.visualsActive)
		$('#cbx-visuals').addClass('active'); */
	
	radioInit();
}

function toggleVisuals() {
	cbx = $('#cbx-visuals');

	if (cbx.hasClass('active')) {
		cbx.removeClass('active');
		settings.visualsActive = false;
		setVal('visuals_active', 0);
	} else {
		cbx.addClass('active');
		settings.visualsActive = true;
		setVal('visuals_active', 1);
		draw();
	}
}

function toggleSettings() {
	var settingsOvr = $('#settings-overlay'),
		settingsWin = $('#settings');

	if (settingsWin.is(':visible')) {
		settingsOvr.fadeOut(200);
		settingsWin.fadeOut(150);
	} else {
		settingsOvr.fadeIn(150);
		settingsWin.fadeIn(200);
		setVolValue(radioGetVolume());
	}
}

function volumeBarPressed(event) {
	var
		ctl = $('#volume-gauge-container'),
		offset = ctl.offset();
		x = event.pageX - offset.left;

	radioSetVolume(x * 100 / ctl.width(), true);
}

$(document).ready(coreInit);