import { $, stringToHtml } from "./aux-tools.js"

export default function AlertModalDefault(content, title = 'Atenção!', button_text = 'Voltar', capsule = '#modal-capsule') {
    content == undefined ? content = "Escreva um texto no parametro 1 - 'content' da funçãopara ser exibido aqui!" : null

    $('html').style.overflowY = 'hidden' // Remover scroll
    
    let strElement = `
    <div class="alert-card">
            <h1 class="head-title">${title}</h1>
            <p class="content">${content}</p>
            <button class="back-button">${button_text}</button>
    </div>
    `
    //CSS inline
    const style = document.createElement('style')
    style.textContent = `
    .alert-modal-default {
        backdrop-filter: blur(30px);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 101;
        display: grid;
        place-items: center;
    }

    .alert-modal-default > .alert-card {
        background: white;
        padding: 1em 2em;
        border-radius: 10px;
        border: 1px solid rgba(231, 231, 231, 0.553);
        box-shadow: 2px 2px 3px rgba(179, 179, 179, 0.437);
        display: flex;
        flex-direction: column;
        row-gap: .5em;
    }

    .alert-modal-default > .alert-card > h1.head-title {
        color: var(--color-orange);
        font-size: 1.1em;
    }

    .alert-modal-default > .alert-card > p.content {
        font-size: .9em;
    }

    .alert-modal-default > .alert-card > button.back-button {
        margin-left: auto;
        background: var(--color-orange);
        color: white;
        padding: 3px 1.2em;
        font-size: .8em;
        border-radius: 10px;
        cursor: pointer;
        border: 1px solid white;
    }

    .alert-modal-default > .alert-card > button.back-button:hover {
        background: var(--cor-laranja-button-hover);
        box-shadow: 1px 1px 3px rgba(183, 183, 183, 0.392);
    }`

    strElement = stringToHtml(strElement)
    strElement.appendChild(style)




    // Evento de click no botão de voltar
    strElement.querySelector('.back-button').addEventListener('click', () => {
        $(capsule).classList.remove('alert-modal-default')
        $(capsule).removeChild(strElement)
        $('html').removeAttribute('style') // Devolver scroll
    })

    $(capsule).classList.add('alert-modal-default')
    $(capsule).appendChild(strElement)


}