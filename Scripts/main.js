import Footer from "./Modules/Footer.js";
import setAvatar from "./Modules/Header.js";
import ModalEditAvatars from "./Modules/ModalEditAvatar.js";
import svg from "./Modules/svg-icons.js";


Footer('#footer-capsule')
setAvatar('.user-avatar') // teste

// Evento de Editar Avatar | Abrir modal
document.querySelector('.pic-circle-container > .edit-avatar-button').addEventListener('click', (e) => {
    // const modalCapsule = document.getElementById('modal-capsule')
    ModalEditAvatars('#modal-capsule')
    
})

