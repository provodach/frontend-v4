var
    lastTrack,
    showingTrack,
    showingTrackStruct,
    oldDocumentTitle,
    trackTimer,
    lastStaticAudio,
    tempShowing = false;

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randword() {
    var s = '';
    var ltr = 'qwertyuiopasdfghjklzxcvbnm';
    while (s.length < 20) {
        s += ltr[rnd(0, 20)];
    }
    return s;
}

var radioPlayer = null;
var playerReady = false,
    currentChannel = '',
    playerRestartTimer = null;

function radioInit() {
    try {

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
    } catch (e) {
        error("Error: " + e.message);
        playerReady = false;
    }
}

function setupBlurEvents() {

    oldDocumentTitle = document.title;

    $(window).focus(function() {
        document.title = oldDocumentTitle;
    }).blur(function() {
        oldDocumentTitle = document.title;
        document.title = "♪ " + showingTrack;
    });
}

function wheelVolControl(objEvent, intDelta) {
    objEvent.preventDefault();
    var chg = (intDelta > 0) ? 5 : -5;
    radioSetVolume(radioGetVolume() + chg, true);
}

function setupVolumeControl() {
    $('#settings').mousewheel(wheelVolControl);
}

function radioPlay(channel) {
    channel = channel || currentChannel;

    if (radioPlayer) {
        console.warn("RadioPlayer is already running!", radioPlayer);
        return;
    }

    if (playerReady) {
        // Create a player object
        radioPlayer = document.createElement('audio');
        radioPlayer.src = 'https://station.waveradio.org/' + channel + '?' + randword();
        radioPlayer.title = showingTrack;
        radioPlayer.volume = radioGetVolume() / 100;

        lastStaticAudio = ""; // No static audio is playing right now

        radioPlayer.onerror = function() {
            if (radioPlayer) {
                setTempTitle('Error, will restart in three seconds...');
                radioStop();

                clearTimeout(playerRestartTimer);
                playerRestartTimer = setTimeout(function() {
                    radioPlay();
                }, 3000);
            }
        }

        radioPlayer.oncanplay = function() {
            setTrackInfo(showingTrack, true);
            clearTimeout(playerRestartTimer);
        }

        radioPlayer.onstalled = function() {
            setTempTitle('Low speed, waiting for more buffer...');
        }

        radioPlayer.onloadstart = function() {
            if (radioPlayer)
                setTempTitle('Buffering...');
        }

        radioPlayer.play();

        visualStart();

        $('#player-control-paused').hide();
        $('#player-control-playing').show();

        setVal('player_on', 1);
    } else
        error('ERR: Still loading');
}

function radioStop() {
    if (radioPlayer) {
        $(radioPlayer).off(); // disable all event listeners
        radioPlayer.pause();
        if (!lastStaticAudio) { // reset src only if we've playing the radio stream
            radioPlayer.src = '';
        }
        radioPlayer.remove();
        delete radioPlayer;

        // Make an object to be NULL to get radioToggle() correct work
        radioPlayer = null;
        visualStop();

        $('.audio-static-trackbar-wrap').off(); // disable seeking on static audio

        // radio player
        $('#player-control-playing').hide();
        $('#player-control-paused').show();

        // static players (if any)
        $('.audio-player-playing').hide();
        $('.audio-player-paused').show();
        setVal('player_on', 0);
    }
}


function radioGetVolume() {
    var savedVol = getVal('volume');

    if (savedVol == null)
        return 100;
    else
        return parseInt(savedVol);
}

function radioSetVolume(value, userAct) {
    userAct = userAct || false;
    if (value > 100)
        value = 100;
    else if (value < 0)
        value = 0;

    if (radioPlayer != null) {
        radioPlayer.volume = (value / 100);
    }

    if (userAct) {
        radioSaveVolume(value);
    }

    setVolValue(value);
}

function radioSaveVolume(value) {
    setVal('volume', value);
}

function radioToggle(channel) {
    channel = channel || currentChannel;
    if (!playerReady) {
        error('Cannot start player, did not initialize yet');
        return false;
    }
    if (radioPlayer) {
        try {
            radioStop();

            if (lastStaticAudio) {
                lastStaticAudio = "";
                radioPlay(channel);
            }
        } catch (e) {
            error('Error: ' + e.message);
        }
    } else {
        try {
            radioPlay(channel);
        } catch (e) {
            error('Error: ' + e.message);
        }
    }
}

function setVolValue(value) {
    var
        gaugePlaceholder = $('#volume-gauge-container'),
        gauge = $('#volume-gauge');

    gauge.width(value * gaugePlaceholder.width() / 100);

}


function requestTrackInfo() {
    setTimeout(requestTrackInfo, 15000);

    publicApiRequest(processBriefResult, true);
}

function publicApiRequest(onSuccess, isBrief) {
    $.ajax({
        url: 'https://core.waveradio.org/public/current',
        data: {
            station: 'provodach',
            brief: (isBrief ? '1' : '0')
        },
        dataType: 'json',
        crossDomain: true
    }).done(function(data) {
        onSuccess(data);
    }).fail(function(jq, jx) {
        setTrackInfo('- bad connection -');
    });
}


function processBriefResult(csRes) {

    if (tempShowing)
        return;

    if (csRes['payload'] !== lastTrack) {
        lastTrack = csRes['payload'];

        publicApiRequest(setTrackInfo);
    }
}

function splitTrackInfo(track) {
    return {
        artist: track.substr(0, track.indexOf(' - ')),
        title: track.substr(track.indexOf(' - ') + 3)
    };
}

function setTrackInfo(track, override) {
    if (!track)
        return;

    var trackToDisplay = '',
        trackStruct = {},
        artistLink = "";

    if (typeof track === 'string' && override) {
        trackToDisplay = track;
        trackStruct = splitTrackInfo(track);

    } else if (typeof track === 'object') {
        switch (track['status']) {
            case 0: // ok
            case 2: // some db problems but still splitted
                trackToDisplay = track['payload']['artist'] + ' – ' + track['payload']['title'];
                trackStruct = track['payload'];
                showingTrackStruct = track;

                if (track['payload']['links'] && track['payload']['links'].length > 0) {
                    artistLink = track['payload']['links'][0]['link_text'];
                }
                break;

            case 1: // server couldn't parse track info and sends us what it had
                trackToDisplay = track['payload']['raw_title'];
                trackStruct = splitTrackInfo(track['payload']['raw_title']);
                showingTrackStruct = {
                    payload: trackStruct
                };
                break;

            default:
                error('Bad track info');
                return;
        }
    }

    if ((showingTrack !== trackToDisplay) || override) {
        showingTrack = trackToDisplay;

        // iOS
        if (radioPlayer != null)
            radioPlayer.title = trackToDisplay;

        // Android/Chrome
        if ('mediaSession' in navigator && radioPlayer != null) {
            navigator.mediaSession.metadata = new MediaMetadata(trackStruct);
        }


        $("#track").text(trackToDisplay);
        $("#track").attr("href",
            artistLink ? artistLink :
            "https://google.com/search?q=" + encodeURIComponent(trackStruct['artist'] + ' ' + trackStruct['title']));

        if (document.title !== oldDocumentTitle) {
            document.title = "♪ " + trackToDisplay;
        }
    }

}

function setTempTitle(title) {
    tempShowing = true;
    var track = $('#track');
    track.attr("href", "#");

    track.html(title);
    clearTimeout(trackTimer);
    trackTimer = setTimeout(function() {
        tempShowing = false;
        setTrackInfo(showingTrackStruct, true);
    }, 5000);
}

function static_play(audioId) {

    radioStop();

    // JS's asycnchronousness sucks. 
    // If you know more elegant solution please file a PR.
    // Thank you m8.
    setTimeout(function() {
        if (audioId === lastStaticAudio) {
            lastStaticAudio = "";
            return;
        }

        lastStaticAudio = audioId;

        var
            audioUrl = crawley_audioDatabase[audioId].url,
            audioMeta = crawley_audioDatabase[audioId].meta;


        if (playerReady) {
            // Create a player object
            radioPlayer = document.createElement('audio');
            radioPlayer.src = audioUrl;
            radioPlayer.title = audioMeta || "Provoda.ch";
            radioPlayer.volume = radioGetVolume() / 100;

            radioPlayer.onerror = function() {
                // 
            }

            radioPlayer.oncanplay = function() {
                //
            }

            radioPlayer.onstalled = function() {
                // 
            }

            radioPlayer.onloadstart = function() {
                //
            }

            radioPlayer.onended = function() {
                lastStaticAudio = "";
                radioStop();
            }

            radioPlayer.onprogress = function() {

                if (radioPlayer) {
                    var duration = radioPlayer.duration;
                    if (duration > 0) {
                        for (var i = 0; i < radioPlayer.buffered.length; i++) {
                            if (radioPlayer.buffered.start(radioPlayer.buffered.length - 1 - i) < radioPlayer.currentTime) {
                                var progress = (radioPlayer.buffered.end(radioPlayer.buffered.length - 1 - i));

                                static_setGauge(audioId, 'loaded', progress, duration);
                                break;
                            }
                        }
                    }
                }
            }

            radioPlayer.ontimeupdate = function() {
                if (radioPlayer) {
                    static_setGauge(audioId, 'played', radioPlayer.currentTime, radioPlayer.duration);
                }

            }

            radioPlayer.play();

            // visualStart();

            $('#' + audioId + '-trackbar-wrap').click(static_onPositionSeek);
            $('#' + audioId + '-player-paused').hide();
            $('#' + audioId + '-player-playing').show();
        } else {
            error('ERR: Still loading');
        }
    }, 100);



}

function static_setGauge(audioId, gaugeType, value, max) {
    var
        totalWidth = +$('#' + audioId + '-trackbar').width(),
        gauge = null;

    switch (gaugeType) {
        case 'loaded':
            gauge = $('#' + audioId + '-trackbar-loaded');
            break;

        case 'played':
            gauge = $('#' + audioId + '-trackbar-played');
            break;

        default:
            return;
    }

    gauge.width((value * totalWidth) / max);
}

function static_onPositionSeek(event) {
    var
        ctl = $(event.target),
        offset = ctl.offset();

    if (radioPlayer) {
        var
            x = event.pageX - offset.left;

        radioPlayer.currentTime = (x * radioPlayer.duration / ctl.width());
    }
}