var
	RADIO_CURRENT_TRACK,
	oldDocumentTitle,
	trackTimer,
	tempShowing = false;

function rnd(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randword()
{
    var s = '';
    var ltr = 'qwertyuiopasdfghjklzxcvbnm';
    while (s.length < 20)
    {
        s += ltr[rnd(0, 20)];
    }
    return s;
}

var radioPlayer = null;
var playerReady = false,
	currentChannel = '',
	nowPlaying = false,
	playerRestartTimer = null;

function radioInit()
{
	try
	{

		var a = document.createElement('audio');
		if (a.canPlayType('audio/aac') != 'no' &&

			// Opera has broken AAC decoder
			(navigator.userAgent.indexOf("Opera") == -1 &&
			navigator.userAgent.indexOf("OPR") == -1 &&

			// Some androids can't play AAC too.
			navigator.userAgent.indexOf("Android") == -1))

			currentChannel = 'provodach';
		else
			currentChannel = 'provodach.mp3';


		a.remove();
		delete a;

		setupVolumeControl(); 	
		
		// Restore volume settings
		radioSetVolume(radioGetVolume(), false);
		
		// Initialize track info.
		requestTrackInfo();

		setupBlurEvents();

		playerReady = true;

		visualInit();
	}
	catch (e)
	{
		error ("Error: " + e.message);
		playerReady = false;
	}
}

function setupBlurEvents() {

	oldDocumentTitle = document.title;

	$(window).focus(function() {
		document.title = oldDocumentTitle;
	}).blur(function() {
		oldDocumentTitle = document.title;
		document.title = "♪ " + RADIO_CURRENT_TRACK;
	});
}

function wheelVolControl(objEvent, intDelta)
{
	objEvent.preventDefault();
	var chg = (intDelta > 0) ? 5 : -5;
	radioSetVolume(radioGetVolume() + chg, true);
}

function setupVolumeControl()
{
	$('#settings').mousewheel(wheelVolControl);
}

function radioPlay(channel)
{
    channel = channel || currentChannel;

	if (playerReady) {
		// Create a player object
		radioPlayer = document.createElement('audio');
		radioPlayer.src = 'https://station.waveradio.org/'+channel+'?'+randword();
		radioPlayer.title = RADIO_CURRENT_TRACK;
		radioPlayer.volume = radioGetVolume() / 100;

		radioPlayer.onerror = function()
		{
			if (nowPlaying)
			{
				setTempTitle('Error, will restart in three seconds...');
				radioStop();

				clearTimeout(playerRestartTimer);
				playerRestartTimer = setTimeout(function() {
						radioPlay();
					}, 3000);
			}
		}

		radioPlayer.oncanplay = function()
		{
			setTrackInfo(RADIO_CURRENT_TRACK, true);
			clearTimeout(playerRestartTimer);
		}

		radioPlayer.onstalled = function()
		{
			setTempTitle('Low speed, waiting for more buffer...');
		}

		radioPlayer.onloadstart = function()
		{
			if (nowPlaying)
				setTempTitle('Buffering...');
		}
		
		radioPlayer.play();
		
		visualStart();

		$('#player-control-paused').hide();
		$('#player-control-playing').show();
		
		setVal('player_on', 1);
	}
		else
	error ('ERR: Still loading');
}

function radioStop()
{
	if (playerReady && radioPlayer)
	{
		radioPlayer.pause();
		radioPlayer.src = '';
		radioPlayer.remove();
		delete radioPlayer;

		// Make an object to be NULL to get radioToggle() correct work
		radioPlayer = null;
		visualStop();
		
		$('#player-control-playing').hide();
		$('#player-control-paused').show();
		setVal('player_on', 0);
	}
}


function radioGetVolume()
{
	var savedVol = getVal('volume');

    if (savedVol == null)
        return 100;
    else
        return parseInt(savedVol);
}

function radioSetVolume(value, userAct)
{
	userAct = userAct || false;
	if (value > 100)
		value = 100;
	else if (value < 0)
		value = 0;
			
    if (radioPlayer != null)
    {
        radioPlayer.volume = (value / 100);
    }
		
	if (userAct)
	{
		radioSaveVolume(value);
	}
	
	setVolValue(value);
}

function radioSaveVolume(value)
{
    setVal('volume', value);
}

function radioToggle(channel)
{
	channel = channel || currentChannel;
	if (!playerReady)
	{
		error ('Cannot start player, did not initialize yet');
		return false;
	}
    if (radioPlayer == null)
    {
        try
        {
        	nowPlaying = true;
            radioPlay(channel);
        }
        catch (e)
        {
            error('Error: ' + e.message);
        }
    }
    else
    {
        try
        {
        	nowPlaying = false;
            radioStop();
        }
        catch (e)
        {
            error('Error: ' + e.message);
        }
    }
}

function setVolValue(value)
{
	var
		gaugePlaceholder = $('#volume-gauge-container'),
		gauge = $('#volume-gauge');

	gauge.width(value * gaugePlaceholder.width() / 100);

}


function requestTrackInfo()
{
	setTimeout(requestTrackInfo, 15000);

    $.ajax(
    {
        url: 'https://bits.waveradio.org/api/track/provodach',
        dataType: 'json',
        crossDomain: true
    }).done(
        function (data)
        {
            processResult(data);
        }
    ).fail(function(jq, jx) { setTrackInfo('- bad connection -'); });
}


function processResult(csRes)
{
	
	if (tempShowing)
		return;
	
	try
	{
		var a = csRes["track"];
	}
	catch (e)
	{
		$("#track").text('- отказ сервера -');
		$("#track").attr("href", "#");
		return;
	}

    if (a == null || typeof a == 'undefined')
    {
        $("#track").text('- нет данных -');
        $("#track").attr("href", "#");
        return;
    }

    if (a == "" || a == '-')
	{
        a = "- нет данных -";
	}
	
	setTrackInfo (a);

}

function setTrackInfo (track, override)
{
	if (!track)
		return;

	var trackParts = track.split(/\s[\-\u2013]\s/),
		trackToDisplay = '';

	if (trackParts.length <= 1)
		trackToDisplay = track;
	else {
		trackToDisplay = trackParts[0] + ' – ' + trackParts[1];
	}

	if ((RADIO_CURRENT_TRACK !== trackToDisplay) || override) {
		RADIO_CURRENT_TRACK = trackToDisplay;

		// iOS
		if (radioPlayer != null)
			radioPlayer.title = trackToDisplay;

		// Android/Chrome
		if ('mediaSession' in navigator && radioPlayer != null)
		{
			navigator.mediaSession.metadata = new MediaMetadata({
			    title: trackParts[1],
			    artist: trackParts[0]
			  });
		}

		$("#track").text(trackToDisplay);
		$("#track").attr("href", "https://google.com/search?q=" + encodeURIComponent(trackParts[0] + ' ' + trackParts[1]));

		if (document.title !== oldDocumentTitle) {
			document.title = "♪ " + RADIO_CURRENT_TRACK;
		}
	}

}

function setTempTitle(title)
{
	tempShowing = true;
	var track = $('#track');
	track.attr("href", "#");
	
	track.html(title);
	clearTimeout(trackTimer);
	trackTimer = setTimeout(function() {tempShowing = false; setTrackInfo(RADIO_CURRENT_TRACK, true); }, 5000);
}
