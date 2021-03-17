"use strict";

$(document).ready(function () {
  let _login = $("#login");
  let _test = $("#test");

  let _txtUsr = $("#usr");
  let _txtPwd = $("#pwd");
  let _btnLogin = $("#btnLogin");
  let _lblErrore = $("#lblErrore");

  let idStudente;

  let _domande = $(".domande");

  /* ******************************* */

  _login.show();
  _test.hide();
  _lblErrore.hide();

  _btnLogin.on("click", function () {
    let user = _txtUsr.val();
    let pwd = _txtPwd.val();
    let json = {
      user: user,
      pwd: pwd,
    };
    // let request = inviaRichiesta("get", `/studenti?user=${pwd}&pwd=${pwd}`);
    let request = inviaRichiesta("get", "/studenti", json);
    request.fail(errore);
    request.done(function (data) {
      // data, dato che non abbiamo filtrato per id, è un
      // vettore enumerativo anche se è lungo 1
      console.log(data);
      if (data.length > 0) {
        _login.hide();
        _test.show();
        idStudente = data[0].id;
        inviaRichiestaDomande();
      } else {
        _lblErrore.fadeIn(600);
      }
    });
  });

  _lblErrore.children("button").on("click", function () {
    _lblErrore.fadeOut(600);
  });

  function inviaRichiestaDomande() {
    let request = inviaRichiesta("get", "/domande");
    request.fail(errore);
    request.done(function (domande) {
      for (const domanda of domande) {
        // con var avrebbe preso solamente l'ultimo div
        // avrebbe caricato tutte le risposte all'ultima domanda
        // è come se let si memorizzasse il div corrente e
        // che venga poi aggiunto tutto a quel div preciso
        let div = $("<div>");
        _test.children().eq(2).append(div);

        let p = $("<p>");
        p.addClass("domanda");
        p.text(domanda.domanda);
        p.prop("id", domanda.id);
        div.append(p);

        let richiestaRisposte = inviaRichiesta(
          "get",
          `/risposte?codDomanda=${domanda.id}`
        );
        richiestaRisposte.fail(errore);
        richiestaRisposte.done(function (risposte) {
          for (const risposta of risposte) {
            let radio = $("<input type='radio'>");
            div.append(radio);
            radio.prop("name", domanda.id);
            radio.prop("risposta", risposta);

            let span = $("<span>");
            span.appendTo(div);
            span.text(" " + risposta.risposta);

            let br = $("<br>");
            br.appendTo(div);
          }
          let radio = $("<input type='radio'>");
          div.append(radio);
          radio.prop("name", domanda.id);
          radio.prop("risposta", {"correct": false});
          radio.prop("checked", true);

          let span = $("<span>");
          span.appendTo(div);
          span.text(" Non rispondo");

          let br = $("<br>");
          br.appendTo(div);
        });
      }
      let btn = $("<button>");
      btn.appendTo(_test.children().eq(2));
      btn.text("Invia");
      btn.on("click", function () {
        // una collezione jQuery è costituita da puntatori JS
        // quindi nella if farò il puntatore JS castato con $ 
        // per jQuery ***************************************
        let radios = $("input[type=radio]:checked");
        let voto = 0;

        /*for (let i = 0; i < radios.length; i++) {
          if (radios.eq(i).prop("risposta").correct) {
            voto++;
          } else {
            radios.eq(i).next().css({"color": "red"});
          }
        }*/

        /*for (const radio of radios) {
          if($(radio).prop("risposta").correct) {
            voto ++;
          } else {
            $(radio).next().css({"color": "red"});
          }
        }*/

        radios.each(function(i, ref){
          if($(this).prop("risposta").correct) {
            voto++;
          } else {
            $(ref).next().css({"color": "red"});
          }
        })


        let req = inviaRichiesta("patch", "/studenti/" + idStudente, {"voto": voto});
        req.fail(errore);
        req.done(function(data) {
          console.log(data);
          alert("Complimenti hai preso un bel " + voto);
          
          
        });
      });
    });
  }
});
