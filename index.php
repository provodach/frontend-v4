<?php
require_once ('engine/content.php');
require_once ('engine/menu.php');
require_once ('engine/devdect.php');


// Change me when css/js is changed
define ('CLIENT_VERSION', 5);


$route = explode('/', $_GET['route']);

if (empty(trim($route[0])))
{
	$route[0] = 'news';
}

if ($route[0] == 'e')
{
	$redirectAddress = '';

	switch ($route[1])
	{
		case 'android':
			$redirectAddress = 'https://provoda.ch/404';
			break;

		case 'ios':
			$redirectAddress = 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1080566427';
			break;

		case 'telegram':
			$redirectAddress = 'https://t.me/provodach';
			break;

		case 'tunein':
			$redirectAddress = 'http://tunein.com/radio/Provodach-s255847/';
			break;

		case 'app' :
			$device = get_device();
			
			if (!$device)
				$redirectAddress = 'http://tunein.com/radio/Provodach-s255847/';
			elseif ($device == 'ios')
				$redirectAddress = 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1080566427';
			else
				$redirectAddress = 'https://provoda.ch/404';
			break;

		default:
			$redirectAddress = 'https://provoda.ch';
			break;
	}

	header ('HTTP/1.1 302 Redirect');
	header ('Location: '.$redirectAddress);

	die();
}

$content_template = get_template ($route[0]);
$page_title = get_title($route[0]);

if (!empty($menu[$route[0]]))
	$menu[$route[0]]['active'] = true;

if (isset($_GET['ajax']))
{
	include_once ('engine/content/'.$content_template);
	include_once ('engine/title_set.tpl');
	die();
}
else
{
	$content['background_mode'] = $site_mode;
	$content['title'] = $page_title.' &ndash; Радио &laquo;Проводач&raquo;';
	$content['current_page'] = $route[0];

	$content['menu'] = $menu; // see engine/menu.php
	
	include_once ('engine/header.tpl');
	include_once ('engine/content/'.$content_template);
	include_once ('engine/footer.tpl');
	die();
}