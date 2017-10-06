var frase = $(".frase").text();

var numeroPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase").text(numeroPalavras);

var campo = $(".campo-digitacao");
campo.on("input", function () {
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length -1;
    console.log(qtdPalavras);
    $("#contador-palavras").text(qtdPalavras);
    $("#contator-caracteres").text(conteudo.length);
});

var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", function () {
    var cronometro = setInterval(function () {
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);

        if(tempoRestante == 0){
            campo.attr("disabled", true);
            clearInterval(cronometro);
        }

    },1000)
});