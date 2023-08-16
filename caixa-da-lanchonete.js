const { Cardapio } = require("./Cardapio");

class CaixaLanchonete {
  constructor() {
    this.cardapio = new Cardapio();
  }

  calcularValorCompra(formaPagamento, itens) {
    const cardapio = this.cardapio;
    let total = 0;

    if (itens.length === 0) {
      return "Não há itens no carrinho de compras!";
    }

    if (!["debito", "credito", "dinheiro"].includes(formaPagamento)) {
      return "Forma de pagamento inválida!";
    }

    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");
      const preco = cardapio.getPrecoItem(codigo);

      if (!preco) {
        return "Item inválido!";
      }

      const quantidadeNum = Number(quantidade);
      if (quantidadeNum <= 0) {
        return "Quantidade inválida!";
      }

      if (cardapio.ehExtra(codigo)) {
        const principal = cardapio.getPrincipalParaExtra(codigo);
        if (!itens.some((item) => item.startsWith(principal))) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      total += preco * quantidadeNum;
    }

    if (formaPagamento === "dinheiro") {
      total *= 0.95;
    } else if (formaPagamento === "credito") {
      total *= 1.03;
    }

    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

const caixa = new CaixaLanchonete();
console.log(caixa.calcularValorCompra("dinheiro", ["chantily,1"]));
console.log(caixa.calcularValorCompra("debito", ["cafe,1", "chantily,1"]));
console.log(caixa.calcularValorCompra("credito", ["combo1,1", "cafe,2"]));
console.log(caixa.calcularValorCompra("dinheiro", ["suco,3"]));
console.log(caixa.calcularValorCompra("debito", ["salgado,3", "cafe,1", "chantily,1"]));
console.log(caixa.calcularValorCompra("credito", ["combo1,1", "cafe,2", "salgado,3"]));
