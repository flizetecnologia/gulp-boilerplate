<?php

/**
 * This file needs PHPMailler, paste in this folder.
 */

sleep(1);

/**
 * Who will receive this form message?
 */

the_form_submit('welcome@flize.com.br');

/**
 * The submit form.
 */

function the_form_submit($address)
{

	if($_SERVER['REQUEST_METHOD']=='POST')
	{

		$form['nome'] = trim($_POST['your_name']);
		$form['email'] = trim($_POST['your_email']);
		$form['telefone'] = trim($_POST['your_phone']);
		$form['mensagem'] = trim($_POST['your_message']);

		$validation['not_ok'][] = 0;
		$validation['ok'][] = 0;

		foreach($form as $key => $val)
		{
			if(empty($form[$key]) || ($key=='email' && !is_valid_email($form['email'])))
				$validation['not_ok'][] = $key;
			else
				$validation['ok'][] = $key;
		}

		if(count($validation['not_ok'])>1)
		{
			$json['status'] = '0';
			//$json['field'] = $validation;
			$json['texto'] = 'Error!';
			echo json_encode($json);
		}
		else
		{

			require('./PHPMailer/PHPMailerAutoload.php');

			$mail = new PHPMailer();
			$mail->From = $form['email'];
			$mail->FromName = $form['nome'];
			$mail->AddAddress($address);
			$mail->isHTML(true);
			$mail->Subject = 'Hello There| Flize Team';
			$mail->Body    = $form['mensagem'];

			if($mail->send())
			{
			    $json['status'] = '1';
				$json['texto'] = 'Success!';
				echo json_encode($json);
			}
			else
			{
				$json['status'] = '1';
				$json['texto'] = 'Error!';
				echo json_encode($json);
			}

		}

		die();

	}

}

/**
 * Valid email function
 */

function is_valid_email($email)
{

    $er = "/^(([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}){0,1}$/";
    if (preg_match($er, $email))
    	return true;
	else
    	return false;

}
