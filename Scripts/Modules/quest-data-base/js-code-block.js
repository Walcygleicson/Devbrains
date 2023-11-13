
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

    param(value) {
        return span('param', value)
    },
    this(prop) {
        prop==undefined? prop='': prop = '.'+span('var-name', prop)
        return span('this', 'this')+prop
    },

    case(value) {
        if (value.constructor.name == 'Number') {
            value = span('number', value)
        } else {
            value = `"${span('str-text', value)}"`
        }
        return span('statement', 'case ') + value + ':'
        
    },

    prop(name, value) {
        return span('var-name', name) + ': ' + value + ','
    },

    ternary(cond, _true, _false) {
        return cond + span('statement', '? ') + _true + span('statement', ': ') + _false
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
    ${js.consoleLog(js.call('isNaN', js.str('1,5')))}`,

    q17: `
    ${js.var('var', 'myObject')}= {
        ${js.useVar('nome') + ': ' + js.str('Pedro')},
        ${js.useVar('idade') + ': ' + js.numb(17)},
    }
    `,

    q20: `
    ${js.var('const', 'soma')}= (${js.param('val1') + ', ' + js.param('val2')})=>{
        ${js.op('return ') + js.useVar('val1') + ' + ' + js.useVar('val2')}
    }`,

    q24: `
    ${js.var('const', 'result', 0)}
    ${js.useConst('result')} = ${js.numb(1)+ ' + ' + js.str(3)}
    ${js.op('switch')}(${js.useConst('result')}){
        ${js.case(3)}
            ${js.consoleLog(js.str('Hello, world!'))}
            ${js.op('break')}
        ${js.case(4)}
            ${js.consoleLog(js.str('Bom dia!'))}
            ${js.op('break')}
        ${js.case('13')}
            ${js.consoleLog(js.str('Boa tarde!'))}
            ${js.op('break')}
        ${js.case(5)}
            ${js.consoleLog(js.str('Boa noite!'))}
            ${js.op('break')}
    }`
}

//MEDIUM
const codeMedium = {
    q1: `
    ${js.var('const', 'number', 5)}
    ${js.var('var', 'result')}= ${js.ternary(js.useConst('number') + ' > ' + js.numb(5), js.str('Liberado'), js.str('Bloqueado'))}
    ${js.consoleLog(js.useVar('result'))}`,

    q2: `
    ${js.var('const', 'number', 5)}
    ${js.var('var', 'result')}= ${js.ternary(js.useConst('number') + ' > ' + js.numb(5), js.str('Liberado'), js.str('Bloqueado'))}`,

    q4: `
    ${js.var('let', 'moreNumbers')}= [${js.numb(2)}, ${js.numb(4)}, ${js.numb(6)}, ${js.numb(8)}]
    ${js.var('let', 'numbers')}= [${js.numb(0)}, ${js.numb(1)}, ${js.numb(2)}, ${js.numb(3)}, ${js.op('...') + js.useVar('moreNumbers')}]
    ${js.consoleLog(js.useVar('numbers'))}`,

    q9: `
    ${js.function('test', 'arg1, arg2')}{
        ${js.consoleLog(js.useVar('arg1') + ', ' + js.useVar('arg2'))}
    }

    ${js.var('const', 'arr')}= [${js.str('Teste')}, ${js.numb(123)}, ${js.str('Olá')}]
    ${js.call('test', '...' + js.useConst('arr'))}
    `,

    q12: `
    ${js.var('var', 'array')}= [${js.numb(3)}, ${js.numb(12)}, ${js.numb(4)}, ${js.numb(3)}, ${js.numb(0)}]
    ${js.useVar('array')} = ${js.useVar('array')}.${js.call('replace', js.numb(3) + ', ' + js.numb(999))}
    ${js.consoleLog(js.useVar('array'))}`,

    q16: `
    ${js.var('const', 'child')}= ${js.useVar('document')}.${js.call('getElementById', js.str('element-child'))}
    ${js.var('const', 'parent')}= ${js.useVar('document')}.${js.call('getElementById', js.str('element-parent'))}
    ${js.useConst('parent')}.${js.call('appendChild', js.useConst('child'))}`
    
}


const codeAdvanced = {
    q4: `
    ${js.function(js.op('*') + 'foo')}{}`,

    q6: `
    ${js.var('var', 'choose')}= ${js.call('parseInt', js.useVar('Math') + '.' + js.call('random') + ' * ' + js.numb(10))}
    ${js.consoleLog(js.useVar('choose'))}`,

    q7: `
    ${js.function(js.op('*') + 'example')}{
        ${js.var('var', 'idx', 0)}
        ${js.op('while')}(${js.useVar('idx')} < ${js.numb(2)}){${js.op('yield') + js.useVar(' idx')}++}
    }

    ${js.var('var', 'iterator')}= ${js.call('example')}

    ${js.consoleLog(js.useVar('iterator') + '.' + js.call('next'))}
    ${js.consoleLog(js.useVar('iterator') + '.' + js.call('next'))}
    ${js.consoleLog(js.useVar('iterator') + '.' + js.call('next'))}`,

    q13: `
    ${js.var('const', 'myObj')}= {
        ${js.useVar('name')}: ${js.str('Luca')},
        ${js.useVar('age')}: ${js.numb(23)},
        ${js.useVar('gender')}: ${js.str('Male')}
    }
    
    ${js.useVar('Object')}.${js.call('keys', js.useConst('myObj'))}.${js.call('forEach', `(${js.param('item')})=>{
        ${js.consoleLog(js.useConst('myObj') + `[${js.useVar('item')}]`)}
    }`)}`,


    q14: `
    ${js.var('let', 'myProps')}= {}
    
    ${js.useVar('Object')}.${js.call('defineProperty', js.useVar('myProps') + ', ' + js.str('prop1') + ', ' + `{
        ${js.useVar('value')}: ${js.str('Olá')},
        ${js.useVar('writable')}: ${js.bool(false)},
        ${js.useVar('configurable')}: ${js.bool(false)}
    }`)}
    
    ${js.useVar('myProps')}.${js.useVar('prop1')} = ${js.numb(12)}
    ${js.op('delete')} ${js.useVar('myProps')}.${js.useVar('prop1')}
    
    ${js.consoleLog(js.useVar('myProps') + '.' + js.useVar('prop1'))}`

}



const codePro = {
    q1: `
    ${js.useVar('HTMLElement')}.${js.useConst('prototype')}.${js.useVar('myFn')} = ${js.function('', 'txt')}{
        ${js.op('return')} ${js.this('innerHTML')} = ${js.useVar('text')}
    }`,

    q2: `
    ${js.function('myFn')}{${js.op('return') + js.numb(' 0')}}
    ${js.consoleLog(js.useVar('myFn') + '.' + js.useVar('name'))}`,
    
    q9: `
    ${js.str('use strict')}
    
    ${js.useVar('x')} = ${js.numb(1.5)}`,


    q11: `
    ${js.op('(') + js.function('', 'x')}{${js.consoleLog(js.useVar('x'))}}${js.op(')(')}${js.numb(5) + js.op(')')}`,

    q13: `
    ${js.function('fn', 'x')}{
        ${js.consoleLog(js.useVar('x'))}
        ${js.call('fn', js.useVar('x'))}
    }

    ${js.call('fn', js.str('Hello'))}
    `,


    q16: `
    ${js.var('const', 'myEvents')}= {
        ${js.prop('foo', js.str('FOO'))}
        ${js.prop('event', js.function() + `{${js.consoleLog(js.numb(0))}}`)}
        ${js.prop('handleEvent', "()=>" + `{${js.consoleLog(js.numb(1))}}`)}
        ${js.prop('callback', js.function() + `{${js.consoleLog(js.numb(2))}}`)}
    }
    ${js.useVar('document')}.${js.call('querySelector', js.str('.btn'))}.${js.call('addEventListenner', js.str('click') + ', ' + js.useConst('myEvents'))}`,
    
    q17: `
    ${js.var('const', 'module')}= {
        ${js.prop('myNumb', js.numb('23'))}
        ${js.prop('myMethod', js.function() + `{
            ${js.op('return')} ${js.this('myNumb')}
        }`)}
    }
    
    ${js.var('const', 'foo')}= ${js.useVar('module')}.${js.useVar('myMethod')}
    ${js.var('const', 'bar')}= ${js.useVar('foo')}.${js.call('bind', js.useConst('module'))}
    ${js.consoleLog(js.call('bar'))}`
}

export function frag(content) {
    return `<code class="frag">${content}</code>`
}

export {codeBasic, codeMedium, codeAdvanced, codePro}