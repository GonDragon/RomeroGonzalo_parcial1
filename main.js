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

const valores = ['ACE','2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING'];
const palos = ['HEARTS','DIAMONDS','SPADES','CLUBS'];

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

function cargarGuardadas() {
    limpiarCartas();
    const contenedorCartas = document.getElementById("cartas");

    const cartasGuardadasString = localStorage.getItem('cartas');
    let cartasGuardadas = cartasGuardadasString ? JSON.parse(cartasGuardadasString) : [];
    
    for (let index = 0; index < cartasGuardadas.length; index++) {
        agregarCarta(cartasGuardadas[index]);        
    }

    actualizarCartasHTML();
}

function ordenarPorNumero() {
    let paginaActual= paginador.paginas[paginador.index];


    paginaActual.sort((a,b) => {
        return valores.indexOf(a.value) - valores.indexOf(b.value)
    });

    actualizarCartasHTML();
}

function ordenarPorPalo() {
    let paginaActual= paginador.paginas[paginador.index];


    paginaActual.sort((a,b) => {
        return palos.indexOf(a.suit) - palos.indexOf(b.suit)
    });

    actualizarCartasHTML();
}