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
    challenges: 'challenges.html',
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
        
                <li class="close-nav mob-type">
                    <button>${svg.arrowRight()}</button>
                </li>

                <li class="profile-itens mob-type"><!-- JS --></li>

                <li class="navigation-item home"><a href="${LINK.home}">
                    <span class="inner-txt">Home</span>
                    <div class="svg-capsule mob-type"><!-- JS --></div>
                </a></li>


                <li class="navigation-item challengers"><a href="${LINK.challenges}">
                    <span class="inner-txt">Desafios</span>
                    <div class="svg-capsule mob-type"><!-- JS --></div>
                </a></li>

                <li class="coming-soon unv navigation-item templates"><a href="${LINK.templates}">
                    <span class="inner-txt">Templates</span>
                    <div class="svg-capsule mob-type"><!-- JS --></div>
                </a></li>

                <li class="coming-soon unv navigation-item learning"><a href="${LINK.learning}">
                    <span class="inner-txt">Aprenda</span>
                    <div class="svg-capsule mob-type"><!-- JS --></div>
                </a></li>

                <li class="coming-soon unv navigation-item auxjs"><a href="${LINK.auxLib}">
                    <span class="inner-txt">AUX.js</span>
                    <div class="svg-capsule mob-type"><!-- JS --></div>
                </a></li>

                <li class="account-itens mob-type"></li>
            </ul>

            <!-- PERFIL / CONECTAR -->
            <div class="user-set-container" id="account-log-off">
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
                        <button class="set-itens" id="logout-button-0">Sair da Conta</button>
                    </section>
                </div>
                        
                <!-- Conectar uma conta -->
                <a href="${LINK.login}" class="account-connect" title="Faça login ou crie um conta para uma experiência melhor">Conecte-se</a>

                <!-- Botão menu hamburger para mobiles -->
                <button class="hamburguer-button mob-type">${svg.hamburguerMenu()}</button>
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

    //Controle da barra inferior de indicação de página atual da nav (:before)
    strNodes[2].$('.navigation-item').forEach((item) => {
        if (item.classList.contains($('title').id)) {
            item.id = 'current-page'
            
        }
    })

    // Insere os ícones de interface svg quando a largura da tela for ideal
    // Atualiza sempre que a largura da janela é alterada
    window.addEventListener("resize", () => {
        insert_nav_svg($('.svg-capsule'))
        //Insere id 'mobile-mode no botão de abrir menu do usuário
        user_button_mode($('.user-button'))
    })

    //Insere id 'mobile-mode no botão de abrir menu do usuário quando a página carregar
    user_button_mode(strNodes[2].$('.user-button'))

   
    //Atualiza quando a página carrega
    insert_nav_svg(strNodes[2].$('.svg-capsule'))

    //Insere clones dos itens de configurações de perfil
    profile_menu_clone(strNodes[2].$('.appearence-container, .settings-container, .account-connect'), strNodes[2].$( '.profile-itens'))

    // Redefine o id do container do usuário  se estiver conectado ou n
    if (connectKey.get('user') == null) {
        user_set_container.id = 'account-log-off'

        strNodes[2].$('.profile-itens').id = 'user-off'

        // Se houver usuário conectado...
    } else {
        user_set_container.id = 'account-log-on'
        strNodes[2].$('.profile-itens').id = 'user-on'
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

    //Botão do perfil - Abre menu dropdawn | Botão hamburguer - Menu Lateral (Mobile)
    strNodes[2].$('.user-button, .hamburguer-button').forEach((but) => {
        but.onclick = function (e) {
    
            if ($('.user-button').id != 'mobile-mode') {
                AUX.toggleDisplay($('.profile-menu-dropdawn'), 'flex')
            } else {
                $('.nav-itens-container').style.transitionDuration = '1s'
                $('.nav-itens-container').style.right = 0
            }
        }
        
    })

    //Botão de fechar menu lateral (Mobile)
    strNodes[2].$('.close-nav').addEventListener('click', () => {
        $('.nav-itens-container').style.right = '-400px'
    })


    // Botão de editar avatar - Abre modal
    strNodes[2].$('.edit-avatar-button').forEach((but) => {
        but.onclick = function () {
            
            //Insere modal
            ModalEditAvatars('#modal-capsule')
        }

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
    strNodes[2].$('#logout-button-0, #logout-button-1').forEach((but) => {
        but.onclick = function () {
            modal_logout('#modal-capsule')   
        }
        
    })


    // Insere Header em seu elemento cápsula
    AUX.insertNodes(capsule, [...strNodes])
    
    
}



// INSERE OS ÍCONES DE INTERFACE DE NAVEGAÇÃO
function insert_nav_svg(element) {
    const icons = [svg.home(), svg.dice(), svg.puzzle(), svg.code(), svg.flask()]
    if (window.innerWidth <= 900) {
        element.forEach((el, i) => {
            // Verifica se a capsula está vazia
            if (!AUX.hasChild(el)) {
                el.innerHTML = icons[i]
            }
        })
    }
}


// MODAL DE MENSAGEM DE LOGOUT
function modal_logout(capsule) {
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


// CLONE DO MENU DE PERFIL 
function profile_menu_clone(clone, capsule) {
    clone = _domList(clone)
    capsule = _domList(capsule)[0]

    clone.forEach((el) => {
        capsule.appendChild(el.cloneNode(true))
    })
    capsule.$('.settings-container').children[1].id = 'logout-button-1'

}

// Insere um id no botão do usuário para modo mobile
const user_button_mode = (target) => {
     if (window.innerWidth <= 700) {
        target.id = 'mobile-mode'
    } else {
        target.removeAttribute('id')
    }

    if (target.id == 'mobile-mode') {
        target.parentNode.$('.profile-menu-dropdawn').style.display = 'none'
    }
}

