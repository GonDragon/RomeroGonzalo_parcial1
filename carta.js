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
      data.imagen
    );
  }

  createHtmlElement() {
    const contenedor = document.createElement('div');
    contenedor.classList.add('carta');

    contenedor.innerHTML = `
      <h3>${this.code}</h3>
      <img src="${this.urlImagen}" alt="${this.nombre}" style="max-width: 100%;">
      <p>${this.suit}</p>
      <p>${this.value}</p>
    `;

    return contenedor;
  }
}