<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="description" content="Проводач. Самая атмосферная радиостанция в Сети.">
	<meta name="keywords" content="проводач, провода, панельки, панельные дома, урбанистика, онлайн радио, радио, радио онлайн, спокойная музыка, музыка для отдыха, пост рок, эмбиент, provodach, provoda.ch, panel house, panel buildings, plattenbau, plattenbauten, urban, urbanistic, wires, wire pole, ambient, post-rock, relax music, relaxation music, relax radio">
	<meta property="og:image" content="https://api.https.cat/graphics/provodach/web/night/">
	<meta name="author" content="Asterleen">
	<meta name="apple-itunes-app" content="app-id=1080566427">
	<meta name="theme-color" content="#020202">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300|PT+Sans:400,400i,700,700i&amp;subset=cyrillic,latin-ext" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/assets/provodach.css">

	<script src="//static.https.cat/js/jquery.js" type="text/javascript"></script>
	<script src="//static.https.cat/js/jquery.mousewheel.js" type="text/javascript"></script>
	<script src="//static.https.cat/js/util.js" type="text/javascript"></script>

	<script type="text/javascript">
		var currentSitePage = '<?php echo($content['current_page']); ?>';
	</script>
	<script type="text/javascript" src="/assets/js/radio.js?v<?php echo(CLIENT_VERSION); ?>"></script>
	<script type="text/javascript" src="/assets/js/visual.js?v<?php echo(CLIENT_VERSION); ?>"></script>
	<script type="text/javascript" src="/assets/js/saria.js?v<?php echo(CLIENT_VERSION); ?>"></script>
	<script type="text/javascript" src="/assets/js/core.js?v<?php echo(CLIENT_VERSION); ?>"></script>

	<title><?php echo($content['title']); ?></title>
</head>
<body>
	<div id="fullscreen-visuals">
		<canvas id="player-vis-fs"></canvas>
	</div>

	<div id="settings-overlay" onclick="toggleSettings()"></div>
	<div id="settings">
		<div id="settings-header">
			<div id="settings-header-text">Настройки</div>
			<div id="settings-header-close" onclick="toggleSettings()">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="settings-close-button" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 357 357" xml:space="preserve">
					<g>
						<g>
							<polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5" fill="#FFFFFF"/>
						</g>
					</g>
				</svg>
			</div>
		</div>
		<div id="settings-content">
			
			<div id="settings-volume">
				<h3>Громкость <span class="settings-hint">(используй колёсико мыши)</span></h3>
				<div id="volume-gauge-container">
					<div id="volume-gauge"></div>
				</div>
			</div>

			<h3>Эффекты</h3>
			<div class="checkbox" onclick="toggleVisuals();">
				<div class="checkbox-box" id="cbx-visuals"></div> Включить эффекты (может снизить производительность)
			</div>

			<div id="chat-settings">
				<h3>Настройки чата</h3>
				<input type="text" placeholder="Ник (латиница и цифры, Enter чтобы сохранить)" id="username" name="username" autocomplete="off">
				<div class="checkbox" onclick="setSoundState()">
					<div class="checkbox-box" id="cbx-chat-sound"></div> Звук, если мне написали
				</div>

				<div>
					Менять заголовок:
					<select id="title-change-level" onchange="setTitleLevel(this)">
						<option value="0">никогда</option>
						<option value="1">если мне написали</option>
						<option value="2">при любом сообщении</option>
					</select>
				</div>
			</div>
		</div>
	</div>


	<svg version="1.1" id="settings-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 452.949 452.949" xml:space="preserve" onclick="toggleSettings()">
		<g>
			<g>
				<g>
					<path d="M452.949,164.23h-76.187l53.912-53.912l-88.043-88.043l-53.912,53.912V0H164.23v76.187l-53.912-53.912l-88.044,88.043
						l53.912,53.912H0.001v124.487h76.187L22.275,342.63l88.044,88.044l53.912-53.912v76.187h124.487v-76.187l53.912,53.913
						l88.044-88.044l-53.912-53.912h76.187V164.23z M340.55,273.718l68.912,68.912l-66.831,66.831l-68.912-68.913v97.4H179.23v-97.4
						l-68.912,68.913L43.488,342.63l68.912-68.912H15.001V179.23H112.4l-68.912-68.912l66.831-66.831L179.23,112.4V15h94.487v97.4
						l68.912-68.912l66.831,66.831l-68.912,68.912h97.399v94.487H340.55z"/>
					<path d="M226.475,124.417c-56.274,0-102.057,45.783-102.057,102.057S170.2,328.531,226.475,328.531
						c56.275,0,102.058-45.783,102.058-102.057C328.533,170.2,282.749,124.417,226.475,124.417z M218.975,139.744v34.986
						c-22.841,3.296-40.948,21.403-44.244,44.244h-34.986C143.349,176.942,176.943,143.348,218.975,139.744z M218.975,313.204
						c-42.032-3.603-75.626-37.198-79.23-79.23h34.986c3.296,22.841,21.403,40.948,44.244,44.244V313.204z M189.185,226.474
						c0-20.562,16.729-37.29,37.29-37.29c20.563,0,37.291,16.728,37.291,37.29s-16.729,37.29-37.291,37.29
						S189.185,247.036,189.185,226.474z M233.975,313.205v-34.986c22.841-3.296,40.949-21.403,44.245-44.244h34.986
						C309.602,276.006,276.007,309.601,233.975,313.205z M278.22,218.974c-3.296-22.841-21.404-40.948-44.245-44.244v-34.986
						c42.032,3.604,75.627,37.198,79.231,79.23H278.22z"/>
					<rect x="211.545" y="44.79" width="29.86" height="15"/>
					<rect x="211.545" y="393.158" width="29.86" height="15"/>
					<rect x="42.337" y="218.974" width="29.86" height="15"/>
					<rect x="380.752" y="218.974" width="29.86" height="15"/>
				</g>
			</g>
		</g>
	</svg>

	<div id="container">
		<header>
			<canvas id="player-vis"></canvas>
			<div id="player-logo">
				<div id="logo">
					<svg version="1.1" id="provodach-text" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"><g><path d="M18.9,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S20.1,35.7,18.9,35.7z M18.9,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C21.1,39.1,20.1,40.1,18.9,40.1z M18.9,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C21.1,43.6,20.1,44.6,18.9,44.6z M18.9,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C21.1,48,20.1,49.1,18.9,49.1z M18.9,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C21.1,52.5,20.1,53.5,18.9,53.5z M18.9,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C21.1,57,20.1,58,18.9,58z M18.9,62.4c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C21.1,61.4,20.1,62.4,18.9,62.4z M18.9,66.9c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C21.1,65.9,20.1,66.9,18.9,66.9z M18.9,71.4c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C21.1,70.4,20.1,71.4,18.9,71.4z M23.4,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S24.6,31.2,23.4,31.2z M23.4,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C25.6,52.5,24.6,53.5,23.4,53.5z M27.8,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S29.1,31.2,27.8,31.2z M27.8,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C30.1,57,29.1,58,27.8,58z M32.3,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S33.5,31.2,32.3,31.2z M32.3,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C34.5,57,33.5,58,32.3,58z M36.8,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S38,31.2,36.8,31.2z M36.8,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C39,57,38,58,36.8,58z M41.2,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S42.5,35.7,41.2,35.7z M41.2,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C43.5,39.1,42.5,40.1,41.2,40.1z M41.2,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C43.5,43.6,42.5,44.6,41.2,44.6z M41.2,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C43.5,48,42.5,49.1,41.2,49.1z M41.2,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C43.5,52.5,42.5,53.5,41.2,53.5z"/><path d="M52.9,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S54.1,31.2,52.9,31.2z M52.9,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S54.1,35.7,52.9,35.7z M52.9,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C55.1,39.1,54.1,40.1,52.9,40.1z M52.9,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C55.1,43.6,54.1,44.6,52.9,44.6z M52.9,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C55.1,48,54.1,49.1,52.9,49.1z M52.9,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C55.1,52.5,54.1,53.5,52.9,53.5z M52.9,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C55.1,57,54.1,58,52.9,58z M57.4,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S58.6,35.7,57.4,35.7z M61.8,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S63.1,31.2,61.8,31.2z M66.3,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S67.5,31.2,66.3,31.2z M70.8,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S72,35.7,70.8,35.7z"/><path d="M79.5,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S80.8,35.7,79.5,35.7z M79.5,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C81.8,39.1,80.8,40.1,79.5,40.1z M79.5,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C81.8,43.6,80.8,44.6,79.5,44.6z M79.5,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C81.8,48,80.8,49.1,79.5,49.1z M79.5,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C81.8,52.5,80.8,53.5,79.5,53.5z M84,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S85.2,31.2,84,31.2z M84,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C86.2,57,85.2,58,84,58z M88.5,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S89.7,31.2,88.5,31.2z M88.5,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C90.7,57,89.7,58,88.5,58z M92.9,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S94.2,31.2,92.9,31.2z M92.9,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C95.2,57,94.2,58,92.9,58z M97.4,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S98.6,31.2,97.4,31.2z M97.4,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C99.6,57,98.6,58,97.4,58z M101.9,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S103.1,35.7,101.9,35.7z M101.9,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C104.1,39.1,103.1,40.1,101.9,40.1z M101.9,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C104.1,43.6,103.1,44.6,101.9,44.6z M101.9,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C104.1,48,103.1,49.1,101.9,49.1z M101.9,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C104.1,52.5,103.1,53.5,101.9,53.5z"/><path d="M112.8,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S114,31.2,112.8,31.2z M112.8,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S114,35.7,112.8,35.7z M117.3,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C119.5,39.1,118.5,40.1,117.3,40.1z M117.3,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C119.5,43.6,118.5,44.6,117.3,44.6z M117.3,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C119.5,48,118.5,49.1,117.3,49.1z M121.7,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C124,52.5,123,53.5,121.7,53.5z M121.7,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C124,57,123,58,121.7,58z M126.2,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C128.4,39.1,127.4,40.1,126.2,40.1z M126.2,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C128.4,43.6,127.4,44.6,126.2,44.6z M126.2,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C128.4,48,127.4,49.1,126.2,49.1z M130.7,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S131.9,31.2,130.7,31.2z M130.7,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S131.9,35.7,130.7,35.7z"/><path d="M141.6,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S142.8,35.7,141.6,35.7z M141.6,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C143.8,39.1,142.8,40.1,141.6,40.1z M141.6,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C143.8,43.6,142.8,44.6,141.6,44.6z M141.6,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C143.8,48,142.8,49.1,141.6,49.1z M141.6,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C143.8,52.5,142.8,53.5,141.6,53.5z M146.1,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S147.3,31.2,146.1,31.2z M146.1,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C148.3,57,147.3,58,146.1,58z M150.5,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S151.8,31.2,150.5,31.2z M150.5,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C152.8,57,151.8,58,150.5,58z M155,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S156.2,31.2,155,31.2z M155,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C157.2,57,156.2,58,155,58z M159.5,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S160.7,31.2,159.5,31.2z M159.5,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C161.7,57,160.7,58,159.5,58z M163.9,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S165.1,35.7,163.9,35.7z M163.9,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C166.2,39.1,165.1,40.1,163.9,40.1z M163.9,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C166.2,43.6,165.1,44.6,163.9,44.6z M163.9,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C166.2,48,165.1,49.1,163.9,49.1z M163.9,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C166.2,52.5,165.1,53.5,163.9,53.5z"/><path d="M175.6,31.2c1.2,0,2.2,1,2.2,2.2s-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2S174.4,31.2,175.6,31.2z M175.6,35.7c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C173.4,36.7,174.4,35.7,175.6,35.7z M175.6,40.1c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C173.4,41.1,174.4,40.1,175.6,40.1z M175.6,44.6c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C173.4,45.6,174.4,44.6,175.6,44.6z M175.6,49.1c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C173.4,50.1,174.4,49.1,175.6,49.1z M180,26.7c1.2,0,2.2,1,2.2,2.2s-1,2.2-2.2,2.2s-2.2-1-2.2-2.2S178.8,26.7,180,26.7z M180,53.5c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2s-2.2-1-2.2-2.2C177.8,54.5,178.8,53.5,180,53.5z M184.5,26.7c1.2,0,2.2,1,2.2,2.2s-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2S183.3,26.7,184.5,26.7z M184.5,53.5c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C182.3,54.5,183.3,53.5,184.5,53.5z M189,26.7c1.2,0,2.2,1,2.2,2.2s-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2S187.8,26.7,189,26.7z M189,53.5c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C186.7,54.5,187.8,53.5,189,53.5z M193.4,31.2c1.2,0,2.2,1,2.2,2.2s-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2S192.2,31.2,193.4,31.2z M193.4,53.5c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C191.2,54.5,192.2,53.5,193.4,53.5z M197.9,13.3c1.2,0,2.2,1,2.2,2.2s-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2S196.7,13.3,197.9,13.3z M197.9,17.8c1.2,0,2.2,1,2.2,2.2s-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2S196.7,17.8,197.9,17.8z M197.9,22.3c1.2,0,2.2,1,2.2,2.2s-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2S196.7,22.3,197.9,22.3z M197.9,26.7c1.2,0,2.2,1,2.2,2.2s-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2S196.7,26.7,197.9,26.7z M197.9,31.2c1.2,0,2.2,1,2.2,2.2s-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2S196.7,31.2,197.9,31.2z M197.9,35.7c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C195.7,36.7,196.7,35.7,197.9,35.7z M197.9,40.1c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C195.7,41.1,196.7,40.1,197.9,40.1z M197.9,44.6c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C195.7,45.6,196.7,44.6,197.9,44.6z M197.9,49.1c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C195.7,50.1,196.7,49.1,197.9,49.1z"/><path d="M209.6,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S210.8,35.7,209.6,35.7z M209.6,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C211.8,39.1,210.8,40.1,209.6,40.1z M209.6,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C211.8,43.6,210.8,44.6,209.6,44.6z M209.6,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C211.8,48,210.8,49.1,209.6,49.1z M209.6,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C211.8,52.5,210.8,53.5,209.6,53.5z M214,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S215.3,31.2,214,31.2z M214,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C216.3,57,215.3,58,214,58z M218.5,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S219.7,31.2,218.5,31.2z M218.5,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C220.7,57,219.7,58,218.5,58z M223,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S224.2,31.2,223,31.2z M223,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C225.2,57,224.2,58,223,58z M227.4,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S228.7,31.2,227.4,31.2z M227.4,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C229.7,52.5,228.7,53.5,227.4,53.5z M231.9,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S233.1,35.7,231.9,35.7z M231.9,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C234.1,39.1,233.1,40.1,231.9,40.1z M231.9,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C234.1,43.6,233.1,44.6,231.9,44.6z M231.9,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C234.1,48,233.1,49.1,231.9,49.1z M231.9,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C234.1,52.5,233.1,53.5,231.9,53.5z M231.9,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C234.1,57,233.1,58,231.9,58z"/><path d="M255.4,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S256.6,35.7,255.4,35.7z M255.4,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C257.6,39.1,256.6,40.1,255.4,40.1z M255.4,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C257.6,43.6,256.6,44.6,255.4,44.6z M255.4,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C257.6,48,256.6,49.1,255.4,49.1z M255.4,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C257.6,52.5,256.6,53.5,255.4,53.5z M259.8,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S261,31.2,259.8,31.2z M259.8,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2C262.1,57,261,58,259.8,58z M264.3,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S265.5,31.2,264.3,31.2z M264.3,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C266.5,57,265.5,58,264.3,58z M268.8,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S270,31.2,268.8,31.2z M268.8,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C271,57,270,58,268.8,58z M273.2,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S274.4,31.2,273.2,31.2z M273.2,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C275.4,57,274.4,58,273.2,58z M277.7,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S278.9,35.7,277.7,35.7z M277.7,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C279.9,57,278.9,58,277.7,58z"/><path d="M287.2,17.8c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S288.4,17.8,287.2,17.8z M287.2,22.3c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S288.4,22.3,287.2,22.3z M287.2,26.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S288.4,26.7,287.2,26.7z M287.2,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S288.4,31.2,287.2,31.2z M287.2,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S288.4,35.7,287.2,35.7z M287.2,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C289.4,39.1,288.4,40.1,287.2,40.1z M287.2,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C289.4,43.6,288.4,44.6,287.2,44.6z M287.2,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C289.4,48,288.4,49.1,287.2,49.1z M287.2,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C289.4,52.5,288.4,53.5,287.2,53.5z M287.2,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C289.4,57,288.4,58,287.2,58z M291.6,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S292.9,35.7,291.6,35.7z M296.1,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S297.3,31.2,296.1,31.2z M300.6,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S301.8,31.2,300.6,31.2z M305,31.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S306.3,31.2,305,31.2z M309.5,35.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S310.7,35.7,309.5,35.7z M309.5,40.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C311.7,39.1,310.7,40.1,309.5,40.1z M309.5,44.6c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C311.7,43.6,310.7,44.6,309.5,44.6z M309.5,49.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C311.7,48,310.7,49.1,309.5,49.1z M309.5,53.5c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C311.7,52.5,310.7,53.5,309.5,53.5z M309.5,58c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2C311.7,57,310.7,58,309.5,58z"/></g><path d="M243.9,53.5c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C241.7,54.5,242.7,53.5,243.9,53.5"/></svg>
				</div>

				<a href="javascript:void(0)" id="track" target="_blank">- wait -</a>

				<div id="player-bar">
					<div id="player" onclick="radioToggle()">
						<svg id="player-control-paused" class="player-control-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 183.93 210.54">
							<polygon points="2.5 4.31 2.5 206.23 178.9 105.27 2.5 4.31" style="fill:none;stroke-miterlimit:10;stroke-width:5px"/>
						</svg>
						<svg id="player-control-playing" class="player-control-icon" viewBox="0 0 156.43 206.52"><path d="M2.5,204H53.22V2.5H2.5ZM103.21,2.5V204h50.72V2.5Z" style="fill:none;stroke-miterlimit:10;stroke-width:5px"/></svg>
					</div>

					<?php foreach ($content['menu'] as $item => $properties) : ?> 
					<a
						class="navi-link<?php if($properties['active']) echo(' active');?>"
						href="/<?php echo($item); ?>" 
						id="menu-item-<?php echo($item); ?>"
						onclick="loadContent('<?php echo($item); ?>'); return false;"><?php echo($properties['title']); ?>
					</a>
					<?php endforeach; ?>
				</div>
			</div>
		</header>
		<content id="content">