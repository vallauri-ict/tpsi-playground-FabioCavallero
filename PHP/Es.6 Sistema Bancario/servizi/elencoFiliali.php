<?php
    header("content-type:application/json; charset=utf-8");
    require("php-mysqli.php");//Serve la libreria perchè bisogna collegarsi nuovamente al database
    // step 1
    if(isset($_REQUEST["cBanca"]))//Controllo se è stato passato il parametro
        $cBanca = $_REQUEST["cBanca"];
    else
    {
        http_response_code(400);
        die("Parametro mancante: codice banca");
    }
    //step 2
    $con = _connection();
    //step 3
    $sql = "SELECT cFiliale,Nome FROM filiali WHERE cBanca=$cBanca";
    $rs = _execute($con,$sql);
    // step 4
    if($rs)
    {
        echo(json_encode($rs)); //Serializza $rs, cioè ritorna un json impacchettando l'array associativo; l'echo ritorna le informazioni all'index.js
    }
    else
    {
        http_response_code(500);
        die("Errore nell'esecuzione della query");
    }
    // step 5
    $con->close();
?>