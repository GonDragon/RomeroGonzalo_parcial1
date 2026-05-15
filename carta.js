class Carta {
  constructor(code, value, suit, image) {
    this.code = code;
    this.value = value;
    this.suit = suit;
    this.image = image;
  }

  toJsonString() {
    return JSON.stringify(this);
  }

  static createFromJsonString(json) {
    const data = JSON.parse(json);
    return new Carta(
      data.code,
      data.value,
      data.suit,
      data.image
    );
  }

  static guardarCarta(carta) {
    const cartasGuardadasString = localStorage.getItem('cartas');
    let cartasGuardadas = cartasGuardadasString ? JSON.parse(cartasGuardadasString) : [];
    
    if(cartasGuardadas.some(cartaGuardada => cartaGuardada.code === carta.code)) return;

    cartasGuardadas.push(carta);
    localStorage.setItem('cartas',JSON.stringify(cartasGuardadas))
  }

  createHtmlElement() {
    const contenedor = document.createElement('div');
    contenedor.classList.add('carta');

    contenedor.innerHTML = `
      <h3>${this.code}</h3>
      <a href="${this.image}" target="_blank">
      <img src="${this.image}" alt="${this.nombre}" style="max-width: 100%;">
      </a>
      <p><span>${this.value}</span> of <span>${this.suit}</span></p>
      <a href="#" class="btn btn-primary btn-guardar">Guardar</a>
    `;

    const botonGuardar = contenedor.querySelector('.btn-guardar');

    botonGuardar.addEventListener('click', (event) => {
        Carta.guardarCarta(this);
    })

    return contenedor;
  }
}