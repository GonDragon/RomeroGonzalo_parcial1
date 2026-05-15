const paginador = {
    index: 0,
    paginas: [[]],

    agregarAPagina: function(carta) {
        if(this.paginas.length <= this.index){
            this.paginas.push([]);
        }

        this.paginas[this.index].push(carta);
    }
}

function limpiarCartas(){
    const contenedorCartas = document.getElementById("cartas");
    contenedorCartas.innerHTML = "";
}

function agregarCarta(ObjetoCartaRaw){
    const carta = Carta.createFromJsonString(JSON.stringify(ObjetoCartaRaw));
    paginador.agregarAPagina(carta);
}

function traerCartas(cantidad){
    let cartas = fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${cantidad}`);

    return cartas.then(respuesta => {
        return respuesta.json();
    }).then( cartas => {

        for (let index = 0; index < cartas.cards.length; index++) {
            agregarCarta(cartas.cards[index]);
        }
    });
}

function actualizarCartasHTML(){
    limpiarCartas();
    // console.log(paginador);
    const contenedorCartas = document.getElementById("cartas");
    let paginaActual = paginador.paginas[paginador.index];
    for (let index = 0; index < paginaActual.length -1; index++) {
        const carta = paginaActual[index];      
        const cartaHtml = carta.createHtmlElement();
        contenedorCartas.appendChild(cartaHtml);
    }
}

function paginaSiguiente(){
    paginador.index++;

    if(paginador.index >= paginador.paginas.length) {
        traerCartas(6).then( () => {actualizarCartasHTML();});
    } else {
        actualizarCartasHTML();
    }
    console.log(`indice ${paginador.index}`);
}

function paginaAnterior(){
    if(paginador.index <= 0) return;
    paginador.index--;
    actualizarCartasHTML();
    console.log(`indice ${paginador.index}`);
}

function guardarCarta(indice){
    console.log(indice);
}


/* Codigo Suelto Desde Aca */
console.log("Inicio del codigo suelto");

traerCartas(6).then( () => {actualizarCartasHTML();});

console.log("Fin del codigo suelto");