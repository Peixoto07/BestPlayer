

const divCadastro = document.getElementsByClassName("modal_cadastro")
const divPontuação = document.getElementsByClassName("modal_pontuação")
const corpoTabela = document.getElementById('corpoTabela')
const nomeUsuario = document.getElementById("nome_usuario")
const quantJogador = document.getElementById("valor")
const textoJogador = document.getElementById("texto")
const gol = document.getElementById('gol')

const arrayUsuarios = []

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_usuarios')) ?? []
const setLocalStorage = (usuariosdb) => localStorage.setItem('db_usuarios', JSON.stringify(usuariosdb))

const registraUsuario = (usuario) => {
    const usuariosdb = getLocalStorage()
    usuariosdb.push(usuario)
    setLocalStorage(usuariosdb)
}

const fecharCard = (div) => {
    nomeUsuario.value = ""
    div[0].classList.add("display_off")
}
const abreCard = (div) => {
    div[0].classList.remove("display_off")
}

const criaLinha = (usuario, i) => {

    const novaLinha = document.createElement('tr')
    novaLinha.innerHTML = `
    <td onclick="SelecionaJogador(${i})" >${usuario.nome}</td>
    <td class="btn_delet" onclick = "excluir(${i})" ><input type="image" src="/assets/imagens/btn_excluir.svg"></td>
    `
    corpoTabela.appendChild(novaLinha)
}

const SelecionaJogador = (index)=>{
    const usuarioDb = getLocalStorage()

    usuarioDb.forEach(
        (el, i)=>{
            if(index == i){
                abreCard(divPontuação)
                gol.value = el.gol
                
            
            }
        }
    )
}

const excluir = (e) => {
    const usuarioDb = getLocalStorage()

    usuarioDb.forEach(
        (elem, i) => {
            if (e == i) {
                usuarioDb.splice(i, 1)
                setLocalStorage(usuarioDb)
                corpoTabela.deleteRow(i)
            }
        }
    )
    atualizaTabela()
}


const dadosUsuario = ()=>{
    const usuario = {}
    usuario.nome = nomeUsuario.value
    usuario.gol = gol.value
    
    return usuario
}

function salvar() {
   const usuario = dadosUsuario()

    if (usuario.nome != '') {
        registraUsuario(usuario)
        atualizaTabela()
        nomeUsuario.value = ""
    }

}

const limpaTabela = () => {
    while (corpoTabela.firstChild) {
        corpoTabela.removeChild(corpoTabela.lastChild)
    }
}

const atualizaTabela = () => {
    const usuarioDb = getLocalStorage()
    limpaTabela()
    usuarioDb.forEach(criaLinha)
    textoDinamico()
}

const textoDinamico = ()=>{
    const usuarioDb = getLocalStorage()
    if (usuarioDb.length==0) {
        textoJogador.innerText = "CADASTRE UM JOGADOR"
    } else {
        textoJogador.innerText = `Jogadores cadastrados  (${usuarioDb.length})`
    }
}

atualizaTabela()

