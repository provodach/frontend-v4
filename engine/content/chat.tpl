<div id="chat-messages">
</div>
<div id="chat-panel">
		<div id="chat-authorized">
			<textarea id="chat-text" placeholder="сообщение" autocomplete="off"></textarea>
		</div>
		
		<div id="chat-readonly">
			Чтобы писать в чат нужно пройти авторизацию <a href="https://oauth.vk.com/authorize?client_id=5216648&display=page&redirect_uri=https://api.https.cat/airin/auth&response_type=code">через ВК</a> или <a href="https://t.me/provodach_bot" target="_blank">через Telegram</a>.
		</div>
</div>

<!-- Mrr :3 -->
<audio id="message-sound" preload="auto">
		<source src="/assets/snd/mrr.ogg" type="audio/ogg">
		<source src="/assets/snd/mrr.mp3" type="audio/mpeg">
</audio>

<script type="text/javascript">
	$(document).ready(function() {saria_init('<?php echo ((preg_match('/^[a-zA-Z0-9]+$/', $_GET['auth']) == 1) ? $_GET['auth'] : null);?>'); });
</script>