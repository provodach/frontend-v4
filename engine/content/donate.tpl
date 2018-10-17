<h2>Помощь радиостанции</h2>
<p>Радио &laquo;Проводач&raquo; — некоммерческая и полностью бесплатная интернет-радиостанция, целью создания которой стало появление в Сети самого атмосферного и неоыбчного места. Сюда приходят, чтобы отдохнуть, чтобы поработать, чтобы погулять, чтобы пообщаться. Сюда приходят, потому что здесь тепло.</p>
<p>Радиостанция работает на собственном сервере, не деля своё пространство с другими, чуждыми проектами. Наше тепло мы не отдадим никому. Кроме того, у неё красивый и запоминающийся домен. Всё это требует затрат, которые администрация радио не всегда в состоянии осуществлять. Именно поэтому мы просим у вас помощи. Для вас это пачка сигарет или проезд в метро, а для нас — возможность поддерживать бесперебойную работу Проводача.</p>

<h2>Оэлютс</h2>
<p>
	<div class="donate-container">
		<form method="POST" action="https://money.yandex.ru/quickpay/confirm.xml" target="_blank">
			<label for="sum">Сумма (руб):</label>
			<input type="text" name="sum" id="donate-amount" oninput="checkPayAmount()" value="50" data-type="number">
			<div class="donate-hint">Сумма платежа. От 5 рублей.</div>
			<label for="paymentType">Как оплатить:</label>
			<select name="paymentType" id="donate-payment-type" onchange="setPTHint()">
		    	<option value="PC">Дать ЯДу</option>
		    	<option value="AC">Сыграть картой</option>
		    	<option value="MC">С мобилы</option>
		    </select>
		    <div class="donate-hint" id="payment-type-hint">Оплата &laquo;Яндекс.Деньгами&raquo;</div>

		    <!--<div id="wp-container">
		    	<label id="wp-label"><input type="checkbox" id="want-present" onchange="setPresentRequest()">Хочу няштик :3</label>
		    	<div class="donate-hint">Если отметить галочку выше, мы отправим тебе приятный подарок от радиостанции. Для этого Яндекс спросит как тебя зовут и твой адрес. Эти данные не будут использованы никем кроме нас.</div>
		    </div>-->
		    <input type="hidden" name="receiver" value="410013798635527">
		    <input type="hidden" name="formcomment" value="На развитие Проводача">
		    <input type="hidden" name="short-dest" value="На развитие Проводача">
		    <input type="hidden" name="label" value="provodach_donate_page">
		    <input type="hidden" name="quickpay-form" value="donate">
		    <input type="hidden" name="targets" value="Пожертвование на радиостанцию Проводач">
		    <input type="hidden" name="need-fio" id="need-fio" value="false">
		    <input type="hidden" name="need-address" id="need-address" value="false">
		    <input type="hidden" name="successURL" value="https://api.nyan.pw/airin/donate/ok">
		    <input type="submit" id="donate-submit" value="Продолжить...">
		</form>

		<div id="donate-number">Если онлайн не получилось или неудобно, можно помочь нам, напрямую используя кошелёк Яндекс.Денег (например, через терминал):
		<br>
		<b>410013798635527</b></div>
	</div>
	<script type="text/javascript" src="/assets/js/donate.js?v<?php echo(CLIENT_VERSION); ?>"></script>
</p>
