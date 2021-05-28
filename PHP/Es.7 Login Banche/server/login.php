<?php
    header("content-type:application/json; charset=utf-8");
    require("php-mysqli.php");
    // step 1
    if(isset($_REQUEST["username"]))
        $user = $_REQUEST["username"];
    else
    {
        http_response_code(400);
        die("Parametro mancante: username");
    }
    if(isset($_REQUEST["password"]))
        $password = $_REQUEST["password"];
    else
    {
        http_response_code(400);
        die("Parametro mancante: password");
    }
    //step 2
    $con = _connection();
    //step 3
    $sql = "SELECT * FROM correntisti WHERE Nome='$user'"; //Prendiamo tutti i dati in base al nome scritto
    $rs = _execute($con,$sql);
    // step 4
    if(count($rs) == 0)//Controlla se l'username è stato digitato correttamente
    {
        http_response_code(401); // credenziali non valide
        $con->close();
        die("Credenziali non valide");
        
    }
    else
    {
        if($rs[0]["Pwd"] != $password)//Controllo della password
        {
            http_response_code(401); // credenziali non valide
            $con->close();
            die("Credenziali non valide");
        }
        else
        {
            // creiamo una sessione relativa all'utente
            session_start(); // accedo all'oggetto di sistema session
            $_SESSION["cCorrentista"] = $rs[0]["cCorrentista"];
            $_SESSION["scadenza"] = time() + SCADENZA;
            setcookie(session_name(),session_id(),time() + SCADENZA,"/");//Memorizza un valore per un tempo limitato
            // Se voglio restituire un json diretto devo scriverlo sotto forma di stringa già serializzata
            echo('{"ris":"ok"}');//Login effettuato correttamente(lo mando al client)
        } 
    }
    // step 5
    $con->close();
?>