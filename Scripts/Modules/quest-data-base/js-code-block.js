
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

const jsCodeBasic = {
    q3: `
    ${js.var('const', 'names')}= [${js.str('Jhon')}, ${js.str('Philip')}, ${js.str('Mary')}]
    ${js.useVar('console')}.${js.call('log', js.str('Olá, meu nome é ') + " + " + js.useVar('name') + '['+ js.numb(3) + ']')}`
}

export {jsCodeBasic}