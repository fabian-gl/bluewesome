<?php
    if(session_id() == "") session_start();
    session_unset();
    session_destroy();
    echo 'Sesion borrada';
?>