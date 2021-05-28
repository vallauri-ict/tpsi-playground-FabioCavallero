<?php
    header("content-type:application/json; charset=utf-8");
    require("php-mysqli.php");
    // step 0 controllo sessione
    _checkSession("cCorrentista");//Se la sessione è scaduta vengo rimandato al login
    // step 1
    $cCorrentista = $_SESSION["cCorrentista"];
    //step 2
    $con = _connection();
    //step 3
    $sql = "SELECT filiali.nome,filiali.cFiliale FROM conti,filiali WHERE conti.cFiliale = filiali.cFiliale and conti.cCorrentista = $cCorrentista";//Informazioni filiale
    $rs = _execute($con,$sql);
    $sql2 = "SELECT Nome FROM correntisti WHERE cCorrentista = $cCorrentista"; //Nome correntista
    $rs2 = _execute($con,$sql2);
    // step 4
    if($rs && $rs2)//Controllo se sono vuoti o no
    {
        $ris = array();//Creo un vettore risultante
        $ris["Nome"] = $rs2[0]["Nome"];
        $ris["filiali"] = $rs;
        echo(json_encode($ris)); // serializza $ris
    }
    else
    {
        http_response_code(500);
        $con->close();
        die("Errore nell'esecuzione della query");
    }
    // step 5
    $con->close();
?>