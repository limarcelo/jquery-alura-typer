$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases",trocaFraseAleatoria)
    .fail(function(){
       $("#erro").toggle();
       setTimeout(function () {
           $("#erro").toggle();
       }, 2000);
    })
    .always(function () {
        $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto); //random de 0 a 1 * tamanho do array de frases
    atualizaFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase() {
    var fraseID = $("#frase-id").val();
    var dados = {id: fraseID};
    console.log(fraseID);

    $.get("http://localhost:3000/frases", dados, trocaFrase);
}

function trocaFrase(){
    console.log("busquei");
}