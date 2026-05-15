class Carta {
  constructor(code, value, suit, imagen) {
    this.code = code;
    this.value = value;
    this.suit = suit;
    this.imagen = imagen;
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

  createHtmlElement() {
    const contenedor = document.createElement('div');
    contenedor.classList.add('carta');

    contenedor.innerHTML = `
      <h3>${this.code}</h3>
      <img src="${this.imagen}" alt="${this.nombre}" style="max-width: 100%;">
      <p><span>${this.value}</span> of <span>${this.suit}</span></p>
    `;

    return contenedor;
  }
}