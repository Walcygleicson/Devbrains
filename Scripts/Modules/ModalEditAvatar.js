import svg from "./svg-icons.js";
import { stringToHtml, connectKey, updateUser, getUser } from "./aux-tools.js";

let previwResult = {
    avatar: undefined,
    type: 'index',
    change: false
}
export default function ModalEditAvatars(capsule) {
    const elementCapsule = document.querySelector(capsule)
    
    // Add nome de classe no elemento capsule
    elementCapsule.classList.add('modal-background')

    const stringElement = `
        <div class="modal-container">
            <button id="close-button">${svg.closeCircle()}</button>
           <img class="user-avatar avatar-preview" src="##" alt="Avatar do Usuário">

           <div class="input-file-container">
               <div class="title">Use sua foto</div>
               <label for="user-file" class="input-file-mask">
                   <span>Busque</span>
                   ${svg.folder('class', 'folder-icon')}
               </label>
               <input type="file" name="user-file" id="user-file" accept="image/png, image/jpg, image/jpeg" style="display: none;">
           </div>
           
            <ul class="avatars-capsule">
                
            </ul>
            <div class="assignment-link">
                <span>Os avatares desta coleção podem ser encontrados em</span>
                <a href="https://www.svgrepo.com/collection/flat-profile-avatar/" target="_blank">svgrepo.com</a>
            </div>

            <button id="conclude-button">Concluir</button>

        </div>
    `
    // Convert string em html
    const node = stringToHtml(stringElement)

    //Insere O avatar ou arquivo de imagem do usuário
    if (getUser().picture == null) {
        node.querySelector('.avatar-preview').src = `../Assets/Avatars/default-avatar-${getUser().avatarIdx}.svg`
    } else {
        node.querySelector('.avatar-preview').src = getUser().picture
    }

    // Inserindo os ícones de Avatares no elemento avatars-capsule
    for (let i = 0; i <= 15; i++) {

        const iconNode = stringToHtml(
        `<li class="avatar-icon">
            <button id="avatar-${i}">
                <img src="../Assets/Avatars/default-avatar-${i}.svg" alt="Icone de Avatar de Perfil ${i}">  
            </button>
        </li> `)

        // Adiciona evento de click em cada botão da coleção de avatares
        iconNode.addEventListener('click', (e) => {
            //Mostra o avtar selecionado no avatar-preview
            node.querySelector('.avatar-preview').setAttribute('src', e.target.src)
            // Guarda a informação do incone
            previwResult.avatar = i
            previwResult.type = 'index'

            // Check se o icone da coleção selecionado é o mesmo já usado e salvo no avatarIdx
            if (getUser().avatarIdx != i) {
                // Se for um ícone difernete, salva a informação que um icone novo foi selecionado
              previwResult.change = true
            }
            
            
        })
        
        node.querySelector('.avatars-capsule').appendChild(iconNode)
        
    }


    // Mostra o arquivo de imagem enviado do sistema do usuário para o avatar-preview
    node.querySelector('#user-file').addEventListener('change', (e) => {

        //Confere se o arquivo foi enviado
        if (e.target.files.length > 0) {
            // Leitor do arquivo de imagem e converte em Base64
            var fileBase64 = new FileReader()
            
            // Quando o arquivo for carregado, insere-o no scr de avatar-preview
            fileBase64.onload = function () {
                // Guarda a informação do arquivo de imagem
                previwResult.avatar = fileBase64.result
                previwResult.type = 'file'
                previwResult.change = true

                node.querySelector('.avatar-preview').setAttribute('src', fileBase64.result)
            }
            // Lê o arquivo de imagem e cria uma URL
            fileBase64.readAsDataURL(e.target.files[0])
            
        }

        
    })
    //EVENTO NO BOTÃO DE CONCLUIR E SALVAR DADOS DE IMAGEN (locaStorage)
    node.querySelector('#conclude-button').addEventListener('click', (e) => {
        const name = connectKey.get('user')

        //Atualiza o localStorage se um novo icone ou foto tiver sido selecionado
        if (previwResult.change) {
            
            if (previwResult.type == 'index') {
                updateUser(name, { avatarIdx: previwResult.avatar, picture: null })
               
            } else if (previwResult.type == 'file') {
                updateUser(name, {picture: previwResult.avatar, avatarIdx: null})
                
            }
    
            previwResult.change = false
            // Remove o elemento criado e remove o nome de classe
            elementCapsule.removeChild(node)
            elementCapsule.classList.remove('modal-background')
            // Regarrega apágina para aplicar as atualizações
            location.reload()
        } else {
            window.alert('Selecione um novo Avatar ou nova Foto para aplicar!')
        }
    })

    //EVENTO DE CLICK NO BOTÃO DE FECHAR MODAL
    node.querySelector('#close-button').addEventListener('click', (e) => {

        // Remove o elemento criado e remove o nome de classe
        elementCapsule.removeChild(node)
        elementCapsule.classList.remove('modal-background')
    })


    elementCapsule.appendChild(node)

}
