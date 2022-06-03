const entrada = (nome, sexo, idade, renda) => {
    console.log("SIMULADOR DE INVESTIMENTO\n\n");
    console.log(`Nome: ${nome}`);
    console.log(`Sexo: ${sexo}`);
    console.log(`Idade: ${idade}`);
    console.log(`Renda Mensal: R$${renda.toFixed(2)}`);
}

const perfilInvestidor = () => {
    do {
        pergunta1 = Number(prompt(`Você tem formação na área financeira?
        1. Sim, sem experiência
        2. Sim, com experiência
        3. Não, mas tenho experiência
        4. Não, com pouca experiência
        5. Não, e não tenho experiência`));

    } while (!Number.isInteger(pergunta1) || pergunta1 == "" || pergunta1 < 1 || pergunta1 > 5);

    switch (pergunta1) {
        case 1:
            calcuPorcetagem1 = [0, 10, 90, 0]
            break;
        case 2:
            calcuPorcetagem1 = [0, 0, 35, 65]
            break;
        case 3:
            calcuPorcetagem1 = [0, 0, 77, 23]
            break;
        case 4:
            calcuPorcetagem1 = [0, 64, 36, 0]
            break;
        case 5:
            calcuPorcetagem1 = [75, 25, 0, 0]
            break;    
        default:
            break;
    }
    do {
        pergunta2 = Number(prompt(`Qual produto você conhece?
        1. Poupança, depósito a prazo
        2. Tesouro Direto, renda variável
        3. Produtos 1 e 2
        4. Nunca investiu, mas conheço alguns produtos
        5. Nunca investi e não conheço nenhum`));

    } while (!Number.isInteger(pergunta2) || pergunta2 == "" || pergunta2 < 1 || pergunta2 > 5);  
    
    switch (pergunta2) {
        case 1:
            calcuPorcetagem2 = [60, 40, 0, 0]
            break;
        case 2:
            calcuPorcetagem2 = [0, 0, 40, 60]
            break;
        case 3:
            calcuPorcetagem2 = [0, 0, 22, 78]
            break;
        case 4:
            calcuPorcetagem2 = [0, 73, 27, 0]
            break;
        case 5:
            calcuPorcetagem2 = [60, 40, 0, 0]
            break;
        default:
            break;
    }

    for (let i = 0; i < calcuPorcetagem1.length; i++) {
        calcuPorcetagem1[i] += calcuPorcetagem2[i]
    }

    const maior = Math.max(...calcuPorcetagem1);
    const index = calcuPorcetagem1.indexOf(maior);
    
    switch (index) {
        case 0:
            perfil = "Ultraconservador";
            break;
        case 1:
            perfil = "Conservador";
            break;
        case 2:
            perfil = "Dinâmico";
            break;
        case 3:
            perfil = "Arrojado";
            break;
        default:
            break;
    }

    console.log(`Perfil do Investidor: ${perfil}`);
}

const simulacao = () => {
    if (perfil == "Ultraconservador" || perfil == "Conservador" ) {
        console.log("Sugestão de investivento: Poupança renda fixa");

        do {
            capital = Number(prompt("Quanto de capital deseja investir: ").replace(/,/g, ".")); 
        } while (isNaN(capital) || capital == "");

        do {
            taxaJuros = Number(prompt("Quanto está a taxa de juros Selic por mês(em %): ").replace(/,/g, ".")); 
        } while (isNaN(taxaJuros) || taxaJuros == "");

        do {
            tempo = Number(prompt("Por quanto tempo deseja investir (em meses): "));  
        } while (!Number.isInteger(tempo)|| tempo == "");

        do {
            inflacao = Number(prompt("Quanto está a inflação(em %): ").replace(/,/g, ".")); 
        } while (isNaN(inflacao) || inflacao == "");
        
        taxaJuros = taxaJuros/100
        inflacao = inflacao/100
        console.log(`     - Simulação de investimento -     `);
        calculoInvestimentoSimples(capital, taxaJuros, tempo);
        calculoInvestimentoComposto (capital, taxaJuros, tempo);
    }
    else{
        console.log("Sugestão de investivento: Renda variável, compra de Ações")
        do {
            valorCompra = Number(prompt("Valor da Ação no momento da COMPRA: ").replace(/,/g, ".")); 
        } while (isNaN(valorCompra) || valorCompra == "");

        do {
            valorVenda = Number(prompt("Valor da Ação no momento da VENDA: ").replace(/,/g, ".")); 
        } while (isNaN(valorVenda) || valorVenda == "");
        do {
            acoes = Number(prompt("Quantidade de ações: "));
        } while (!Number.isInteger(acoes)|| acoes == "");

        lucro = (valorVenda - valorCompra) * acoes
        rendimento = (valorVenda / valorCompra) * 100 - 100
        console.log(`Rendimento de ${rendimento.toFixed(2)} %`);
        console.log(`Lucro Possível: R$${lucro.toFixed(2)}`);

    }
}

const calculoInvestimentoSimples = (capital, taxaJuros, tempo) => {
    juros = capital * taxaJuros * tempo
    jurosReal = juros/capital
    jurosReal = (1 + jurosReal) / (1 + inflacao) - 1
    jurosReal = jurosReal*capital
    console.log(`Com juros simples:\nLucro bruto: R$${juros}\nRentabilidade real: R$${jurosReal.toFixed(2)} `);
}

const calculoInvestimentoComposto = (capital, taxaJuros, tempo) => {
    juros = capital * Math.pow((1+taxaJuros), tempo)
    juros = juros-capital
    jurosReal = juros/capital
    jurosReal = (1 + jurosReal) / (1 + inflacao) - 1
    jurosReal = jurosReal*capital
    console.log(`Com juros composto:\nLucro bruto: R$${juros.toFixed(2)}\nRentabilidade Real: R$${jurosReal.toFixed(2)} `);
}


var nome, sexo, idade, renda, perfil, pergunta1, pergunta2, calcuPorcetagem1, calcuPorcetagem2;
do {
    nome = prompt("Digite seu nome: ");
} while (!isNaN(nome));

do {
    sexo = prompt("Digite seu sexo: ");
} while (!isNaN(sexo));

do {
    idade = Number(prompt("Digite sua idade: "));
} while (!Number.isInteger(idade) || idade == "");

do {
    renda = Number(prompt("Digite sua renda mensal: ").replace(/,/g, "."));
} while (isNaN(renda) || renda == "");

entrada(nome, sexo, idade, renda);
perfilInvestidor();
simulacao();
