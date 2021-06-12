<?php

if(session_id() == "") session_start();

$pagina = isset($_GET['p']) ? filter_var($_GET['p'], FILTER_SANITIZE_STRING) : "landing.html";

if (isset($_SESSION["employer"]) && $_SESSION["employer"] == true) irAPagina($pagina);
else
{
	$pass = isset($_POST['password']) ? filter_var($_POST['password'], FILTER_SANITIZE_STRING) : "";

	$obj = json_decode(file_get_contents("cosas2/datos.json"));

	if (password_verify($pass, $obj->password))
	{
		$_SESSION["employer"] = true;
		irAPagina($pagina);
	}
	else irAPagina('login.html');
}

function irAPagina($pagina)
{
	include "cosas/".$pagina;
}

?>