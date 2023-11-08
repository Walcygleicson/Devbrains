import Header from "./Modules/Header.js";
import { traffic, $, getUser, updateUser,connectKey, stringToHtml, noLoginUser, AUX } from "./Modules/aux-tools.js";
import Footer from "./Modules/Footer.js"
import svg from "./Modules/svg-icons.js";
import RankingTable from "./Modules/RankingTable.js";

import { jsBasic } from "./Modules/quest-data-base/js-questions-basic.js";
import { jsMedium } from "./Modules/quest-data-base/js-questions-medium.js"
import { jsAdvanced } from "./Modules/quest-data-base/js-questions-advanced.js";
import { jsPro } from "./Modules/quest-data-base/js-questions-pro.js"

Header('#header-capsule')
Footer('#footer-capsule')


traffic.start()
noLoginUser.create()
noLoginUser.define({ranking: {}})
connectKey.create()

// Definindo informações da partida em localStorage | Informações serão limpas ao fechar aba do navegador
traffic.define({ 
    usedQuest:[],
    levelQuest: 'basic',
    score: 0,
    quesCount: 1,
    quesNumber: 1,
    errorNumb: 0,
    correctNumb: 0
})

// Variaveis
var interval
let runTime = { min: 0, sec: 60, ms: 60 } // 1 minuto
let started = false
const levels = ['basic', 'medium', 'advanced', 'pro']

let response = {
    correct: null, // Letra da alternativa correta
    chosen: null, //Letra da alternativa escolhida pelo usuário.
}

let questList // Guarda as questões do nível atual
let len // Tamanho da questList

const scoreValue = {// O valor da pontuação de cada nível
    basic: 1.4,
    medium: 2.1,
    advanced: 2.7,
    pro: 3.5
}


let quest = { // Dados a serem atualizados em traffic
    level: traffic.get('levelQuest'), // Nível atual
    used: traffic.get('usedQuest'), // Quests já usadas
    score: traffic.get('score'), // Socore do jogador
    count: traffic.get('quesCount'), // Número de rodadas
    lang: traffic.get('quizLang'),
    number: traffic.get('quesNumber'),
    correctNumb: traffic.get('correctNumb'),
    errorNumb: traffic.get('errorNumb'),
    
}

switch (quest.level) {
    case 'basic':
        questList = jsBasic
        len = Object.keys(jsBasic).length
        break;
    
    case 'medium':
        questList = jsMedium
        len = Object.keys(jsMedium).length
        break
    case 'advanced':
        questList = jsAdvanced
        len = Object.keys(jsAdvanced).length
        break
    case 'pro':
        questList = jsPro
        len = Object.keys(jsPro).length
        break
}



//++++++++++++++++++++++++++++++++++++++
//Desativar os inputs radio
disableInput()

//Insere o nome da linguagem do desafio selecionado na tag <title>
$('.tab-title').textContent = `Devbrains - Quiz de ${traffic.get('langName')}`

    
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
$('.quest-number > .number').textContent = formatTime(quest.number)


// *** EVENTOS ***

// click no botão de start e cronometro
$('.start-button').addEventListener('click', (e) => {
    if (e.target.id == 'start') {
        //Ativar os inputs radio
        disableInput(false)
        //Desativar botão de tutorial
        $('.tutorial-button').disabled = true

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
                quest.count++
                quest.number ++
                quest.used.push(randomQues) // Guarda a chave de questão
                break
            }
        }

        response.correct = questList[randomQues].correct

        // Inserir as questões nos elementos >>
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
        usedQuest: quest.used,
        quesNumber: quest.number,
        correctNumb: quest.correctNumb,
        errorNumb: quest.errorNumb
    })

    //Subir para próximo nível quando todas as 10 quest de cada nível forem respondidas
    if (quest.count > 3) {
        // Setar informações de nível
        traffic.set({
            quesCount: 1,
            usedQuest: [],
            levelQuest:  levels[levels.indexOf(quest.level) + 1]// Atualizar para próximo nível
        })
    }
    

    // Contagem de pontuação ao final do desafio
    //teste
    if (quest.number > 12) { // 12 Teste
        // Data e Hora
        const data = `${new Date().getDate()}/${formatTime(new Date().getMonth() + 1)}/${new Date().getFullYear()}`
        const hora = `${new Date().getHours()}:${formatTime(new Date().getMinutes())} ${Number(new Date().getHours()) > 11? 'PM': 'AM'}`

        // Salvando dados da partida na chave do perfil do usuário em localStorage | Ou em traffic em caso de não logado
        var getScore
        let roundLevel
        if (connectKey.get('user') != null) {
            getScore = getUser().ranking // Obtem os dados do usuário se estiver logado
        } else {
            getScore = noLoginUser.get('ranking') // Obtem os dados de noLoginUser se não estiver logado
        }

        // Cria tabela de informações da partida da linguagem se ela não existir ainda
        if (getScore[quest.lang] == undefined) {
            getScore[quest.lang] = []
        }

        
        // Deve-se acertar 100% do nível basico e metade do nível médio para receber pontuação do nível médio. etc
        if (quest.score <= (scoreValue.basic * 3) + ((scoreValue.medium * 3) /2)) {
            roundLevel = 'basic'
            
            
        } else if (quest.score <= ((scoreValue.basic * 3) + (scoreValue.medium * 3)) + ((scoreValue.pro * 3) / 2)) {
            roundLevel = 'medium'
            
        } else if (quest.score <= ((scoreValue.basic * 3) + (scoreValue.medium * 3) + (scoreValue.advanced * 3) + ((scoreValue.pro * 3) / 2))) {
            roundLevel = 'advanced'
            
        } else {
            roundLevel = 'pro'
        }

        // Atualizando dados ******
        // Setando a prop current dos rounds anteriores para false
        getScore[quest.lang].forEach((round, i) => {
            if (round.current == true) {
                getScore[quest.lang][i].current = false
            }
        })


        //Lista de ranking >> pontos | nível | data e hora | atual
        getScore[quest.lang].push({
            score: quest.score,
            level: roundLevel,
            data: data,
            hora: hora,
            current: true, // Marca o ultimo round jogado
            correctNumb: quest.correctNumb,
            errorNumb: quest.errorNumb

        })

        // Ordenando a lista do maior para menor com base na pontuação
        getScore[quest.lang].sort(function (a, b) {
            if (a.score > b.score) {
                return -1;
            }
            if (a.score < b.score) {
                return 1;
            }
            return 0;
        });

        //SAVE
        // Salvando os dados no perfil do usuário em LocalStorage | Login
        if (connectKey.get('user') != null) { 
            updateUser(connectKey.get('user'), { ranking: getScore })
        } else { // Sem Login | Salvar em noLoginUser
            noLoginUser.set({ranking: getScore})
        }

        //Abre modal de Parabéns >> Tabela de Ranking
        openCongratModal()
        // Setar infos de trafic e preparar para nova partida
        traffic.set({
            quesCount: 1,
            quesNumber: 1,
            score: 0,
            usedQuest: [],
            correctNumb: 0,
            errorNumb:0
        })
  
    } else {
        location.reload()
    }
    
    
})


// Click no botão de tutorial
const tutoText = [
    `Neste desafio você reposnderá 40 questões envolvendo a tecnologia ${traffic.get('langName')}. Serão 10 questões para cada Nível.`,

    'Esta barra marca o nível atual das questões. São 4 níveis, do Básico ao Pro.',

    'Pressione Start para começar a partida. Cada questão é cronometrada. Responda antes que o tempo zere!',

    'Neste campo aparecerá a pergunta quando a partida for iniciada!',

    'Um exemplo de código referente à pergunta será mostrado neste campo caso for necessário. Questões podem ou não mostrar exemplos de códigos!',

    'As alternativas serão liberadas quando a partida for iniciada!',

    'O botão de Confirmar reposta será liberado assim que uma alternativa for marcada! Pressione para confirmar sua reposta e prosseguir! Se o tempo zerar e houver uma alternativa marcada e o botão no for pressionado, a alternativa marcada será avaliada mesmo assim. Se o tempo zerar e nenhuma alternativa for marcada, automaticamente será considerado como respota errada!',

    'O botão de Próximo será liberado assim que sua reposta for confirmada e avaliada. Pressione para seguir para as próximas questões. Ao final do desafio sua pontuação e classificação serão exibidos na tela. Boa sorte!'
]


$('.tutorial-button').addEventListener('click', () => {
    let tc = 0

    const el = () => {
        const card = stringToHtml(`
        <div class="tuto-card"><h1>Tutorial</h1><p>${tutoText[tc]}</p><button class="next-tuto">${svg.arrowRight()}</button></div>
        `)

        //Click no botão de próximo tutorial
        card.$('.next-tuto').addEventListener('click', () => {
            // Deletar o card de tutorial e class do alvo antigo
            const oldTarget = $('.target-tutorial-' + tc)
            oldTarget.removeChild(oldTarget.querySelector('.tuto-card'))
            oldTarget.classList.remove('current-tuto')

            if (tc < tutoText.length - 1) {
                tc++
                // Inserir card de tutorial e class no proximo alvo
                $('.target-tutorial-' + tc).appendChild(el())
                $('.target-tutorial-' + tc).classList.add('current-tuto')
            } else {

                //Resetar elementos
                $('.start-button').id = 'start'
                $('.next-quest-button').disabled = false
                $('.tutorial-button').disabled = false
                $('.next-quest-button').style.display = 'none'
                $('.code-block').classList.remove('code-full')
                $('.code-block').classList.add('code-empty')
                tc = 0
            }
        })
        
        return card
    } 


    //Desabilitar botões
    $('.start-button').id = 'running'
    $('.next-quest-button').disabled = true
    $('.tutorial-button').disabled = true
    $('.next-quest-button').style.display = 'flex'
    $('.code-capsule').innerHTML = `
    <span class="def">var</span> <span class="var-name">example</span> = "<span class="str-text">Hello, world!</span>"
    <span class="var-name">console</span>.<span class="func-method-name">log</span>(<span class="var-name">example</span>)`
    AUX.replaceClassNames($('.code-block'), 'code-empty', 'code-full')

    $('.target-tutorial-0').classList.add('current-tuto')
    $('.target-tutorial-0').appendChild(el())

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
        quest.score += scoreValue[quest.level]
        // Contagem de respotas corretas
        quest.correctNumb ++
    

    // Resposta incorreta ou nula
    } else {
        quest.errorNumb ++
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


function openCongratModal() {

    //Insere modal na capsula
    let strElem = `
        <div class="congrat-modal">
            <div class="stars-container"></div>
            <h1 class="title">Parabéns!</h1>
            <p class="text">Você concluiu o desafio! Segue para ver sua classificação e pontos.</p>
            <button class="open-rank-button">Avançar</button>
        </div>`
    
    strElem = stringToHtml(strElem)
    $('#modal-capsule').classList.add('congrat-modal-background')
    $('#modal-capsule').appendChild(strElem)
    

    //Adicionar estrelas
    for (let i = 0; i < 5; i++) {
        $('.stars-container').innerHTML += svg.starSolid()
    }

    //Animação fade in das estrelas
    let interval
    let c = 0
    interval = setInterval(() => {
        $('.stars-container').children[c].classList.add('fade-animation')
        c++

        if (c > 4) {
            clearInterval(interval)
        }
    }, 200)

    //Evento no botão Avançar
    strElem.querySelector('.open-rank-button').addEventListener('click', () => {
        // Remover Modal
        $('#modal-capsule').classList.remove('congrat-modal-background')
        $('#modal-capsule').removeChild($('.congrat-modal'))
        // Abrir Tabela de Ranking
        RankingTable()
        
    })
}


//*********************************


//teste de bloco de código
function testeCodeBlock(code, active = true) {
    if (active) {
        
        $('.code-block').classList.remove('code-empty')
        $('.code-block').classList.add('code-full')
        $('.code-capsule').innerHTML = code
    }

}

//testeCodeBlock(jsMedium.q16.code)


