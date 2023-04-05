

const divCadastro = document.getElementsByClassName("modal_cadastro")
const divPontuação = document.getElementsByClassName("modal_pontuação")
const corpoTabelaCadastro = document.getElementById('corpoTabela')
const nomeCadastro = document.getElementById("nome_usuario")
const nomePontuacao = document.getElementById("nome_pontuacao")
const btnPontuacao = document.getElementsByClassName("btnPontuacao")
const quantJogador = document.getElementById("valor")
const textoJogador = document.getElementById("texto")
const gol = document.getElementById('gol')
const assist = document.getElementById('assist')
const desarme = document.getElementById('desarme')
const defesa = document.getElementById('defesa')
const btn = document.getElementsByClassName("btAtualizar")
const pagCadastro = document.getElementById("conteudo_principal")
const pagRanking = document.getElementById("conteudo_ranking")
const pagPontuacao = document.getElementById("conteudo_pontuacao")
const corpoTabelaRanking = document.getElementById('corpoTabelaRanking')
const corpoTabelaPontuacao = document.getElementById('corpoTabelaPontuacao')

const nomePrimeiroColocado = document.getElementById("nome_primeiro_colocado")
const pontosPrimeiroColocado = document.getElementById("pontos_primeiro_colocado")
const nomeSegundoColocado = document.getElementById("nome_segundo_colocado")
const pontosSegundoColocado = document.getElementById("pontos_segundo_colocado")
const nomeTerceiroColocado = document.getElementById("nome_terceiro_colocado")
const pontosTerceiroColocado = document.getElementById("pontos_terceiro_colocado")
const alerta = document.getElementById("alerta")


const ranking = () => {
    const jogadoresOrdenados = getLocalStorage().sort((a, b) => b.total - a.total)
    const jogadoresComPontuacao = jogadoresOrdenados.filter(jogador => jogador.total > 0)
    const totalMaiorQueZero = jogadoresOrdenados.slice(0,3).every(jogador => jogador.total > 0)
    
    if (jogadoresOrdenados.length >= 3 && totalMaiorQueZero) {
        nomePrimeiroColocado.innerText = jogadoresOrdenados[0].nome
        pontosPrimeiroColocado.innerText = jogadoresOrdenados[0].total

        nomeSegundoColocado.innerText = jogadoresOrdenados[1].nome
        pontosSegundoColocado.innerText = jogadoresOrdenados[1].total

        nomeTerceiroColocado.innerText = jogadoresOrdenados[2].nome
        pontosTerceiroColocado.innerText = jogadoresOrdenados[2].total

        limpaTabela(corpoTabelaRanking)
        jogadoresComPontuacao.forEach(criaLinhaRanking)
        trocaPagina(pagRanking, pagCadastro,pagPontuacao)
    } else {
        abreAlerta(`JOGOU AONDE?
    Pontue com no mínimo 3 jogadores`, "#e65555")
    }
}

const pontuacao = ()=>{
    const jogadores = getLocalStorage()
    const totalMaiorQueZero = jogadores.some(jogador => jogador.total > 0)

    if (jogadores && totalMaiorQueZero) {
        limpaTabela(corpoTabelaPontuacao)
        jogadores.forEach(criaLinhaPontuacao)
        trocaPagina(pagPontuacao,pagCadastro,pagRanking)
        
    }else{
            abreAlerta(`NEM JOGOU QUER MASSAGEM
    Pontue com no mínimo 1 jogador`, "#e65555")
        }

}


const abreAlerta = (mensagem, cor) => {

    alerta.innerText = mensagem
    alerta.classList.add('mostrar')
    alerta.style.backgroundColor = cor
    alerta.style.display = "flex"
    setTimeout(() => {
        alerta.classList.remove('mostrar')
    }, 3000)

}



const getLocalStorage = () => JSON.parse(localStorage.getItem('db_usuarios')) ?? []
const setLocalStorage = (usuariosdb) => localStorage.setItem('db_usuarios', JSON.stringify(usuariosdb))

const registraUsuario = (usuario) => {
    const usuariosdb = getLocalStorage()
    usuariosdb.push(usuario)
    setLocalStorage(usuariosdb)
}

const fecharCard = (div) => {
    nomeCadastro.value = ""
    gol.value = ""
    assist.value = ""
    desarme.value = ""
    defesa.value = ""
    div[0].classList.add("display_off")
}
const abreCard = (div) => {
    div[0].classList.remove("display_off")

}

const criaLinha = (usuario, i) => {

    const novaLinha = document.createElement('div')
    novaLinha.setAttribute("id", "linhaJogador")
    novaLinha.innerHTML = `
    <div id="divNomePontuacao" >${usuario.nome}</div>
    <div class="btnPontuacao" onclick="SelecionaJogador(${i})") ><ion-icon name="football"></ion-icon></div>
   
    <ion-icon class="btn_delet" onclick="excluir(${i})" name="close-circle"></ion-icon>  
    `

    corpoTabelaCadastro.appendChild(novaLinha)
}

const criaLinhaRanking = (usuario, i) => {

    const novaLinha = document.createElement('div')
    novaLinha.setAttribute("id", "linhaRanking")
    novaLinha.innerHTML = `
        <div id="colocacaoRanking">${i+1}</div>
        <div id="nomeRanking">${usuario.nome}</div>
        <div id="boxPontuacaoRanking">
            <div id="valorPontuacaoRanking">${usuario.total}</div>
            <span>pontos</span>
        </div>
    `
    corpoTabelaRanking.appendChild(novaLinha)
}

const criaLinhaPontuacao = (usuario, i) => {

    const novaLinha = document.createElement('div')
    novaLinha.setAttribute("class", "box-pontuacao")
    novaLinha.innerHTML = `
    <div class="nome-pontuacao">${usuario.nome}</div>
    <div class="box-pts">
        <span>
            <div class="valor">${usuario.gol}</div>
            <div class="titulo">GOLS</div>
        </span>

        <span>
            <div class="valor">${usuario.assist}</div>
            <div class="titulo">ASSIST</div>
        </span>

        <span>
            <div class="valor">${usuario.desarme}</div>
            <div class="titulo">DESARME</div>
        </span>

        <span>
            <div class="valor">${usuario.defesa}</div>
            <div class="titulo">DEFESA</div>
        </span>

    </div>

    <div class="box-info">
        <div class="box-total-pts">
            <div class="total-pts">${usuario.total}</div>
            <div class="titulo">Pts</div>
        </div>
        <div class="btn-editar" onclick="SelecionaJogador(${i})">EDITAR</div>
    </div>
    `
    corpoTabelaPontuacao.appendChild(novaLinha)
}



const somaPontuacao = (index) => {
    const usuarioDb = getLocalStorage()
    const valorPontos = {
        gol: 8,
        assist: 5,
        desarme: 2,
        defesa: 4
    }

    usuarioDb.forEach(
        (el, i) => {
            if (index == i) {
                el.total = el.gol * valorPontos.gol + el.assist * valorPontos.assist + el.desarme * valorPontos.desarme + el.defesa * valorPontos.defesa
            }
        }
    )
    setLocalStorage(usuarioDb)
}

const criaDiv = (i) => {
    const divButton = document.createElement("span")

    divButton.classList.add("btAtualizar")

    divButton.setAttribute("id", "pegou")
    divButton.innerHTML = `
        <button id="btn_salvar" onclick="atualizaJogador(${i})">SALVAR</button>
        <button id="btn_cancelar" onclick="fecharCard(divPontuação)">CANCELAR</button>
        `
    divPontuação[0].appendChild(divButton)
}


const btnAumentar = (metodo) => {
    metodo.stepUp()
}

const btnDiminuir = (metodo) => {
    metodo.stepDown()
}

const trocaPagina = (paginaAtual, ...pagOff) => {
    paginaAtual.style.display = "flex"
    pagOff.forEach((el) => { el.style.display = "none" })
}

const SelecionaJogador = (index) => {
    const usuarioDb = getLocalStorage()

    usuarioDb.forEach(
        (el, i) => {
            if (index == i) {
                abreCard(divPontuação)
                nomePontuacao.value = el.nome
                gol.value = el.gol
                assist.value = el.assist
                desarme.value = el.desarme
                defesa.value = el.defesa

                if (btn[0] != undefined) {
                    btn[0].remove()
                    criaDiv(i)
                } else {
                    criaDiv(i)
                }

            }
        }
    )
}



const atualizaJogador = (e) => {
    const usuarioDb = getLocalStorage()

    usuarioDb.forEach(
        (el, i) => {
            if (e == i) {
                usuarioDb[i] = dadosUsuario(nomePontuacao.value)
                setLocalStorage(usuarioDb)
                somaPontuacao(i)
                atualizaTabela()
            }
        }
    )
    abreAlerta("Jogador Atualizado", "#3fd075")
}

const excluir = (e) => {
    const usuarioDb = getLocalStorage()

    usuarioDb.forEach(
        (elem, i) => {
            if (e == i) {
                usuarioDb.splice(i, 1)
                setLocalStorage(usuarioDb)
                corpoTabelaCadastro.childNodes[i].remove()
            }
        }
    )
    abreAlerta("Jogador Excluido", "#e65555")
    atualizaTabela()
}


const dadosUsuario = (nomeUsuario) => {
    const usuario = {}
    usuario.nome = nomeUsuario
    usuario.gol = Number(gol.value)
    usuario.assist = Number(assist.value)
    usuario.desarme = Number(desarme.value)
    usuario.defesa = Number(defesa.value)
    usuario.total = "0"
    return usuario
}

function salvar() {
    const usuario = dadosUsuario(nomeCadastro.value)

    if (usuario.nome != '') {
        registraUsuario(usuario)
        atualizaTabela()
        nomeCadastro.value = ""
        abreAlerta("Jogador Salvo", "#3fd075")
    }

}

const limpaTabela = (corpoTabela) => {
    while (corpoTabela.firstChild) {
        corpoTabela.removeChild(corpoTabela.lastChild)
    }
}

const atualizaTabela = () => {
    const usuarioDb = getLocalStorage()
    limpaTabela(corpoTabelaCadastro)
    limpaTabela(corpoTabelaPontuacao)
    textoDinamico()
    usuarioDb.forEach(criaLinha)
    usuarioDb.forEach(criaLinhaPontuacao)
    usuarioDb.forEach(trocaCorBtnPontuacao)

}

const trocaCorBtnPontuacao = (usuario, index) => {
    if (usuario.total > 0) { btnPontuacao[index].style.color = "#3fd075" }
}

const textoDinamico = () => {
    const usuarioDb = getLocalStorage()
    if (usuarioDb.length == 0) {
        textoJogador.innerText = "CADASTRE UM JOGADOR"
    } else {
        textoJogador.innerText = `Jogadores cadastrados  (${usuarioDb.length})`
    }
}

atualizaTabela()

