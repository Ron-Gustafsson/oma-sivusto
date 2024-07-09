/*
Kirpputaulun jQuery
Ron Gustafsson 2024

Nappia painamalla kirppu hyppää seuraavaan soluun
Kirpun kuva on taustakuvana luokassa .kirppu
*/

$(document).ready(function() {
  let $solut = $('.flea');
  let kirppu = 0;

  $("button").click(function() {
    $solut.eq(kirppu).removeClass('kirppu');

    if (kirppu >= $solut.length - 1) {
      kirppu = 0;
    } else {
      kirppu = kirppu + 1;
    }

    $solut.eq(kirppu).addClass('kirppu');
  });
});