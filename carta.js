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
  <div class="card h-100 shadow-sm pt-2 px-3">
    <img src="${this.image}" class="card-img-top" alt="${this.nombre}">
    <div class="card-body d-flex flex-column justify-content-between">
      <div>
        <h5 class="card-title text-muted small">${this.code}</h5>
        <p class="card-text fs-5">
          <strong>${this.value}</strong> de <span>${this.suit}</span>
        </p>
      </div>
      <a href="#" class="btn btn-primary btn-guardar w-100">Guardar</a>
    </div>
  </div>
`;

    const botonGuardar = contenedor.querySelector('.btn-guardar');

    botonGuardar.addEventListener('click', (event) => {
        Carta.guardarCarta(this);
    })

    return contenedor;
  }
}