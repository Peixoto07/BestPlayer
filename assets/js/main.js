

const divCadastro = document.getElementsByClassName("modal_cadastro")
const divPontuação = document.getElementsByClassName("modal_pontuação")
const corpoTabela = document.getElementById('corpoTabela')
const nomeCadastro = document.getElementById("nome_usuario")
const nomePontuacao = document.getElementById("nome_pontuacao")
const quantJogador = document.getElementById("valor")
const textoJogador = document.getElementById("texto")
const gol = document.getElementById('gol')
const assist = document.getElementById('assist')
const desarme = document.getElementById('desarme')
const defesa = document.getElementById('defesa')
const btn = document.getElementsByClassName("btAtualizar")



const arrayUsuarios = []

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

    const novaLinha = document.createElement('tr')
    novaLinha.innerHTML = `
    <td onclick="SelecionaJogador(${i})")>${usuario.nome}</td>
    <td class="btn_delet" onclick = "excluir(${i})" ><input type="image" src="assets/imagens/btn_excluir.svg"></td>
    `
    corpoTabela.appendChild(novaLinha)
}

const criaDiv = (i)=>{
    const divButton = document.createElement("span")
        
        divButton.classList.add("btAtualizar")

        divButton.setAttribute("id","pegou")
        divButton.innerHTML = `
        <button id="btn_salvar" onclick="teste(${i})">SALVAR</button>
        <button id="btn_cancelar" onclick="fecharCard(divPontuação)">CANCELAR</button>
        ` 
        divPontuação[0].appendChild(divButton)
}





const SelecionaJogador = (index)=>{
    const usuarioDb = getLocalStorage()

    usuarioDb.forEach(
        (el, i)=>{
            if(index == i){
                abreCard(divPontuação)
                nomePontuacao.value = el.nome
                gol.value = el.gol
                assist.value = el.assist
                desarme.value = el.desarme
                defesa.value = el.defesa
                
                if (btn[0]!=undefined) {
                    btn[0].remove()
                    criaDiv(i)
                }else{
                    criaDiv(i)
                }

            }
        }
    )
}



const teste = (e)=>{
    const usuarioDb = getLocalStorage()
    
    usuarioDb.forEach(
        (el, i)=>{
            if(e == i){
                usuarioDb[i] = dadosUsuario(nomePontuacao)
                setLocalStorage(usuarioDb)
                atualizaTabela()
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


const dadosUsuario = (nomeDaClass)=>{
    const usuario = {}
    usuario.nome = nomeDaClass.value
    usuario.gol = gol.value
    usuario.assist = assist.value
    usuario.desarme = desarme.value 
    usuario.defesa = defesa.value
    
    return usuario
}

function salvar() {
   const usuario = dadosUsuario(nomeCadastro)

    if (usuario.nome != '') {
        registraUsuario(usuario)
        atualizaTabela()
        nomeCadastro.value = ""
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

