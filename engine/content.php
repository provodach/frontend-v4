<?php

function get_template ($mode)
{
	switch ($mode)
	{
		case 'news' :
			return 'news.tpl'; break;

		case 'about' :
			return 'about.tpl'; break;
			
		case 'chat' :
			return 'chat.tpl'; break;
			
		case 'pp' :
			return 'pp.tpl'; break;

		case 'donate' :
			return 'donate.tpl'; break;
			
		default :
			header ('HTTP/1.1 404 Not Found');
			return '404.tpl';
			break;
	}
}

function get_title($mode)
{
	switch ($mode)
	{
		case 'news' :
			return 'Новости'; break;

		case 'about' :
			return 'О радио'; break;
			
		case 'chat' :
			return 'Чат'; break;
			
		default :
			return '404';
			break;
	}
}