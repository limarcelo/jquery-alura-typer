$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Marcelo";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha)

    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();

}

function scrollPlacar() {

    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate({scrollTop: posicaoPlacar}, 1000);

}

function novaLinha(usuario, numPalavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;

}

function removeLinha() {
    event.preventDefault();

   var linha = $(this).parent().parent();
   linha.fadeOut(1000);
   setTimeout(function(){
       linha.remove()
   },1000);
}

function mostraPlacar() {
    $(".placar").stop().slideToggle(600);
}

function sincronizaPlacar() {
    console.log("clicou no sync")
    var placar = [];
    var linhas = $("tbody>tr"); // seleciona todas as tr filhas de tbody

    linhas.each(function () {
        var usuario = $(this).find("td:nth-child(1)").text(); // envolve com $ para funcoes jQuery
        var nPalavras = $(this).find("td:nth-child(2)").text();
        console.log(usuario);
        console.log(nPalavras);

        var score = {
            usuario: usuario,
            pontos: nPalavras
        };

        placar.push(score);
    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados, function () {

    });
}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar",function (data) {
       $(data).each(function () {
          var linha = novaLinha(this.usuario, this.pontos);
           linha.find(".botao-remover").click(removeLinha);
          $("tbody").append(linha);
       });
    });
}


