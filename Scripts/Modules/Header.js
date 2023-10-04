import { connectKey, getUser, updateUser, AUX } from "./aux-tools.js"
import { $ } from "./aux-tools.js"

export default function Header(capsule) {
    // Mostrar Avatar ou Foto do usuário no circle
    $('.user-avatar').forEach((circle) => {
        if (getUser().picture == null) {
            circle.src =  `../Assets/Avatars/default-avatar-${getUser().avatarIdx}.svg`
        } else {
            circle.src = getUser().picture
        }
    })

    //EVENTO DO ÍCONE DO PERFIL
    $('.user-button').onclick = function (e) {
        const dropdawn = $('.profile-menu-dropdawn')
        AUX.toggleDisplay(dropdawn, 'flex')
    }


    ////
    const a = document.querySelector('.user-name-bar').innerHTML = connectKey.get('user')
    

}