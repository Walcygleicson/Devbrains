import Footer from "./Modules/Footer.js";
import Header from "./Modules/Header.js";
import ModalEditAvatars from "./Modules/ModalEditAvatar.js";
import { connectKey, $ } from "./Modules/aux-tools.js";
import svg from "./Modules/svg-icons.js";
connectKey.create()

Footer('#footer-capsule')
Header('.user-avatar') // teste

// Evento de Editar Avatar | Abrir modal
document.querySelector('.pic-circle-container > .edit-avatar-button').addEventListener('click', (e) => {
    // const modalCapsule = document.getElementById('modal-capsule')
    ModalEditAvatars('#modal-capsule')
    
})

