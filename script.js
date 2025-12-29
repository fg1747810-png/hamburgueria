let carrinho = {};
let total = 0;

const taxaEntrega = 5.00; // <<< MUDE O VALOR AQUI

// MOSTRAR CADASTRO
function mostrarCadastro() {
    document.getElementById("subtitle").innerText = "Criar conta";
    document.getElementById("btnLogin").classList.add("hidden");
    document.getElementById("btnGoRegister").classList.add("hidden");
    document.getElementById("btnRegister").classList.remove("hidden");
}

// CRIAR CONTA
function criarConta() {
    const user = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();

    if (!user || !pass) {
        alert("Preencha todos os campos");
        return;
    }

    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    alert("Conta criada!");
    location.reload();
}

// LOGIN
function login() {
    const user = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();

    if (
        user === localStorage.getItem("user") &&
        pass === localStorage.getItem("pass")
    ) {
        localStorage.setItem("logado", "true");
        window.location.href = "index.html";
    } else {
        alert("Usuário ou senha incorretos");
    }
}

// SAIR (AGORA FUNCIONA)
function sair() {
    localStorage.removeItem("logado");
    window.location.href = "login.html";
}

function adicionar(nome, preco) {
    if (!carrinho[nome]) {
        carrinho[nome] = 0;
    }

    carrinho[nome]++;
    total += preco;

    document.getElementById("qtd-" + nome).innerText = carrinho[nome];
    document.getElementById("total").innerText = total.toFixed(2);
}

function remover(nome, preco) {
    if (!carrinho[nome] || carrinho[nome] === 0) return;

    carrinho[nome]--;
    total -= preco;

    document.getElementById("qtd-" + nome).innerText = carrinho[nome];
    document.getElementById("total").innerText = total.toFixed(2);
}

function pedir() {
    // verifica se tem itens no carrinho
    const totalItens = Object.values(carrinho).reduce((a, b) => a + b, 0);
    if (totalItens === 0) {
        alert("Adicione pelo menos um item ao carrinho!");
        return;
    }

    // pega valores dos campos
    const endereco = document.getElementById("endereco").value.trim();
    const pagamento = document.getElementById("pagamento").value;
    const obs = document.getElementById("extra").value.trim();

    // valida campos obrigatórios
    if (!endereco) {
        alert("Digite seu endereço!");
        return;
    }

    if (!pagamento) {
        alert("Escolha a forma de pagamento!");
        return;
    }

    // nomes bonitos
    const nomes = {
        classico: "Burger Clássico",
        bacon: "Burger Bacon",
        duplo: "Burger Duplo",
        refri: "Refrigerante"
    };

    // monta a mensagem
    let msg = "🛒 NOVO PEDIDO\n\n";

    for (let item in carrinho) {
        if (carrinho[item] > 0) {
            msg += `• ${nomes[item]} — ${carrinho[item]}x\n`;
        }
    }

    msg += `\n🚚 Taxa de entrega: R$ ${taxaEntrega.toFixed(2)}\n`;
    msg += `💰 Total: R$ ${(total + taxaEntrega).toFixed(2)}\n`;
    msg += `💳 Pagamento: ${pagamento}\n`;
    msg += `📍 Endereço:\n${endereco}\n`;

    if (obs) {
        msg += `📝 Observações:\n${obs}\n`;
    }

    // número do WhatsApp
    const numero = "5587999606256"; // TROQUE PELO SEU NÚMERO

    // abre WhatsApp
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
}
