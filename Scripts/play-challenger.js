import Header from "./Modules/Header.js";
import { traffic, $ } from "./Modules/aux-tools.js";
import Footer from "./Modules/Footer.js"
import svg from "./Modules/svg-icons.js";
import { jsBasic } from "./Modules/questions-database.js";

traffic.start()
console.log(jsBasic)
Header('#header-capsule')
Footer('#footer-capsule')

// Variaveis
var interval
let runTime = { min: 2, sec: 60, ms: 60 }
//++++++++++++++++++++++++++++++++++++++

//Insere o nome da linguagem do desafio selecionado na tag <title>
$('.tab-title').textContent = `Devbrains - Quiz de ${traffic.get('quizLang')}`

    
// Insere icone de help no botão de tutorial
$('.tutorial-button').innerHTML = svg.helpCircle()



// *** EVENTOS ***

// click no botão de start/pause/resume e cronometro
$('.start-pause-button').addEventListener('click', (e) => {
    console.log('button')
    if (e.target.id == 'start') {
        e.target.id = 'pause'
        e.target.textContent = 'Pause'
        runTime.min > 0 ? $('#min').textContent = runTime.min : null
        $('#sec').textContent = runTime.sec
        $('.mls').textContent = runTime.ms
        
    }
    
    if (e.target.id == 'pause') {
        e.target.id = 'resume'
        e.target.textContent = 'Resume'

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


    } else if (e.target.id == 'resume') {
        e.target.id = 'pause'
        e.target.textContent = 'Pause'
        clearInterval(interval)
    }
})

function formatTime(value) {
    if (value < 10) { return '0' + value }
    return value
}
//---------------




function stringToCodeJs() {
    
    let strCode = `
    ${js.function('teste', 'values, oi')}{
        ${js.var('const', 'number', 34)}
        ${js.useConst('number')} = ${js.nVal(null)}
    }

    ${js.call('teste', js.bool(true))}
    ${js.op('if')}(${js.useVar('number')} >= ${js.numb(5)}){
        ${js.useVar('console')}.${js.call('log', js.str('Olá Mundo'))}
    }

    ${js.var('var', 'temp')} = ${js.templateStr(`Olá ${js.dollarFunc(js.useConst('number'))}`)}
    `
    $('.code-capsule').innerHTML = strCode

}

const span = (className, content) => {
    return `<span class='${className}'>${content}</span>`
}

const js = {
    function(name = '', params = '') {
        if (params.includes(',')) {
            params = params.replaceAll(/,\s*/g, '%,% ').split('%')
            params.map((it, i) => {
                if (it != ',') {
                    params[i] = span('param', it)
                }
            })
            params = params.join('')
        } else {
            params = span('param', params)
        }
        name = span('func-method-name', name)
        return `${span('def', 'function')} ${name}(${params})`
    },
    call(name, arg='') {
        return `${span('func-method-name', name)}(${arg})`
    },

    var(def = 'var', name, value) {
        if (value != undefined) {
            
            switch (value.constructor.name) {
                case 'Number':
                    value = span('number', value)
                    break
                case 'String':
                    value = `"${span('str-text', value)}"`
                    break
                case 'Boolean':
                    value = span('bool', value)
                    break
            }
        }

        def == 'const' ? name = span('const-name', name) : name = span('var-name', name)
        def = span('def', def)
        value==undefined? value='': value='= ' + value
        return `${def} ${name} ${value}`

    },
    useVar(name) {
        return span('var-name', name)
        
    },

    useConst(name) {
        return span('const-name', name)
    },

    numb(value=0) {
        return span('number', value)
    },

    str(value='') {
        return `"${span('str-text', value)}"`
    },

    bool(value = true) {
        return span('bool', value)
    },

    nVal(value) {
        return span('none-value', value)
    },

    op(name) {
        return span('statement', name)
    },
    templateStr(value) {
        return span('template-str', `´${span('str-text', value)}´`)
    },
    dollarFunc(value) {
        return `${span('dollar-func', '${' + value + '}')}`
    }
}

stringToCodeJs()







