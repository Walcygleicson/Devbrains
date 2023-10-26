import Header from "./Modules/Header.js";
import { traffic, $ } from "./Modules/aux-tools.js";
import Footer from "./Modules/Footer.js"
import svg from "./Modules/svg-icons.js";
import { jsBasic } from "./Modules/questions-database.js";

Header('#header-capsule')
Footer('#footer-capsule')
traffic.start()

// Definindo informações da partida em localStorage | Informações serão limpas ao fechar aba do navegador
traffic.define({ 
    usedQuest:[],
    levelQuest: 'basic',
    score: 0,
    quesCount: 1
})

// Variaveis
var interval
let runTime = { min: 0, sec: 10, ms: 60 } // 1 minuto
let started = false
const levels = ['basic', 'medium', 'pro', 'lord']

let response = {
    correct: null, // Letra da alternativa correta
    chosen: null //Letra da alternativa escolhida pelo usuário
}

let questList // Guarda as questões do nível atual
let len // Tamanho da questList
let scoreValue // O valor da pontuação do nível


let quest = { // Dados a serem atualizados em traffic
    level: traffic.get('levelQuest'), // Nível atual
    used: traffic.get('usedQuest'), // Quests já usadas
    score: traffic.get('score'), // Socore do jogador
    count: traffic.get('quesCount') // Número de rodadas
    
}

switch (quest.level) {
    case 'basic':
        questList = jsBasic
        len = Object.keys(jsBasic).length
        scoreValue = 5.4
        break;
    
    case 'medium':
        console.log('Nível médio')
        questList = jsBasic // teste
        len = Object.keys(jsBasic).length // teste
        scoreValue = 7.7
}



//++++++++++++++++++++++++++++++++++++++
//Desativar os inputs radio
disableInput()

//Insere o nome da linguagem do desafio selecionado na tag <title>
$('.tab-title').textContent = `Devbrains - Quiz de ${traffic.get('quizLang')}`

    
// Insere icone de help no botão de tutorial
$('.tutorial-button').innerHTML = svg.helpCircle()

//Icone da linguagem
$('.lang-logo').src = `../Assets/Svg/${traffic.get('quizLang')}-icon.svg`

// Cor da barra lateral da area de perguntas | Insere um class Name da linguagem
$('.quest-area').classList.add(traffic.get('quizLang'))

// Barra de indicação de nível | Insere id current-level
$(`.${quest.level}`).id = 'current-level'

//Icone svg do botão de next quest
$('.next-quest-button > .svg-capsule').innerHTML = svg.arrowRight()

//Texto número da questão atual
$('.quest-number > .number').textContent = formatTime(quest.count)


// *** EVENTOS ***

// click no botão de start/pause/resume e cronometro
$('.start-button').addEventListener('click', (e) => {
    if (e.target.id == 'start') {
        //Ativar os inputs radio
        disableInput(false)

        e.target.id = 'running'
        e.target.textContent = 'Go!'

        runTime.min > 0 ? $('#min').textContent = runTime.min : null
        $('#sec').textContent = runTime.sec
        $('.mls').textContent = runTime.ms
        

        //Selecionar uma quest aleatória
        let randomQues
        while (true) {
            //Seleciona apenas a quest que ainda n foi selecionada
             randomQues = 'q' + parseInt(Math.random() * len)
            if (!quest.used.includes(randomQues)) {
                started = true
                quest.count ++
                quest.used.push(randomQues) // Guarda a chave de questão
                break
            }
        }
        console.log(randomQues)

        response.correct = questList[randomQues].correct

        // Inserir as questões nos elementos

        //Texto
        $('.quest-area').innerHTML = questList[randomQues]['text']
        //Alternativas
        $('.resp-text').forEach((e, i) => {
            const opt = ['a', 'b', 'c', 'd']
            e.innerHTML = questList[randomQues]['options'][opt[i]]
        })

        // Bloco de código 
        if (questList[randomQues]['code'] != null) {
            $('.code-capsule').innerHTML = questList[randomQues]['code']
            $('.code-block').classList.remove('code-empty')
            $('.code-block').classList.add('code-full')
        }
        
        //Timer
        interval = setInterval(() => {
    
            // Contagem dos milissegundos
            if (runTime.ms > 0) {
                runTime.ms --
            } else { // Segundos
                runTime.sec --
                runTime.ms = 60
    
                //Minutos
                if (runTime.min > 0 && runTime.sec <= 0) {
                    runTime.min--
                    runTime.sec = 60
                }
            }
            
    
            //Qunado o contador zerar, limpar intervalo e resetar cronometro
            if (runTime.min <= 0 && runTime.sec <= 0) {
                runTime.ms = 0
                runTime.sec = 0
                runTime.min = 0
                started = false
                clearInterval(interval)
                resCorrection()
                $('.confirm-resp-button').disabled = true
            }
    
            $('#mls').textContent = formatTime(runTime.ms)
            $('#sec').textContent = formatTime(runTime.sec)
            $('#min').textContent = formatTime(runTime.min)
        
        }, 12)
    }
})

function formatTime(value) {
    if (value < 10) { return '0' + value }
    return value
}

//****************************************** */
// Evento de click na seleção de alternativa
$('.response-label').forEach((alt) => {
    alt.addEventListener('click', () => {
        if (started) {
            // Envia a letra da alternatica escolhida pelo usuário
            response.chosen = alt.querySelector('input[type=radio]').id

            $('.confirm-resp-button').disabled = false // Habilita o botão de confirmar resposta
        }
    })
})

//*************************** */
//Evento do botão de confirmar reposta
$('.confirm-resp-button').addEventListener('click', (ev) => {
    clearInterval(interval)
    started = false
    ev.target.disabled = true
    disableInput()
    resCorrection()
})

//************************ */
//Evento do botão next
$('.next-quest-button').addEventListener('click', () => {
    // Atualizar as infos em localStorage
    traffic.set({
        score: quest.score,
        quesCount: quest.count,
        levelQuest: quest.level,
        usedQuest: quest.used
    })

    //Subir para próximo nível quando todas as 10 quest forem respondidas
    if (quest.count >= 4) {
        // Setar informações de nível
        traffic.set({
            quesCount: 1,
            usedQuest: [],
            levelQuest:  levels[levels.indexOf(quest.level) + 1]// Atualizar para próximo nível
        })
    }

    location.reload()
})



//*****FUNÇÕES AUXILIAR *** */
function disableInput(state=true) {
    $('.input-box > input[type=radio]').forEach((inpt) => {
        inpt.disabled = state
    })
}


// Correção das alternativas | Ressalta alternativa correta e falsa
function resCorrection() {
    // Animação marcar reposta correta
    $(`#${response.correct}`).parentElement.parentElement.classList.add('correct-anim')
    
    // Resposta correta
    if (response.chosen == response.correct) {
        $(`#${response.chosen}`).parentElement.parentElement.classList.add('happy-face-emoji')

        // Atribuição de pontos
        quest.score += scoreValue

    // Resposta incorreta ou nula
    } else {
        //Animaçao marcar reposta errada
        if (response.chosen != null) {
            $(`#${response.chosen}`).parentElement.parentElement.classList.add('wrong-anim')
        } else {
            $(`#${response.correct}`).parentElement.parentElement.classList.add('warn-emoji')
            $('.warn-text').style.display = 'flex'
        }
    }
    
    // Cor de texto cinza nas alternativas não destacadas ao corrigir
    $('.response-label').forEach((el) => {
        if (!el.classList.contains('wrong-anim') && !el.classList.contains('correct-anim')) {
            el = el.querySelectorAll('.resp-text, .input-box > span, .input-box > .radio-mask')
            el[0].style.opacity = 0
            el[1].style.color = 'var(--cor-cinza-fraco-2)'
            el[2].style.color = 'var(--cor-cinza-fraco-2)'
        }
    })

    // Habilitar botão de next
    $('.next-quest-button').style.display = 'flex'

}



//********************************* */










