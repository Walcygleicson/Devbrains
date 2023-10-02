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


export const AUX = {
    toggleClassNames(element, className_a, className_b){
        if (!element.classList.contains(className_a) && !element.classList.contains(className_b)) {
            element.classList.add(className_a)
        } else if (element.classList.contains(className_a) || element.classList.contains(className_b)) {
            element.classList.toggle(className_a)
            element.classList.toggle(className_b)
        }
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
