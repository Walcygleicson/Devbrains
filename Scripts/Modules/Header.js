import { connectKey, getUser, updateUser, AUX, stringToHtml } from "./aux-tools.js"
import { $ } from "./aux-tools.js"

export default function Header(capsule) {
    if (connectKey.get('user') == null) {
        $('.user-set-container').id = 'account-log-off'
    } else {
        $('.user-set-container').id = 'account-log-on'
    }


    // Mostrar Avatar ou Foto do usuário no circle
    $('.user-avatar').forEach((circle) => {
        // Check se existe usuário connectado
        if ($('.user-set-container').id == 'account-log-on') {
            
            if (getUser().picture == null) {
                circle.src =  `../Assets/Avatars/default-avatar-${getUser().avatarIdx}.svg`
            } else {
                circle.src = getUser().picture
            }
        }
    })

    //EVENTO DO ÍCONE DO PERFIL
    $('.user-button').onclick = function (e) {
        const dropdawn = $('.profile-menu-dropdawn')
        AUX.toggleDisplay(dropdawn, 'flex')
    }

    //Inserindo o nome do usuário em hello-user
    $('.hello-user > .user-name').innerText = connectKey.get('user')

    // (TEMPORÁRIO) Mostrando mensagem de função indisponível no momento nos elementos em desenvolvimento
    $('.unv').forEach((el) => {
        el.onclick = function () {
            
            if (!$('.unv-alert-card').classList.contains('slide-show')) {
                $('.unv-alert-card').classList.add('slide-show')

                setTimeout(() => {
                   $('.unv-alert-card').classList.remove('slide-show') 
                }, 3000)
            }

        }
    })

    //Evento de sair da conta
    $('#logout').onclick = function () {
        // Mostrar modal
        ModalLogout('#modal-capsule')
    }


    
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
        domElement.querySelectorAll('#confirm, #back').forEach((butt) => {
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
                    location.href = '../../index.html'
                }
            }
        })

        node.classList.add('logout-modal-background')
        node.appendChild(domElement)
}


    


    ////
    const a = document.querySelector('.user-name-bar').innerHTML = connectKey.get('user')
    

}