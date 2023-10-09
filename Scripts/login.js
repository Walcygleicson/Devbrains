import svg from "./Modules/svg-icons.js";
import { focusInOut, AUX, $, connectKey} from "./Modules/aux-tools.js";
connectKey.create()

// Entrar automaticamente
// for (let index = 0; index < localStorage.length; index++) {
//     const keys = localStorage.key(index)
//     if (keys != 'currentUserLog') {
//         const getStorage = JSON.parse(localStorage.getItem(keys))
//         if (getStorage.enterAutomatically) {
//             setTimeout(() => {
//                 // window.location.href = 'Pages/main.html';
//             }, 1000)
//         }
//     }
    
    
// }


const alert = {
    warnIcon: '⚠️',
    icon: '&#x26A0',
    required: ' Preencha este campo!',
    nameLen: ` Nome deve conter pelo menos ${$('#name').getAttribute('minLength')} caracteres!`,
    passLen: ` Senha deve conter pelo menos ${$('#senha').getAttribute('minLength')} caracteres!`,
    incorrectName: ' Usuário não encontrado!',
    incorrectPass: ' Senha está incorreta!',
    confirmError: ' As senhas não correspondem!'
}

const loginIconsList = [svg.user(), svg.lock(), svg.shieldSheck()]
const inputIconCapsule = document.querySelectorAll('.input-icon-capsule')
const enterButton = document.querySelector('.confirm-button')
const inputAlerts = [...document.querySelectorAll('.input-alert')]
const confirmPass = document.querySelector('#confirm-senha')
const registerButton = document.querySelector('.other-option-button')
const form = document.querySelector('.inputs-container')
const input = document.querySelectorAll('.input > input')
const setAlertMsg = (i, txt)=>{inputAlerts[i].innerHTML = txt}
const formType = (type) => {
    if (form.id.split('-')[1] == type) {
        return true
    }

    return false
}

inputIconCapsule.forEach((elem, i) => {
    elem.innerHTML = loginIconsList[i]
})


// Evento de click no botão ENTRAR
let fail = false
enterButton.addEventListener('click', (e) => {
    e.preventDefault()
    const autologin = document.querySelector('#autologin')
    const password = document.querySelector('#senha')
    const getUser = JSON.parse(localStorage.getItem(input[0].value))

    const checkInput = (i, idName, checkVal) => {
        if (input[i].id == idName) {
            switch (idName) {
                case 'name':
                    check.name = checkVal
                    break;
            
                case 'senha':
                    check.senha = checkVal
                    break;
                case 'confirm-senha':
                    check.confirm = checkVal
                    break;
            }
        }
    }
    
    // Check se todos os campos estão ok
    let check = {
        name: false,
        senha: false,
        confirm: false
    }
    // verifica os requisitos dos campos e dispara o texto de alerta
    input.forEach((elem, i) => {
        const minLength = elem.getAttribute('minLength')
        // Para LOGIN
        if (formType('login') && elem.id != 'confirm-senha') {
            // Alerta de campo vazio
            if (elem.value.length <= 0) {
                setAlertMsg(i, alert.icon + alert.required)
                elem.classList.add('error')
            } else {
                elem.classList.remove('error')
                setAlertMsg(i, '')
                //Alerta de nome de usuário incorreto
                if (getUser == null) {
                    elem.classList.add('error')
                    check.nome = false
                    setAlertMsg(0, alert.icon + alert.incorrectName)
                //Alerta de senha incorreta
                } else if (getUser.senha != $('#senha').value) {
                    elem.classList.add('error')
                    check.senha = false
                    setAlertMsg(1, alert.icon + alert.incorrectPass)
                } else {
                    elem.classList.remove('error')
                    check.name = true
                    check.senha = true
                }
            }
  
        // Para REGISTRO
        } else if (formType('register')) {
            // Alerta de campo vazio
            if (elem.value.length <= 0) {
                fail = true
                checkInput(i, 'name', false)
                checkInput(i, 'senha', false)
                checkInput(i, 'confirm-senha', false)
                setAlertMsg(i, alert.icon + alert.required)

            // Alerta de quantidade minima de carateres para os campos de 'nome' e 'senha'
            } else if (elem.value.length > 0 && elem.value.length < minLength && elem.id != 'confirm-senha') {
                fail = true
                checkInput(i, 'name', false)
                checkInput(i, 'senha', false)
                checkInput(i, 'confirm-senha', false)
                elem.id == 'name' ? setAlertMsg(i, alert.icon + alert.nameLen): null
                elem.id == 'senha' ? setAlertMsg(i, alert.icon + alert.passLen) : null
            } else {
                setAlertMsg(i, '')
                checkInput(i, 'name', true)
                checkInput(i, 'senha', true)
                
                //Alerta de confirmação de senha incompatível
                if ($('#senha').value != $('#confirm-senha').value) {
                    fail = true
                    check.confirm = false
                    setAlertMsg(2, alert.icon + alert.confirmError)
                } else {
                    setAlertMsg(2, '')
                    check.confirm = true
                }
            }
        }

    })

    console.log(check)

    // LOGIN
    if (formType('login')) {
        // Se usuário e senha forem econtrados no localStorage
        if (check.name && check.senha) {
                // Sobrescreve o usuário conectado atual
                connectKey.set(input[0].value, autologin.checked)
                input[0].value = ''
                input[1].value = ''
                console.log('USUÁRIO LOGADO')
            
                // Redireciona para a proxima página
                window.location.href = 'Pages/main.html';
        }

    // REGISTRO
    } else if (formType('register')) {
        if (check.name && check.senha && check.confirm) {

            // Salva os dados do usuário
            localStorage.setItem(input[0].value, JSON.stringify({
                senha: input[1].value,
                score: 0,
                level: 'basic',
                avatarIdx: parseInt(Math.random() * 15),
                picture: null
            }))

            // Salva o usuário conectado atual
            connectKey.set(input[0].value, autologin.checked)
            console.log('USUÁRIO CADASTRADO')
            
            // Redireciona para a proxima página
            window.location.href = 'Pages/main.html';
        }
    }
})



// Verificação de preenchemento dos campos NOME e SENHA
input.forEach((elem, i) => {
    elem.addEventListener('input', (e) => {
        const minLength = elem.getAttribute('minLength')
        const inptEvent = e.target
        if (formType('login')) {
            inptEvent.classList.remove('error')
            setAlertMsg(i, '')
        } else if (formType('register') && fail) {
            setAlertMsg(i, '')
            if (inptEvent.value.length > 0 && inptEvent.value.length < minLength) {
                inptEvent.id == 'name' ? setAlertMsg(i, alert.icon + alert.nameLen): null
                inptEvent.id == 'senha' ? setAlertMsg(i, alert.icon + alert.passLen) : null
            }

        }
        
    })
})


focusInOut('.input > input', (e) => {
    const svgIcon = e.target.previousElementSibling.children[0]
    if (e.act) {
        svgIcon.style.fill = 'orange'
    } else {
        svgIcon.style.fill = 'var(--cor-cinza-fraco-2)'
    }
})


// EVENTO BOTÃO DE SELEÇÃO REGISTRO/LOGIN
const cardTitle = document.querySelector('.form-card > .card-title')
let canPlay = true // Enquanto false a animação de fade não pode ser executada
registerButton.addEventListener('click', (e) => {
    e.preventDefault()
    fail = false
    $('.view-pass-button').forEach((viewBut) => {
        viewBut.classList.remove('hide-pass')
        viewBut.classList.add('show-pass')
        viewBut.innerHTML = svg.view()
        viewBut.previousElementSibling.type = 'password'
    })

    if (canPlay) {
        setTimeout(() => {
            // Faz a troca do id do formulário
            form.id == 'type-login' ? form.id = 'type-register' : form.id = 'type-login'
            // Faz troca dos textos do card para LOGIN ou REGISTRO
            if (formType('register')) {
                cardTitle.innerText = 'REGISTRO'
                $('.confirm-button').innerText = 'REGISTRAR'
                $('.other-option-button > .inner-text').innerText = 'Faça Login'

            } else if (formType('login')) {
                cardTitle.innerText = 'LOGIN'
                $('.confirm-button').innerText = 'ENTRAR'
                $('.other-option-button > .inner-text').innerText = 'Cadastre-se'
            }
        },500)
    }

    // Animação de transição com fade in-out
    const fadeTransitionElems = document.querySelectorAll('.fade-transition')
    fadeTransitionElems.forEach((elem, i) => {
        // Reseta os campos e os alerts para a transição
        if (i < 3) {
            setAlertMsg(i, '')
            input[i].classList.remove('error')
            input[i].value = ''
        }

        if (canPlay) {
            AUX.replaceClassNames(elem, 'fade-hide', 'fade-show')

            setTimeout(() => {
                AUX.replaceClassNames(elem, 'fade-hide', 'fade-show')
                canPlay = true
            }, 500)
        }
        
    })

    canPlay = false
   
})

// Evento do botão de MOSTRAR/ESCONDER SENHA
$('.view-pass-button').forEach((butt, i) => {
    // Insere os icones de view nos buttons
    butt.innerHTML = svg.view()

    //EVENTO
    butt.onclick = () => {
        AUX.replaceClassNames(butt, 'show-pass', 'hide-pass')
        if (butt.classList.contains('show-pass')) {
            butt.innerHTML = svg.view()
            butt.previousElementSibling.type = 'password'
        } else if (butt.classList.contains('hide-pass')) {
            butt.innerHTML = svg.noView()
            butt.previousElementSibling.type = 'text'
        }
    }
})





