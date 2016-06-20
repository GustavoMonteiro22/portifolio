<?php
error_reporting(0);

$emaildestinatario = 'gustavohms22@gmail.com';
$assunto = $_POST['header'];
$mensagemHTML  = $_POST['msg'];
$emailsender = 'gusta713@@ gustavodeveloper.com.br  ';

$headers = $_POST['email'] . "\r\n" .
    'Reply-To:' . $_POST['email'] . "\r\n" .
    'X-Mailer: PHP/' . phpversion();



if(!mail($emaildestinatario, $assunto, $mensagemHTML, $headers ,"-r".$emailsender)){ // Se for Postfix
	echo "<span >Email enviado com sucesso</div>";
}else{
	echo "<span >Devido a algun problema não possivel enviar o seu email/div>";
}

?>