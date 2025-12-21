let total = 0;
let itens = {
    classico: 0,
    basico: 0,
    coca: 0
};

function adicionar(item, valor) {
    itens[item]++;
    total += valor;
    atualizar(item);
}

function remover(item, valor) {
    if (itens[item] > 0) {
        itens[item]--;
        total -= valor;
        atualizar(item);
    }
}

function atualizar(item) {
    document.getElementById("qtd-" + item).innerText = itens[item];
    document.getElementById("total").innerText = total.toFixed(2);
}

function pedirWhats() {
    if (total <= 0) {
        alert("Adicione itens ao carrinho primeiro!");
        return;
    }

    let endereco = prompt("Digite seu endereço completo:");
    if (!endereco) return;

    let mensagem = "🍔 *Pedido Burger Bom*%0A%0A";

    if (itens.classico > 0) mensagem += `• Burger Clássico: ${itens.classico}x%0A`;
    if (itens.basico > 0) mensagem += `• Burger Básico: ${itens.basico}x%0A`;
    if (itens.coca > 0) mensagem += `• Coca-Cola 1L: ${itens.coca}x%0A`;

    mensagem += `%0A📍 *Endereço:* ${endereco}`;
    mensagem += `%0A💰 *Total: R$ ${total.toFixed(2)}*`;

    let telefone = "5587999606256"; // seu número
    let link = `https://api.whatsapp.com/send?phone=${telefone}&text=${mensagem}`;

    window.open(link, "_blank");
}
