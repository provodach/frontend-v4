var
    localStorageAvailable = false,
    settings = {
        volume: 100,
        visualsActive: true
    };

function coreInit() {
    localStorageAvailable = isLSAvailable();

    settings.volume = getVal('volume');

    if (getVal('visuals_active') == null)
        setVal('visuals_active', 1);

    settings.visualsActive = (+getVal('visuals_active') === 1) ? true : false;

    $('#volume-gauge-container').click(volumeBarPressed);

    if (settings.visualsActive)
        $('#cbx-visuals').addClass('active');

    if (currentSitePage === 'chat') {
        $('#chat-settings').show();
    } else {
        $('#chat-settings').hide();
    }

    radioInit();
}

function toggleSettings() {
    var settingsOvr = $('#settings-overlay'),
        settingsWin = $('#settings');

    if (settingsWin.is(':visible')) {
        settingsOvr.fadeOut(200);
        settingsWin.fadeOut(150);

        // When user is on the Chat page and closes
        // it we'll save their username and sent it
        // to the server
        if (currentSitePage === 'chat' && typeof setUserName === 'function') {
            setUserName();
        }

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

function mkactive(name) {
    $('.navi-link').removeClass('active');
    $('#menu-item-' + name).addClass('active');
}

function resetEvents() {
    $(document).off();
    $(window).off();
}

function loadContent(name) {
    resetEvents();
    $.ajax({
        url: '/' + name + '?ajax',
    }).done(function(c) {
        showContent(name, c);
    }).fail(function(jq, jx) {
        error('ERR: ' + jx);
    });
    return false;
}

function showContent(name, content) {
    history.pushState(null, null, name);

    currentSitePage = name;

    if (typeof saria_disconnect == 'function')
        saria_disconnect();

    if (currentSitePage === 'chat') {
        $('#chat-settings').show();
    } else {
        $('#chat-settings').hide();
        $(document).scrollTop(0);
    }

    mkactive(name);
    setupBlurEvents();

    $('#content').html(content);
}

$(document).ready(coreInit);