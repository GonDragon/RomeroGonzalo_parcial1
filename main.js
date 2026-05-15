function traerCartas(cantidad){
    return fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${cantidad}`);
}

function limpiarCartas(){
    const contenedorCartas = document.getElementById("cartas");
    contenedorCartas.innerHTML = "";
}

function agregarCarta(ObjetoCartaRaw){
    const contenedorCartas = document.getElementById("cartas");

    console.log(ObjetoCartaRaw);
    const carta = Carta.createFromJsonString(JSON.stringify(ObjetoCartaRaw));
    const cartaHtml = carta.createHtmlElement();
    contenedorCartas.appendChild(cartaHtml);
}


/* Codigo Suelto Desde Aca */
console.log("Inicio del codigo suelto");

let cartas = traerCartas(6);

cartas.then(respuesta => {
    return respuesta.json();
}).then( cartas => {
    console.log(cartas);
    limpiarCartas();

    for (let index = 0; index < cartas.cards.length; index++) {
        agregarCarta(cartas.cards[index]);
        
    }
});

console.log("Fin del codigo suelto");