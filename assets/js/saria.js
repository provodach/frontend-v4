/*
	Saria :: A WebSocket client for Airin Chat daemon.
	  Based on airin.js from Airin/3.3.0-nyanserver
	  Made by IDENT Software ~ http://identsoft.org
	  
	To get how it works, visit Airin API documentation page:
	https://wiki.nyan.pw/Airin/API
*/
var
	sariaSocket = null,
	sariaStatus = null,
	messageSound    = null,
	titleTimer  = null,
	
	sariaSettings = {
		server                 : 'airin.https.cat',
		port                   : 443,
		secure                 : true,
		authCode               : '',
		userName               : '',
		logCount               : 20,
		messagesQueueLength    : 50,
		defaultColor           : 'B60CCF',
		readonly               : false,
		connectRetries         : 5,
		messageSoundEnabled    : 1,
		titleNotificationLevel : 1
	},

	prefixCodes = [
		"\u{1F608}",
		"\u{1F480}",
		"\u{2620}\u{FE0F}",
		"\u{1F47B}",
		"\u{1F47D}",
		"\u{1F916}",
		"\u{1F9D9}",
		"\u{1F9DB}",
		"\u{1F9DF}",
		"\u{1F9DE}",
		"\u{1F987}",
		"\u{1F989}",
		"\u{1F577}\u{FE0F}",
		"\u{1F578}\u{FE0F}",
		"\u{1F31A}",
		"\u{1F383}"
	],
	
	messagesQueue   = [],
	commandsHistory = [],
		
	SARIA_VERSION   = '4.1.8',
	AIRIN_API_LEVEL = 3;


function autoScroll(appendedId)
{
	appendedId = appendedId || -1;
	
	if (appendedId > -1)
	{
		var apdBlock = $('#mesg-'+appendedId),
			cntBlock = $(document);
			
			cntBlock.scrollTop(cntBlock.scrollTop() + apdBlock.height() + 10);
	}
	else
	{
		if (sariaStatus.allowAutoscroll)
			$(document).scrollTop($(document).height()-$(window).height());

	}
}

function toggleSettings()
{
	var cab = $('#chat-settings'),
		ovl = $('#chat-settings-overlay');
		
	if (cab.is(':visible'))
	{
		cab.fadeOut(100);
		ovl.fadeOut(100);
	}
	else
	{
		cab.fadeIn(100);
		ovl.fadeIn(100);
	}

	return false;
}


function checkUserName(un)
{
	un = un || '';
	var isUserNameOk = ((un.search(/^[a-zA-Z0-9а-яА-ЯЁё]{3,20}$/, un) > -1) || (!un));
	$('#username').css({'border-bottom':'1px solid #'+(isUserNameOk ? '505050' : 'f02020')});
	return (isUserNameOk ? un : '_NULL');
}

function setUserName(enterPressed)
{
	var nuun = checkUserName($('#username').val());

	if (sariaSettings.userName == nuun) // don't think twice
		return;

	sariaSettings.userName = nuun;
	if (sariaSettings.userName != '_NULL')
	{
		setVal('username', sariaSettings.userName);
		if (enterPressed)
			saria_sendCommand('IAM #'+sariaSettings.userName);
	}
}

function setSoundState()
{
	var cbx = $('#cbx-chat-sound');

	if (cbx.hasClass('active')) {
		cbx.removeClass('active');
		sariaSettings.messageSoundEnabled = false;
	} else {
		cbx.addClass('active');
		sariaSettings.messageSoundEnabled = true;
	}

	setVal('message_sound_enabled', (sariaSettings.messageSoundEnabled) ? 1 : 0);
}

function setTitleLevel(obj)
{
	sariaSettings.titleNotificationLevel = +$(obj).val();
	setVal('title_notif_level', sariaSettings.titleNotificationLevel);
}

function restoreUserName()
{
	sariaSettings.userName = checkUserName(getVal('username'));
	$('#username').val(sariaSettings.userName);

	if (sariaSettings.userName && sariaStatus.authorized) {
		saria_sendCommand('IAM #'+sariaSettings.userName);
	}
}

function mentionId(id)
{
	var cm = $('#chat-text');
	cm.val('>>'+id+' '+cm.val());
	cm.focus();
}

function highlightId(id, active)
{
	var
		color = (active) ? '#505050' :
		(containsMyMessage($('#chat-content-'+id).text()) ? 'rgba(70, 70, 70, 0.35)' : 'transparent');
		
	$('#mesg-'+id).css({background:color});
}

function addMyMessage (id)
{
	messagesQueue.unshift (id);
	
	if (messagesQueue.length > sariaSettings.messagesQueueLength)
		messagesQueue.pop();

	setVal('messages', JSON.stringify(messagesQueue));
}

function containsMyMessage(mesg)
{
	var myMesgLength = messagesQueue.length;
	
	for (i = 0; i < myMesgLength; i++)
	{
		if (+messagesQueue[i] > 0 && mesg.indexOf('>>'+messagesQueue[i]) > -1)
			return true;
	}
	
	return false;
}

function messagesScrolled(ev)
{
	var conblock = $(document);


	if (conblock.scrollTop() > sariaStatus.maxScrollPosition)
		sariaStatus.maxScrollPosition = conblock.scrollTop();

	if (ev.originalEvent && !conblock.is(':animated'))
	{
		sariaStatus.allowAutoscroll = (conblock.scrollTop() >= sariaStatus.maxScrollPosition);
	}
}

function messagesWheeled (ev, delta)
{	
	if ($(document).scrollTop() == 0 && delta > 0 && sariaStatus.messagesLeft <= 0)
	{
		sariaStatus.messagesLeft = sariaSettings.logCount;
		saria_sendCommand('LOG '+sariaSettings.logCount+' '+(sariaStatus.minMessageId - sariaSettings.logCount)+' DESC');
	}
}


function setTitleState(blink)
{
	var titleText = '';

	switch (+sariaSettings.titleNotificationLevel)
	{
		case 0 : break;
		case 1 : titleText = '* Тебе написали *'; break;
		case 2 : titleText = '* Новое сообщение *'; break;
		default : saria_error('BAD SETTING');
	}

	if (blink)
	{
		if (sariaStatus.nowBlinking)
			return;

		sariaStatus.nowBlinking = true;
		titleTimer = setInterval(
			function()
			{
				var xtitle = (document.title == sariaStatus.normalTitle) ? titleText : sariaStatus.normalTitle;

				$(document).attr("title", xtitle);
			},

		1000);
	}
	else
	{
		sariaStatus.nowBlinking = false;
		clearInterval(titleTimer);
		document.title = sariaStatus.normalTitle;
	}
}

function saria_goReadonly(reconnect)
{
	$('#chat-authorized').hide();
	$('#chat-readonly').show();
	sariaSettings.readonly = true;

	if (reconnect)
		saria_reconnect();
	else
		saria_sendCommand('CONNECT READONLY #'+navigator.userAgent+' Saria/'+SARIA_VERSION);
}

function saria_toggleReady(isReady)
{
	(isReady) ? $('#chat-container').show() : $('#chat-container').hide();
	(isReady) ? $('#chat-waiting').hide() : $('#chat-waiting').show();
}

function saria_setServiceMessage(mesg)
{
	$('#chat-service-message').text(mesg);
}

function saria_startReconnect(reconnectingText)
{
	if (sariaStatus.connectRetries > sariaSettings.connectRetries)
	{
		saria_sysmessage ('Попытались переподключиться несколько раз, но не судьба.', 'error');
		return;
	}
	setTimeout(saria_reconnect, Math.round(Math.random() * 1000 + 5000));
	sariaStatus.connectRetries++;
}

	
/*
	Saria/Airin Error codes
	
	[1xx] System Errors
		100 Socket is already connected
		101 No parameters
		102 Could not create websocket
		103 Not connected
		199 Bad server command / System Error

	[2xx] Server-generated errors
		200 Not Authorized
		201 Auth failed
		202 User is banned
		203 Bad username
		204 No or very long message
		205 Flood limit reached, see next number
		206 No messages to display
		299 Syntax error / Internal Server error
*/

function saria_sysmessage(message, type, isRemovable, formatted)
{
	type = type || 'info';
	isRemovable = isRemovable !== false;
	formatted = (typeof formatted !== 'undefined') ? formatted : false;


	if (formatted)
		message = saria_processMessage(message);

	$('#chat-messages').append('<div class="service-message '+type+'"'+
		(isRemovable ? ' onclick="saria_removeSysmessage(this)">' : '>')
		+message+'</div>');

	autoScroll();
}

function saria_removeSysmessage(block)
{
	var blk = $(block);
	sariaStatus.maxScrollPosition = -1;
	blk.remove();
	autoScroll(); // ?
	return false;
}

function saria_error (code, message)
{
	switch (+code)
	{
		case 200 :
		case 201 :
			saria_goReadonly(false);
			break;
			
		case 202 :
			saria_setServiceMessage('Аккаунт заблокирован.');
			saria_toggleReady(false);
			saria_disconnect();
			break;
		case 203 :
			saria_sysmessage('Ник не может содержать никаких символов кроме латиницы и цифр.', 'warning');
			break;
			
		case 204 :
			saria_sysmessage('Сообщение слишком длинное или состоит из целого ничего!', 'warning');
			break;
			
		case 205 :
			saria_sysmessage('Упырь мел! Держи себя в руках, ковбой! Помедленнее!', 'warning');
			break;

		case 207 :
			saria_sysmessage('Такой ник уже занят, возьми другой.', 'error');
			break;
		
		case 1000:
		case 1001:
		case 1002:
			break;
			
		default:
			if (code > 1002)
			{
				if (sariaStatus.ready)
					saria_sysmessage('Сокет порвался неправильно (код '+code+'), перезапускаем...', 'warning');
				else
					saria_setServiceMessage('Ошибка #'+code+', повторяю...');

				saria_startReconnect();
			}
			break;
	}
	
	
}

function saria_log (message)
{
	console.log(message);
}

function saria_resetStatus()
{
	sariaStatus = {
		ready: false,
		authorized: false,
		lastMessageCode: '',
		nowSending: false,
		connectRetries: 0,
		allowAutoscroll: true,
		maxScrollPosition : -1,
		maxMessageId : 0,
		minMessageId : 0,
		messagesLeft : 0,
		currentCommandPosition : -1,
		isFocused : true,
		normalTitle : document.title,
		nowBlinking : false
	};
	
	commandsHistory = [];
}

function saria_init(auth)
{
	saria_resetStatus();

	sariaSettings.authCode = (auth) ? auth : ((getVal('auth_code')) ? getVal('auth_code') : '');
	
	if (auth)
	{
		setVal('auth_code', auth);
		history.pushState(null, null, 'chat');
	}

	// Needs because when we resize windows, autoscroll breaks down
	$(window).resize(function() { sariaStatus.maxScrollPosition = -1; autoScroll(); });
	
	$('#chat-text').keydown(function(e)
	{		
		switch (e.keyCode)
		{
			case 13 : // enter
			case 10 : // enter alternative
				if (!e.shiftKey)
				{
					e.preventDefault();
					saria_sendMessage();
					return false;
				}
				break;
			
			case 38 : // up
				e.preventDefault();
				
				if (commandsHistory.length > 0)
				{
					if (sariaStatus.currentCommandPosition < commandsHistory.length - 1)
					{
						sariaStatus.currentCommandPosition++;
						if (sariaStatus.currentCommandPosition < commandsHistory.length)
							$('#chat-text').val(commandsHistory[sariaStatus.currentCommandPosition]);
					}
				}
				
				return false;
				
				break;
				
			case 40 : // down
				e.preventDefault();
				
				if (commandsHistory.length > 0)
				{
					
					if (sariaStatus.currentCommandPosition >= 0)
					{
						sariaStatus.currentCommandPosition--;
						
						if (sariaStatus.currentCommandPosition <= -1)
							$('#chat-text').val('');
						else
						{
							$('#chat-text').val(commandsHistory[sariaStatus.currentCommandPosition]);
						}
					}
				}
				
				return false;
				
			break;
		}
	});

	
	$(document).on('scroll', (messagesScrolled));
	
	$('#content').mousewheel(messagesWheeled);
	$('#chat-settings-overlay').mousewheel(function(ev, d) {ev.preventDefault; return false;});
	$('#chat-settings').mousewheel(function(ev, d) {ev.preventDefault; return false;});
	
	$('#username').keydown(function(e) {
		setUserName(e.keyCode == 13 || e.keyCode == 10);
	});
	
	$('#username').blur(function() {
		setUserName(true);
	});

	$(window).focus(function() {sariaStatus.isFocused = true; setTitleState(false)})
				.blur(function() {sariaStatus.isFocused = false});

	restoreUserName();

	messageSound = document.getElementById('message-sound');

	sariaSettings.messageSoundEnabled = (+getVal('message_sound_enabled', 0) === 1);
	if (sariaSettings.messageSoundEnabled) {
		$('#cbx-chat-sound').addClass('active');
	}

	sariaSettings.titleNotificationLevel = +getVal('title_notif_level', 1);
	$('#title-change-level').val(sariaSettings.titleNotificationLevel);
	
	if (sariaSettings.authCode)
	{
		var mqJson = getVal('messages', '[]');
		if (mqJson.length > 0)
			messagesQueue = JSON.parse(mqJson);
	}
		else
	{
		sariaSettings.readonly = true;
	}

	saria_connect();
}

function saria_connect()
{	
	if (sariaSocket)
	{
		saria_error(100, 'Saria Socket is already connected. Disconnect it first!');
		return;
	}

	if (!('WebSocket' in window))
	{
		saria_error (199, 'No WebSocket support!');
		return;
	}
	
	saria_resetStatus();

	if (!sariaSettings.server || !sariaSettings.port)
		{
			saria_error (101, 'No server and/or port specified!');
			return;
		}
	
	saria_log ('Welcome to Saria Chat Client. I\'ll use WebSocket, may I? :3');
	try
	{
		sariaSocket = new WebSocket((sariaSettings.secure ? 'wss' : 'ws')+'://'+sariaSettings.server+':'+sariaSettings.port);
		sariaSocket.onmessage = function (ev) { saria_getCommand(ev.data); };
		sariaSocket.onclose = function (ev) { saria_error(ev.code, (ev.reason) ? ev.reason : 'Websocket disconnected itself'); };
	}
	catch (e)
	{
		saria_error (102, 'WebSocket creation failed: '+e.message);
		return;
	}
}

function saria_disconnect()
{
	if (sariaSocket)
	{
		sariaStatus.ready = false;
		sariaSocket.close (1000);
		sariaSocket = null;
	}
}

function saria_reconnect()
{
	if (!sariaSettings.server || !sariaSettings.port)
	{
		saria_error(103, 'Cannot reconnect without settings! Try connecting first.');
	}
	saria_disconnect();
	saria_connect();
}

function saria_sendCommand (command)
{
	if (sariaSocket)
	{
		saria_log ('Client command: '+command);
		sariaSocket.send(command);
		return true;
	}
		else
	{
		saria_error(103, 'Saria is not connected, cannot send message.');
		return false;
	}
}

// go fcuk urself zalgoautists
function saria_unzalgo (text)
{
	return text.replace(/[\u0300-\u036f\u0483-\u0489\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/gm, '');
}

// TODO
function saria_unemoji (text)
{
	
}

// Special for Ree.
// AWWWW SHIT NIGGA! NESTED SPOILER PROCESSING IN JS! OH MY GODEENSS!!11!!
// Yeah, it's very very very very extremely shitty. Sorry guys.
function saria_spoiler (text)
{
	var patt = new RegExp ('\\[spoiler\\](.+)\\[\\/spoiler\\]', 'im');
    
    while (text.search(patt) > -1)
    {
        text = text.replace('[spoiler]', '<span class="chat-spoiler">');
        text = text.replace('[/spoiler]', '</span>');
    }
    
    return text;
}

function saria_sanitize(message)
{
	var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};
		
	message = message.replace(/[&<>"']/g, function(m) { return map[m]; });
	
	return saria_unzalgo(message);
}

function saria_processMessage(message)
{
	message = saria_sanitize(message);

	// Special replacements
	message = message.replace (/h3sot/gi, '<b>H<sub>3</sub>S&Ouml;T</b>');
	message = message.replace (/\(c\)/gi, '&copy;');
	message = message.replace (/\(r\)/gi, '&reg;');
	message = message.replace (/\(tm\)/gi, '&trade;');
	message = message.replace(/\-\-\-/g, '—');
    message = message.replace(/\-\-/g, '–');
    message = message.replace(/\&quot\;(.+?)\&quot\;/g, '«$1»');
	
	var parsePatterns = [
			'\\[b\\](.+?)\\[/b\\]', // b
			'\\[i\\](.+?)\\[/i]', // i
			'\\[u\\](.+?)\\[/u\\]', // u
			'\\[s\\](.+?)\\[/s\\]', // s
			'\\[sub\\](.+?)\\[/sub\\]', // sub
			'\\[sup\\](.+?)\\[/sup\\]', // sup
			'&gt;&gt;([0-9]{1,10})', // mention
			'(https?:\\/\\/([a-zA-Z0-9\\-\\.]+)\\/?[a-zA-Z0-9?&=.:;\\#\\/\\-_~%+]*)', // url
			'^&gt;(.*)$',// , // quotation
		    '^#!(.*)$' // redline
			];
			
		var parseReplaces = [
			'<b>$1</b>', // b
			'<i>$1</i>', // i
			'<u>$1</u>', // u
			'<s>$1</s>', // s
			'<sub>$1</sub>', // sub
			'<sup>$1</sup>', // sup
			'<a href="javascript:void(0)" class="chat-mention" onmouseover="highlightId(\'$1\', true);" onmouseout="highlightId(\'$1\', false);">&gt;&gt;$1</a>', // mention
			'<a href="$1" title="$1" target="_blank">$2</a>', // url
			'<span class="chat-quote">&gt;$1</span>', // quotation
			'<span class="redline">$1</span>', // redline
			];
			
		for (i = 0; i < parsePatterns.length; i++)
		{
			message = message.replace(new RegExp(parsePatterns[i], 'gim'), parseReplaces[i]);
		}
		
		message = saria_spoiler(message);
	
	return message;
}


function saria_getCommand (command)
{
	saria_log('Server command: '+command);
	var commands = command.split (' '),
		fulltext = command.substr(command.indexOf('#')+1),
		mainCmd = commands[0];
	
	switch (mainCmd)
	{
		case 'INIT' :
			saria_log ('You are using '+fulltext);
			saria_sendCommand('LEVEL '+AIRIN_API_LEVEL);

			if (sariaSettings.readonly)
				saria_goReadonly(false);
			else
				saria_sendCommand('CONNECT '+ sariaSettings.authCode+' #'+navigator.userAgent+' Saria/'+SARIA_VERSION);

			saria_setServiceMessage('Проверяю авторизацию...');
			break;
			
		case 'AUTH' :
			switch (commands[1])
			{
				case 'OK' :
				case 'READONLY':
					if (sariaSettings.readonly)
					{
						$('#chat-authorized').hide();
						$('#chat-settings-button').hide();
						$('#chat-readonly').show();
					}
					else
					{
						$('#chat-authorized').show();
						$('#chat-settings-button').show();
						$('#chat-readonly').hide();
						sariaStatus.authorized = true;
						
						if (sariaSettings.userName)
							saria_sendCommand('IAM #'+sariaSettings.userName);
					}
						
					$('#chat-messages').html('');
					saria_toggleReady(true);
					saria_sendCommand('LOG '+sariaSettings.logCount+' DESC');
					break;
					
				case 'FAIL' :
					saria_setServiceMessage('Не авторизовался, перехожу в режим RO: '+fulltext);
					saria_error (201, fulltext);
					break;
					
				case 'BANNED' :
					saria_setServiceMessage('Ты заблокирован, прости.');
					saria_disconnect();
					// saria_error (202, fulltext);
					break;
			}
			break;
			
		case 'CONTENT' :
		case 'LOGCON'  :
		
			if (commands.length < 5)
			{
				saria_error(199, 'Server sent bad data');
				break;
			}
			
			var stamp = new Date(+commands[2]*1000),
				time  = ((stamp.getHours() < 10) ? '0' : '')+stamp.getHours()+':'+
						((stamp.getMinutes() < 10) ? '0' : '')+stamp.getMinutes()+':'+
						((stamp.getSeconds() < 10) ? '0' : '')+stamp.getSeconds(),
				date  = ((stamp.getDate() < 10) ? '0' : '')+stamp.getDate()+':'+
						((stamp.getMonth()+1 < 10) ? '0' : '')+(stamp.getMonth()+1)+':'+
						stamp.getFullYear();
						
			/*
				<div class="chat-message" id="1">
					<span class="chat-time">[13:37:21]</span>
					<span class="chat-id">1337</span>
					<span class="chat-name">vereleen</span>
					<span class="chat-content">няяши говорят няя</span>
				</div>
			
				id          commands[1]
				timestamp   commands[2]
				name        commands[3]
				color       commands[4]
				
			*/
			
			var color = (commands[4] !== 'NULL') ? commands[4] : sariaSettings.defaultColor,
				colorOverride = 'ffa254',
				isForMe = containsMyMessage(fulltext),
				border = (isForMe) ? 'background: rgba(70, 70, 70, 0.35); border-left: 3px solid #'+sariaSettings.defaultColor : '',
				prefixIdx = parseInt(color[0], 16);
			
			var messageHtml = '<div class="chat-message" style="'+border+'" id="mesg-'+commands[1]+'"><span class="chat-time">'+time+'</span> <span class="chat-id" onclick="mentionId('+commands[1]+')">'+commands[1]+'</span> <span class="chat-name" style="color: #'+colorOverride+'" onclick="mentionId('+commands[1]+')"> '+prefixCodes[prefixIdx]+' '+commands[3]+'</span> <span class="chat-content" id="chat-content-'+commands[1]+'">'+saria_processMessage(fulltext)+'</span></div>';

			// var messageHtml = '<div class="chat-message" style="'+border+'" id="mesg-'+commands[1]+'"><span class="chat-time">'+time+'</span> <span class="chat-id" onclick="mentionId('+commands[1]+')">'+commands[1]+'</span> <span class="chat-name" style="color: #'+color+'" onclick="mentionId('+commands[1]+')"><img class="chat-pic-fd" src="//api.https.cat/airin/catty.svg?c='+color+'"></span> <span class="chat-content" id="chat-content-'+commands[1]+'">'+saria_processMessage(fulltext)+'</span></div>';
			
			
			if (mainCmd == 'LOGCON')
			{
				$('#chat-messages').prepend(messageHtml);
				
				if (+commands[1] > sariaStatus.maxMessageId)
				{
					sariaStatus.maxMessageId = +commands[1];
					if (sariaStatus.minMessageId == 0)
						sariaStatus.minMessageId = +commands[1];
				}
				
				if (+commands[1] < sariaStatus.minMessageId)
					sariaStatus.minMessageId = +commands[1];
				
				if (sariaStatus.messagesLeft > 0)
				{
					sariaStatus.messagesLeft--;
				}

				autoScroll(commands[1]);
			}
			else
			{
				$('#chat-messages').append(messageHtml);

				if (isForMe)
				{
					if (sariaSettings.messageSoundEnabled)
						messageSound.play();
				}

				if (!sariaStatus.isFocused)
				{
					switch (+sariaSettings.titleNotificationLevel)
					{
						case 0 : break;
						case 1 : if (isForMe) setTitleState(true); break;
						case 2 : setTitleState(true); break;
						default : saria_error('BAD SETTING');
					}
				}

				autoScroll();
			}
			
			

			break;
			
		case 'CONREC' :
			if (commands[1] == sariaStatus.lastMessageCode)
			{
				$('#chat-text').val('');
				sariaStatus.nowSending = false;

				if (commands[2] != 0) // it's not a user command
					addMyMessage(commands[2]);
			}
			break;
			
		case 'NTM' :
			saria_log('Name is accepted by the server :3');

			var m = (fulltext) ? fulltext : 'незнакомец';
			saria_sysmessage('Добро пожаловать, '+m+'!', 'info');
			break;
			
		case 'FAIL' :
			saria_error(commands[1], fulltext);
			break;

		case 'NUS' :
			saria_sendCommand('SUS');
			break;
			
			
		case 'SERVICE' :
			var messageClass = '';
			switch (commands[1])
			{
				case 'INFO' : messageClass = 'info'; break;
				case 'WARNING' : messageClass = 'warning'; break;
				case 'ERROR' : messageClass = 'error'; break;
				default : messageClass = 'info';
			}
			
			saria_sysmessage(saria_sanitize(fulltext), messageClass, false);
			
			break;

		case 'MOTD' :
			saria_sysmessage('На повестке: '+fulltext, 'neutral', false, true);
			break;


		case 'RESTART' :
			saria_sysmessage('Сервер просит выполнить перезагрузку страницы. Выполняем...', 'info');
			setTimeout(function(){location.reload(true)}, Math.round(Math.random() * 2000 + 1000));
			break;

		case 'REMCON' :
			saria_removeSysmessage(document.getElementById('mesg-'+commands[1]));
			break;
	}
}

function saria_sendMessage(message)
{
	message = message || $('#chat-text').val();
	message = message.trim();
	
	if (message && sariaStatus.authorized && !sariaStatus.nowSending)
	{
		sariaSettings.nowSending = true;
		sariaStatus.lastMessageCode = (typeof randword === 'function') ? randword() : Math.floor(Math.random(10*9999));
		
		if (message.indexOf('/') === 0)
		{
			if (commandsHistory.indexOf(message) == -1)
				commandsHistory.unshift(message);
			
			saria_sysmessage('# '+message, 'neutral');
			sariaStatus.currentCommandPosition = -1;
		}
		
		saria_sendCommand('CONTENT '+sariaStatus.lastMessageCode+' #'+message);
	}
}