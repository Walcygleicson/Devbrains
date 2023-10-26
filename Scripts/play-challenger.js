import Header from "./Modules/Header.js";
import { traffic, $ } from "./Modules/aux-tools.js";
import Footer from "./Modules/Footer.js"
import svg from "./Modules/svg-icons.js";
import { jsBasic } from "./Modules/questions-database.js";

traffic.start()

traffic.define({ // Gurada informações da partida em localStorage
    usedQuest: {
        basic: [],
        medium: [],
        pro: [],
        lord: []
    },

    levelQuest: 'basic',
    score: 0,
    quesCount: 0
})

Header('#header-capsule')
Footer('#footer-capsule')

// Variaveis
var interval
let runTime = { min: 0, sec: 60, ms: 60 } // 1 minuto
let started = false
let response = {
    correct: null, // Letra da alternativa correta
    chosen: null //Letra da alternativa escolhida pelo usuário
}

let questList // Guarda as questões do nível atual
let len // Tamanho da questList


let quest = { // Dados a serem atualizados em traffic
    level: traffic.get('levelQuest'),
    used: null,
    score: traffic.get('score'),
    count: traffic.get('quesCount')
    
}

switch (quest.level) {
    case 'basic':
        questList = jsBasic
        len = Object.keys(jsBasic).length
        quest.used = traffic.get('usedQuest').basic
}



//++++++++++++++++++++++++++++++++++++++

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


// *** EVENTOS ***

// click no botão de start/pause/resume e cronometro
$('.start-button').addEventListener('click', (e) => {
    if (e.target.id == 'start') {
        e.target.id = 'running'
        e.target.textContent = 'Go!'
        runTime.min > 0 ? $('#min').textContent = runTime.min : null
        $('#sec').textContent = runTime.sec
        $('.mls').textContent = runTime.ms
        // Obtem o nível atual
        

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
                clearInterval(interval)
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
    $('.confirm-resp-button').disabled = true
    // Animação marcar reposta correta
    $(`#${response.correct}`).parentElement.parentElement.classList.add('correct-anim')
    
    if (response.chosen == response.correct) {
        $(`#${response.chosen}`).parentElement.parentElement.classList.add('happy-face-emoji')
    } else {
        //Animaçao marcar reposta errada
        $(`#${response.chosen}`).parentElement.parentElement.classList.add('wrong-anim')
    }
})








