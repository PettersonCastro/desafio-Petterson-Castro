/*Decidi criar mais de um modulo apenas por uma questão de organização
 */

class Cardapio {
  constructor() {
    this.itens = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };

    this.extras = {
      chantily: "cafe",
      queijo: "sanduiche",
    };
  }

  getPrecoItem(codigo) {
    return this.itens[codigo] || 0;
  }

  ehExtra(codigo) {
    return !!this.extras[codigo];
  }

  getPrincipalParaExtra(codigo) {
    return this.extras[codigo] || null;
  }
}

module.exports = {
  Cardapio,
};
