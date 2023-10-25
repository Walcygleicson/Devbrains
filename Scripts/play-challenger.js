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
    score: 0
})

Header('#header-capsule')
Footer('#footer-capsule')

// Variaveis
var interval
let runTime = { min: 0, sec: 60, ms: 60 } // 1 minuto

let quest = {
    level: traffic.get('levelQuest'),
    used: null,
    score: traffic.get('score'),
    len: 0,
    list: null
}

switch (quest.level) {
    case 'basic':
        quest.list = jsBasic
        quest.len = Object.keys(jsBasic).length
        quest.used = traffic.get('usedQuest').basic
}



//++++++++++++++++++++++++++++++++++++++

//Insere o nome da linguagem do desafio selecionado na tag <title>
$('.tab-title').textContent = `Devbrains - Quiz de ${traffic.get('quizLang')}`

    
// Insere icone de help no botão de tutorial
$('.tutorial-button').innerHTML = svg.helpCircle()



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
             randomQues = 'q' + parseInt(Math.random() * quest.len)
            if (!quest.used.includes(randomQues)) {
                quest.used.push(randomQues) // Guarda a chave de questão
                break
            }
        }

        // Inserir as questões nos elementos

        //Texto
        $('.quest-area').innerHTML = quest.list[randomQues]['text']
        //Alternativas
        $('.resp-text').forEach((e, i) => {
            const opt = ['a', 'b', 'c', 'd']
            e.innerHTML = quest.list[randomQues]['options'][opt[i]]
        })
        console.log(quest.list[randomQues]['code'])

        // Bloco de código 
        if (quest.list[randomQues]['code'] != null) {
            console.warn('jhjk')
            $('.code-capsule').innerHTML = quest.list[randomQues]['code']
            $('.code-block').classList.remove('code-empty')
            $('.code-block').classList.add('code-full')
        }
        


        
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








