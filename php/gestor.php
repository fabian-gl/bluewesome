<?php
if(session_id() == "") session_start();

if (isset($_SESSION["employer"]) && $_SESSION["employer"] == true)
{
    $tipo = (isset($_POST["tipo"])) ? filter_var($_POST['tipo'], FILTER_SANITIZE_STRING) : "";

    switch ($tipo)
    {
        case "listaArchivosCarpeta":
            $carpeta = (isset($_POST["carpeta"])) ? filter_var($_POST['carpeta'], FILTER_SANITIZE_STRING) : "";
            echo listaArchivosCarpeta($carpeta);
            break;
    }
}

function listaArchivosCarpeta($carpeta)
{
    $archivos = array_values(array_diff(scandir('../assets/portfolio/'.$carpeta), array('.', '..')));
    return json_encode(array('ok' => true, 'data' => $archivos));
}

?>