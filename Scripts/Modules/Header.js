import { connectKey, getUser, updateUser, AUX, stringToHtml, $, _domList } from "./aux-tools.js";
import svg from "./svg-icons.js";
import ModalEditAvatars from './ModalEditAvatar.js'


// ----------------------------------------------------
const PATH = {
    logo: "../Assets/Svg/dev-brain-icon-bottom.svg"
}

const LINK = {
    login: '../index.html',
    home: 'main.html',
    challenges: '#',
    templates: '#',
    learning: '#',
    auxLib: '#',
    accountManage: '#',
    notifications: '#'
}


// HEADER
export default function Header(capsule) {
    capsule = _domList(capsule)[0]

    Object.prototype.$ = function (selector) {
        selector = [...this.querySelectorAll(selector)]
        if (selector.length > 1) {
            return selector
        } else {
            return selector[0]
        }
    }

    let strNodes = `
        <div class="unv-alert-card"> Função indisponível no momento! </div>

        <!-- LOGO -->
        <div class="logo-title-container">
            <img class="logo" src="${PATH.logo}" alt="Logo do Site">
            <div class="title-container">
                <h1 class="title">
                    <span class="part1">DEV</span>
                    <span class="part2">BRAINS</span>
                </h1>
                <span class="title-sub-text">Challenges</span>
            </div>
        </div>

        <!-- NAVEGAÇÃO -->
        <nav>
            <ul class="nav-itens-container">
                <li id="current-page"><a href="${LINK.home}">Home</a></li>
                <li><a href="${LINK.challenges}">Desafios</a></li>
                <li class="coming-soon unv"><a href="${LINK.templates}">Templates</a></li>
                <li class="coming-soon unv"><a href="${LINK.learning}">Aprenda</a></li>
                <li class="coming-soon unv"><a href="${LINK.auxLib}">Biblioteca AUX</a></li>
            </ul>

            <!-- PERFIL / CONECTAR -->
            <div class="user-set-container" id="account-log-on">
                <!-- Botão do perfil-->
                <button class="user-button">
                    <img src="#js" alt="Avatar do Usuário" class="user-avatar">
                </button>
                <div class="user-name-bar">Usuário</div>

                <!-- Menu Dropdawn do perfil -->
                <div class="profile-menu-dropdawn">
                    <!-- Aparencia -->
                    <section class="appearence-container">
                        <div class="pic-circle-container">
                            <img class="user-avatar" src="#js" alt="Avatar do Usuário">
                            <button class="edit-avatar-button">
                                ${svg.penCircle()}
                            </button>
                        </div>
                        <div class="hello-user">
                            <span>Olá, </span>
                            <span class="user-name">User!</span>
                        </div>
                        <a class="account-manage-link unv" href="${LINK.accountManage}">Gerenciar Sua Conta</a> 
                    </section>
                    <!-- Configurações -->
                    <section class="settings-container">
                        <a class="set-itens unv" href="${LINK.notifications}">Notificações</a>
                        <button class="set-itens" id="logout">Sair da Conta</button>
                        </section>
                        </div>
                        
                        <!-- Conectar uma conta -->
                <a href="${LINK.login}" class="account-connect" title="Faça login ou crie um conta para uma experiência melhor">Conecte-se</a>
                </div>
        </nav>
        `
    // Converte os elementos string para DOM
    strNodes = stringToHtml(strNodes)
    const user_set_container = strNodes[2].$('.user-set-container')


    // **** MANIPULAÇÃO DOS ELEMENTOS ANTES DE INSERIR NO DOCUMENTO *********************************
    //
    //Inserindo o nome do usuário em hello-user
    strNodes[2].$('.hello-user > .user-name').innerText = connectKey.get('user') + '!'
    strNodes[2].$('.user-name-bar').innerHTML = connectKey.get('user')

    // Redefine o id do container do usuário  se estiver conectado ou n
    if (connectKey.get('user') == null) {
        user_set_container.id = 'account-log-off'

        // Se houver usuário conectado...
    } else {
        user_set_container.id = 'account-log-on'
        // Mostrar Avatar ou Foto do usuário no circulo de icone
        strNodes[2].$('.user-avatar').forEach((circle) => {
            // Verifica se tem foto do usuário
            if (getUser().picture == null) {
                circle.src = `../Assets/Avatars/default-avatar-${getUser().avatarIdx}.svg`
            } else {
                circle.src = getUser().picture
            }
        })
    }
    

    // *** EVENTOS ****

    //Botão do perfil - Abre menu dropdawn
    strNodes[2].$('.user-button').onclick = function (e) {
        AUX.toggleDisplay($('.profile-menu-dropdawn'), 'flex')
    }


    // Botão de editar avatar - Abre modal
    strNodes[2].$('.pic-circle-container > .edit-avatar-button').addEventListener('click', (e) => {
        //Insere modal
        ModalEditAvatars('#modal-capsule')

    })

    // (TEMPORÁRIO) Mostrando mensagem de função indisponível no momento nos elementos em desenvolvimento
    strNodes[2].$('.unv').forEach((el) => {
        el.onclick = function () {
            
            if (!$('.unv-alert-card').classList.contains('slide-show')) {
                $('.unv-alert-card').classList.add('slide-show')

                setTimeout(() => {
                    $('.unv-alert-card').classList.remove('slide-show')
                }, 3000)
            }

        }
    })


    
    
    // Desconectar da conta
    strNodes[2].$('#logout').onclick = function () {
        // Insere modal
        ModalLogout('#modal-capsule')
    }

    // Insere Header em seu elemento cápsula
    AUX.insertNodes(capsule, [...strNodes])
    
}





// MODAL DE MENSAGEM DE LOGOUT
function ModalLogout(capsule) {
    const node = document.querySelector(capsule)
    const stringElement = `
        <div class="logout-modal">
            <h1 class="warn-title">ATENÇÃO!</h1>
            <p class="content">Deseja se desconectar desta conta?</p>
            <div class="buttons-container">
                <button id="confirm">Confirmar</button>
                <button id="back">Voltar</button>
            </div>
        </div>
    `
    const domElement = stringToHtml(stringElement)
    // Evento nos botões de confirmar e voltar
    domElement.$('#confirm, #back').forEach((butt) => {
        butt.onclick = function (ev) {
            // Voltar
            if (ev.target.id == 'back') {
                node.removeChild(domElement)
                node.classList.remove('logout-modal-background')
            // confirm
            } else if (ev.target.id == 'confirm') {
                // desconecta o user de connectKey
                updateUser('connectKey', { keep: false, user: null })
                // Redireciona para a página de login
                location.href = LINK.login
            }
        }
    })

    node.classList.add('logout-modal-background')
    node.appendChild(domElement)
}

