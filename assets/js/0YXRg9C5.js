function fd_destroy(id) {
	$("#fd-" + id).remove();
}


function fd_window(title, content, buttons) {
	var
		windowId = randword();

	buttons = buttons || '<button onclick="_destroy_">OK</button>';

	buttons = buttons.replace(/_destroy_/g, 'fd_destroy(\'' + windowId + '\')');

	$("body").append('<div class="fd-main" id="fd-' + windowId + '">' +
		'<div class="fd-header">' +
			'<div class="fd-header-text">' + title + '</div>' +
			'<div class="fd-header-close" onclick="fd_destroy(\'' + windowId + '\')">' +
				'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="fd-close-button" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 357 357" xml:space="preserve">' +
					'<g>' +
						'<g>' +
							'<polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5" fill="#FFFFFF"/>' +
						'</g>' +
					'</g>' +
				'</svg>' +
			'</div>' +
		'</div>' +
		'<div class="fd-content">'
		 	+ content +
		'</div>' +
		'<div class="fd-buttons">' + buttons + '</div>' +
	'</div>');

	return windowId;
}

function fd_prompt(title, text, placeholder) {
	placeholder = placeholder || "";

	fd_window(title, "<div>" + text + "</div>" +
				'<input type="text" placeholder="' + placeholder + '" autocomplete="off">');
}

function fd_info(title, text, buttons) {
	fd_window(title, "<div>" + text + "</div>", buttons);
}

function fd_init() {
	setTimeout(function() {
		fd_info("Жри чепенья", "Мы используем кукисы. Согласны? Узнали?", '<button onclick="_destroy_">Согласен</button><button onclick="_destroy_">Согласен</button>');
	}, rnd(0, 3) * 1000);

	setTimeout(function() {
		fd_prompt("Хочу всё знать!", "Укажи свой емейл и мы будем спамить тебе туда каждый день обо всякой хрени. Отписаться, естественно, нельзя.", "fcukmymail@plz.com");
	}, rnd(5, 15) * 1000);

	setTimeout(function() {
		fd_info("Подписка или смерть", "Подпишись на нас в <a href='https://teleg.run/provodach'>телеге</a>.");
	}, rnd(15, 20) * 1000);

	setTimeout(function() {
		fd_info("Тащмайору на радость", "У нас ещё есть <a href='https://vk.com'>ВК</a>, ты знаешь что делать.");
	}, rnd(16, 30) * 1000);

	setTimeout(function() {
		fd_info("._.", "Мне скучно", '<button onclick="_destroy_">Мяу</button>');
	}, rnd(30, 50) * 1000);

	setTimeout(function() {
		fd_info("Верите ли Вы в Бога?", "Вы счастливы? Не хотите ли поговорить о Г-споде нашем, Хрисусе Исте?", '<button onclick="_destroy_">Да</button><button onclick="_destroy_">Да</button>');
	}, rnd(30, 35) * 1000);

	setTimeout(function() {
		fd_info("Подтверждение", "Запрошена остановка сервера Проводача. Выполнить?", '<button onclick="_destroy_">Отменить</button><button onclick="_destroy_">Отмена</button>');
	}, rnd(35, 40) * 1000);

	setTimeout(function() {
		fd_info("ПОДПИШИСЬ", "Слыш, я всё видел, где подписка на телеграм? Ммммммм???!!!");
	}, rnd(40, 45) * 1000);

	setTimeout(function() {
		fd_info("Ты стойкий...", "Дай обниму.", '<button onclick="_destroy_">Даю</button>');
	}, rnd(45, 50) * 1000);

	setTimeout(function() {
		fd_info("COVID-19", "Ну как оно, с ковидом-то? Дома сычуешь? Правильно.");
	}, rnd(50, 55) * 1000);
}

$(document).ready(fd_init);