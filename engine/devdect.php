<?php

function get_device ()
{
	if (stripos($_SERVER['HTTP_USER_AGENT'], 'iPod') ||
		stripos($_SERVER['HTTP_USER_AGENT'], 'iPad') ||
		stripos($_SERVER['HTTP_USER_AGENT'], 'iPhone'))
		return 'ios';
	elseif (stripos($_SERVER['HTTP_USER_AGENT'], 'Android'))
		return 'android';
	else
		return false;
}