
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
    },

    consoleLog(value) {
        return `${span('var-name', 'console')}.${span('func-method-name', 'log')}(${value})`
    }
}


const codeBasic = {
    q3: `
    ${js.var('const', 'names')}= [${js.str('Jhon')}, ${js.str('Philip')}, ${js.str('Mary')}]
    ${js.useVar('console')}.${js.call('log', js.str('Olá, meu nome é ') + " + " + js.useVar('names') + '[' + js.numb(3) + ']')}`,
    
    q4: `
    ${js.var('const', 'soma')}= ${js.str(2) + ' + ' + js.numb(3) + ' + ' + js.numb(5) }
    ${js.useVar('console')}.${js.call('log', js.useConst('soma'))}
    `,


    q8: `
    ${js.var('const', 'name', 'Maria')
    + '\n    ' +
    js.var('let', 'idade', 18)
    }

    ${js.op('if')}(${js.useConst('name') + ' == ' + js.str('Maria') + ' && ' + js.useVar('idade') + ' > ' + js.numb(18)}){
        ${js.useVar('console')+'.'+js.call('log', js.str('A'))}
    }${js.op('else if')}(${js.useConst('name') + ' != ' + js.str('Maria') + ' || ' + js.useVar('idade') + ' >= ' + js.numb(18)}){
        ${js.useVar('console')+'.'+js.call('log', js.str('B'))}
    }${js.op('else if')}(${js.useConst('name') + ' == ' + js.str('Maria') + ' && ' + js.useVar('idade') + ' == ' + js.numb(18)}){
        ${js.useVar('console')+'.'+js.call('log', js.str('C'))}
    }${js.op('else')}{
        ${js.useVar('console')+'.'+js.call('log', js.str('D'))}
    }
    `,

    q12: `
    ${js.var('var', 'foo')}
    ${js.consoleLog(js.useVar('foo'))}
    `,

    q13: `
    ${js.var('var', 'arr')}= [${js.numb(3) + ', ' + js.numb(10) + ', ' + js.numb(1.8) + ', ' + js.numb(9)}]
    ${js.useVar('arr')}[${js.numb(1)}] = ${js.numb()}
    ${js.useVar('arr')}.${js.call('push', js.numb(10))}

    ${js.consoleLog(js.useVar('arr'))}
    `,

    q15: `
    ${js.var('var', 'mes', 12)}
    ${js.var('var', 'texto')}= ${js.str('Nós estamos no mês')} + ${js.useVar('mes')}`,

    q16: `
    ${js.consoleLog(js.call('isNaN', js.str('5')))}
    ${js.consoleLog(js.call('isNaN', js.str('1,5')))}`
}

export function frag(content) {
    return `<code class="frag">${content}</code>`
}

export {codeBasic}