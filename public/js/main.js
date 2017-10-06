var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function() {
    atualizaFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaFrase() {
    var frase = $(".frase").text();
    var numeroPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase").text(numeroPalavras);
}

function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length -1;
        console.log(qtdPalavras);
        $("#contador-palavras").text(qtdPalavras);
        $("#contator-caracteres").text(conteudo.length);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function () {
        var cronometro = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);

            if(tempoRestante == 0){
                clearInterval(cronometro);
                finalizaJogo();
            }
        },1000)
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.addClass("campo-desabilitado");
    inserePlacar();
}

function inicializaMarcadores(){
    var frase = $(".frase").text();
    campo.on("input", function () {
        var digitado = campo.val();

        var comparavel = frase.substr(0,digitado.length);
        console.log(digitado);
        console.log(comparavel);

        if(digitado == comparavel){
            campo.addClass("borda-green");
            campo.removeClass("borda-red");
        }else{
            campo.addClass("borda-red");
            campo.removeClass("borda-green");
        }
    });
}


function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    campo.removeClass("campo-desabilitado");
    campo.removeClass("borda-red");
    campo.removeClass("borda-green");
    $("#contador-palavras").text("0");
    $("#contator-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
}



