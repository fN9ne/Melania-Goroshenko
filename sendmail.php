<?php
	$token = "1797343636:AAGFtMGFxRt-FgK4vCmGCYlLxs7QZvBaTho";
	$chat_id = "-1001336310019";

	$arr = array(
		'Форма:' => $_POST["type"],
		'Имя: ' => $_POST["firstname"],
	);
	if ($_POST["phone"]) {
		$arr['Телефон: '] = $_POST["phone"];
	}
	if ($_POST["course"]) {
		$arr['Курс: '] = $_POST["course"];
	}
	if ($_POST["order-type"]) {
		$arr['Тип запису: '] = $_POST["order-type"];
	}
	if ($_POST["msg"]) {
		$arr['Сообщение: '] = $_POST["message"];
	}

	foreach($arr as $key => $value) {
		$txt .= "<strong>".$key."</strong> ".$value."%0A";
	};

	$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMEssage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

	if ($sendToTelegram) {
		$message = "Дані відправлені";
	} else {
		$message = "Помилка";
	}

	echo $message;
?>