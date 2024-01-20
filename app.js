let listaDeNumerosSorteados = [];
let numeroLimite=10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;



// funçao para exibir texto na tela usando a tag para diminuir linhas do codigo
function exibirTestoTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //usado para dizer os textos escritos na tela
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {
        rate:1.2
    });
}

function exibirMensagemInicial(){
    exibirTestoTela('h1','Jogo do número secreto');
    exibirTestoTela('p', 'Escolha um número entre 1 e '+numeroLimite);
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(numeroSecreto);
    
    if (chute == numeroSecreto){
        exibirTestoTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTestoTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else {
        if (chute > numeroSecreto){
            exibirTestoTela('p','O número secreto é menor');
        } else {
            exibirTestoTela('P','o número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    //se o numero escolhido ja estiver dentro da lista(ja foi sorteado) gere um novo numero
    let numeroEscolhido = parseInt(Math.random() *numeroLimite + 1); 
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados. length;

    if (quantidadeDeElementosNaLista ==numeroLimite ) {
        listaDeNumerosSorteados = [];
    }
    


    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        //push adiciona algo no final da lista
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }

}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
//quando o  numero secreto for o certo, chama todas as funcoes dnv e reinicia o jogo
function reiniciarJogo(){
    numeroSecreto= gerarNumeroAleatorio();
    limparCampo();
    tentativas=1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);

}