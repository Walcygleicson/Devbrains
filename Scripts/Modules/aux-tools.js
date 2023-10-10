/**
 * 
 * @param {Element|String|Array[String| Element]} targets *O Elemento HTML ou seu Selector alvo que vai receber os eventos.*
 * * *Pode receber também um Array contendo Elementos, Selectors, ou ambos.*
 * 
 * @param {Callback} listener
 */
export function focusInOut(targets, listener) {
    let temp_text
    let isArray = true // indica se o argumento passado é um Array ou não.

    let all_ok = true
    // if (targets == null) {
    //     console.error('O valor do argumento é null.')
    // } else if (targets.parentNode == undefined && targets.constructor.name != 'Array') {
    //     console.error('Esperado um Elemento HTML.')
    // } else if(targets.parentNode || targets.constructor.name == 'Array'){
    //     all_ok = true
    // }

    function callbackInfs(i, evtName, act) {
        let e = {
                set: {
                    text(t){
                        if (t == undefined) {
                            return targets[i].innerText
                        }
                        return targets[i].innerText = t
                    },
                    toggleText(text, text_2) {
                        if (targets[i].innerText == text) {
                            if (text_2 == undefined) {
                                return targets[i].innerText = temp_text
                            }

                            return targets[i].innerText = text_2
                        } else {
                            return targets[i].innerText = text
                        }
                    }
            }
        }

        
       
        
        Object.defineProperties(e, {
            // Tipo do evento disparado.
            type: { value: evtName },
            // Referência binário aos eventos disparados, onde o primeiro estado (mouseleave) é 0 e o segundo (mouseover) é 1.
            act: { value: act },
            // Elemento alvo do evento disparado
            target: { value: targets[i] },
            // (Se o param targets recebe Array): Index do elemento alvo e tamanho do Array recebido.
            array: { value: {}, configurable:true },
            // Contéudo de texto do elemento alvo do evento disparado
            text: { value: targets[i].innerText },
            // HTMLCollection de elementos filhos do elemento alvo, se houver
            child: { value: targets[i].childElementCount ? targets[i].children : null },
            // Id do elemento alvo, se houver
            id: { value: targets[i].id ? targets[i].id : null },
            // Array contento os nomes de classe do elemento alvo
            class: { value: Object.freeze(targets[i].hasAttribute('class') ? targets[i].getAttribute('class').split(' ') : null) },
        })

        // Define as propriedades de e.array
        Object.defineProperties(e.array, {
            index: { value: i },
            length:{value: targets.length}
        })

        // Verifica se o argumento passado em (targets) não é um array e deleta uma propriedade
        if (!isArray) {
            delete e.array
        }

        return e
        
    }

    // Verifica se o argumento passado em targets é um HTMLElement.
    // Se sim, aloca-o em um Array
    if (targets != null && targets.parentNode || targets != null && targets.constructor.name == 'String') {
        targets = [targets]
        isArray = false
    }
    // TRATANDO OS EVENTOS
    if (all_ok) {
        
        for (let i = 0; i < targets.length; i++) {
            
            // Repete o loop até que todos os seletores sejam verificados e substituídos por seu elemento html. Evita que alguma string fique para trás e cause erro na adição do evento.
            while (true) {
                if (targets[i].constructor.name == 'NodeList') {
                    console.log('Node list encontrado no index ', i, targets[i])
                    targets = [...targets, ...targets[i]]
                    targets.splice(i, 1)
                }
                
                if (targets[i].constructor.name == 'String') {
                    targets = [...targets, ...document.querySelectorAll(targets[i])]
                    targets.splice(i, 1)
                } else {
                    break
                }
            }
            
        
            // Salva o innerText original do elemento caso ele for mudado atraves da prop e.set.toggleText
            const cond = temp_text == undefined ? targets[i].innerText : temp_text

        // Evento de entrar.
        targets[i].addEventListener("focusin", () => {
            temp_text = cond
            listener(callbackInfs(i, 'enter', 1))
        })
        
        // Evento de sair.
        targets[i].addEventListener("focusout", () => {
            listener(callbackInfs(i, 'exit', 0))
        })

    }   
    }
    
}


/**
 * Verifica se um número é inteiro (Int) ou decimal (Float) retornando.
 * 
 * @param {Number} number 
 */
// const _numberType = (number) => {
//     if (_type(number) == 'Number') {

//         if (Number.isInteger(number)) {
//             return 'Int'
//         } else {
//             return 'Float'
//         }
//     } else {
//         return console.error(`ERRO DE TIPO\n_numberType(1) >>> Param 1/1\nO argumento " ${number} " do tipo ${_type(number)} é inválido!\nEsperado o tipo Number`)
//     }
// }

/**
 * Retorna o tipo de um objeto.
 * 
 * @param {object} object O objeto a ser verificado
 * @returns {String}
 */
const _type = (obj) => {
    //Verifica se é um node element
    if (obj.nodeType != undefined) {
        return 'Element'
    }
    return obj.constructor.name
}


export const _domList = (arg) => {
    let elementList = [] // Guarda os elementos prontos e tratados.
    // Converte o arg em Array caso valor passado não for um.
    if (_type(arg) != 'Array' && _type(arg) != 'NodeList') {
        arg = [arg]
    } else if (_type(arg) == 'NodeList') {
        return [...arg]
    }


    arg.forEach((item, i) => {

        // Verificando os tipos de args passados.  
        switch (_type(item)) {
            case 'String':
                elementList.push(...document.querySelectorAll(arg[i]))
                break;
                
            case 'NodeList':
                elementList.push(...item)
                break;
            
            case 'Element':
                elementList.push(item)
                break;
            
            case 'Array':
                item.every((val) => {

                    if (_type(val) == 'String') {
                        return elementList.push(...document.querySelectorAll(val))
                    } else if (_type(val) == 'Element') {
                        return  elementList.push(val);
                    } else if (_type(val) == 'NodeList') {
                        return elementList.push(...val)
                    } else {
                        return console.warn(`ALERTA DE TIPO!\nO valor ${val} tipo ${_type(val)} é inválido neste escopo!\nEsperado tipo Selector | Element | NodeList\n***\nEste valor "${val}" será ignorado, considere corrigí-lo!`)
                    }
                })
                break

            case 'Object':
                const keys = Object.keys(item)
                keys.forEach((val) => {
                    if (_type(item[val]) == 'String') {
                        elementList.push(...document.querySelectorAll(item[val]))
                    } else if (_type(item[val]) == 'Element') {
                        elementList.push(item[val]);
                    } else if (_type(item[val]) == 'NodeList') {
                        elementList.push(...item[val])
                    } else if (_type(item[val] == 'Array')) {
                        //Verificando a prop que recebe Array
                        item[val].map((it) => {
                            if (_type(it) == 'String') {
                                elementList.push(...document.querySelectorAll(it))
                            } else if (_type(it) == 'Element') {
                                elementList.push(it)
                            } else if (_type(it) == 'Array') {
                                // Neste escopo o Array de conter apenas elementos html
                                for (const $itm of it) {
                                    _type($itm) == 'Element'? elementList.push($itm): console.warn(`ALERTA DE TIPO!\nO valor ${$itm} tipo ${_type($itm)} é inválido neste escopo!\nEsperado tipo Element\n***\nEste valor "${$itm}" será ignorado, considere corrigí-lo!`)
                                }
                            } else {
                                console.warn(`ALERTA DE TIPO!\nO valor ${it} tipo ${_type(it)} é inválido neste escopo!\nEsperado tipo Selector | Element | NodeList\n***\nEste valor "${it}" será ignorado, considere corrigí-lo!`)
                            }
                        })
                    } else {
                        console.warn(`ALERTA DE TIPO!\nO valor ${val} tipo ${_type(val)} é inválido\nEsperado tipo Selector | Element | NodeList\n***\nEste valor "${val}" será ignorado, considere corrigí-lo!`)
                    }
                })
                break
                
        }
    })

    
     return elementList
}


export const AUX = {
    replaceClassNames(element, className_a, className_b) {
        // Verifica se o arg passado é um elemento ou uma string seletor
        if (element.nodeType == undefined) {
            element = document.querySelector(element)
        }

        if (!element.classList.contains(className_a) && !element.classList.contains(className_b)) {
            element.classList.add(className_a)
        } else if (element.classList.contains(className_a) || element.classList.contains(className_b)) {
            element.classList.toggle(className_a)
            element.classList.toggle(className_b)
        }
    },

    /**
     * Alterna o a propriedade CSS display (in-line) de um elemento entre 'none' e 'block' sempre que for cahamada.
     * 
     * @param {HTMLElement | string} element O elemento HTML que deve receber a propriedade
     * @param {string} display_option **Opcional -** O valor da propriedade display. O padrão e 'block'. 
     */
    toggleDisplay(element, display_option = 'block') {
        if (element.constructor.name == 'String') {
            element = document.querySelector(element)
        }

        if (!element.checkVisibility()) {
            element.style.display = display_option
        } else {
            element.style.display = 'none'
        }
    },

    /**
     * **Insere um ou mais nós em outro elemento html.**
     * @param {Element|string_selector|object|NodeList|Array} parent_node O elemento que recebe os nós filhos.
     * @param {Element|string_selector|object|NodeList|Array} child_nodes O elemento (s) filho a ser inserido em parent_node
     */
    insertNodes(parent_node, child_nodes) {
        parent_node = _domList(parent_node)[0]
        child_nodes = _domList(child_nodes)
        child_nodes.forEach((el) => {
            parent_node.appendChild(el)
        })
    },
}




/**
 * 
 * @param {string} selector - Um seletor válido de um elemento HTML.
 * @param {int} index - O índice do elemento que deseja retornar | Este parâmetro só é funcional se o retorno for um Array de Elementos.
 * @returns {HTMLElement}
 */
export function $(selector, index) {
    selector = [...document.querySelectorAll(selector)]
    if (selector.length == 1) {
        if (index > 0) {
            console.warn(`ATENÇÃO!\n$(selector, index){}\nO param (index) é obsoleto quando o retorno é 1 único elemento!`)
        }
        return selector[0]
        
    } else {
        if (index > 0) {
            return selector[index]
        } else {
          return selector
        }
        
    }
}


/**
 * Cria e controla as props de uma chave 'connectKey' salva no localStorage da página.
 */
export const connectKey = {
    /**
     * Se não existir, cria a chave 'connectKey' e suas props.
     */
    create() {
        // Cria uma chave, se ela n existir
        if (localStorage.getItem('connectKey') == null) {
            localStorage.setItem('connectKey', JSON.stringify({user:null, keep:false}))
        }
    },

    /**
     * Configura as props *user*, e *keep* da chave *connectKey*
     * @param {string} user O nome do usuário conectado.
     * @param {boolean} keep Se o usuário deve se manter conectado ao sair da página.
     */
    set(user, keep) {
        let connect = JSON.parse(localStorage.getItem('connectKey'))
        console.log(connect)
        connect.user = user==undefined? connect.user: user
        connect.keep = keep==undefined ? connect.keep : keep
        localStorage.setItem('connectKey', JSON.stringify(connect))
    },

    /**
     * Obtém as props da chave *connectKey*
     * @param {string} value O valor que deseja obter.
     * 
     * @Obs Se nenhum parametro for passado, retorna um objeto de props.
     * @returns {object | string | boolean}
     */
    get(value) {
        if (value == undefined) {
            return JSON.parse(localStorage.getItem('connectKey'))
        } else {
            return JSON.parse(localStorage.getItem('connectKey'))[value]
        }
    },

    /**
     * Reseta as props da chave *connectKey* para o estado inicial padrão.
     */
    reset() {
        if (localStorage.getItem('connectKey') != null) {
            localStorage.setItem('connectKey', JSON.stringify({user:null, keep:false}))
        }
    }
    
}

/**
 * 
 * @param {string} stringElement O elemento em formato string a ser convertido em HTML
 * @returns {HTMLElement}
 */
export function stringToHtml(stringElement) {
    const DOMElement = new DOMParser().parseFromString(stringElement, 'text/html').body.children
    return DOMElement.length==1? DOMElement[0]:DOMElement

}

/**
 * Atualiza as propriedades existentes de um valor presente em locaStorage
 * @param {string} user A chave de um item presente em localStorage
 * @param {string | Number | object} values O valor ou valores de prorpiedades já existentes a serem atualizadas
 */
export function updateUser(user, values) {
    const get = JSON.parse(localStorage.getItem(user))
    if (values.constructor.name == 'Object') {

        Object.keys(values).forEach((key, i) =>{
            if (Object.keys(get).includes(key)) {
              get[key] = values[key]
            
            }  
        })
    }
    localStorage.setItem(user, JSON.stringify(get))
}


/**
 * Obtém um usuário do localStorage.
 * 
 * @param {string} user **Opcional**: O usuário que deseja obter. Se nenhum argumento for passado retorna o usuário presente em *localStorage >> connectKey*
 */
export function getUser(user=connectKey.get('user')) {
    return JSON.parse(localStorage.getItem(user))
        
}
