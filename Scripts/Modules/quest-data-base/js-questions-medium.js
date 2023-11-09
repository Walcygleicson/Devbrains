import { frag } from "./js-code-block.js"
import { codeMedium } from "./js-code-block.js"

const jsMedium = {
    q0: {
        text: 'O que é um Operador Condicional Ternário em JavaScript?',
        code: null,
        options: {
            a: 'É o nome dado às operações executadas com ' + frag('switch case') + '.',
            b: 'Operador JavaScript que possui três operações em uma linha. Este operador é um atalho para a instrução ' + frag('if') + ' e ' + frag('else') + '.',
            c: `São denominados Condicionais Ternárias os operadores ${frag('&&')} (e) e ${frag('||')} (ou) em JavaScript.`,
            d:'Qualquer condição que use os operadores de cálculo.'
        },

        correct: 'b'
    },

    q1: {
        text: 'Marque a alternativa correta para a sáida do seguinte trecho de código.',
        code: codeMedium.q1,
        options: {
            a: 'Bloqueado',
            b: 'Liberado',
            c: 'True',
            d:'False'
        },

        correct: 'a'
    },

    q2: {
        text: 'Marque a alternativa correta para o seguinte trecho de código.',
        code: codeMedium.q2,
        options: {
            a: 'Trata-se de uma operação Spread',
            b: 'Trata-se de uma condição binária',
            c: 'Trata-se de uma condição ternária',
            d:'Trata-se de uma condição imediata'
        },

        correct: 'c'
    },

    q3: {
        text: 'O que é um Operador Spread?',
        code: null,
        options: {
            a: 'Operador que permite verificar se valores numéricos são do tipo inteiro ou decimal',
            b: 'Permite espalhar valores de um objeto iterável, como um Array em outro',
            c: 'Permite percorrer um objeto não iterável',
            d:'Permite reorganizar um Array por ordem crescente ou decrescente'
        },

        correct: 'b'
    },

    q4: {
        text: 'Qual é a saída para o seguinte trecho de código?',
        code: codeMedium.q4,
        options: {
            a: '[0, 1, 2, 3, [2, 4, 6, 8]]',
            b: '[0, 1, 2, 3, 4, 6, 8]',
            c: '[0, 1, 3]',
            d:'[0, 1, 2, 3, 2, 4, 6, 8]'
        },

        correct: 'd'
    },

    q5: {
        text: 'O que é o ECMAScript?',
        code: null,
        options: {
            a: 'Um conjunto de ferramentas usadas para adaptar navegadores às novas atualizações do JavaScript.',
            b: 'O ECMAScript é a própria linguagem JavaScript e sua padronização.',
            c: 'É a documentação oficial de cada versão do JavaScript.',
            d:'É o nome dados às novas atualizações do JavaScript como, por exemplo, ES6..etc.'
        },

        correct: 'b'
    },

    q6: {
        text: 'O que significa um objeto ser iterável?',
        code: null,
        options: {
            a: 'Um objeto capaz de retornar seus membros um de cada vez.',
            b: 'Um objeto capaz de receber múltiplos valores.',
            c: 'Um objeto que não pode ser modificado, excluído ou receber novos valores.',
            d:'Um objeto que pode ser modificado, excluído ou receber novos valores.'
        },

        correct: 'a'
    },

    q7: {
        text: 'O que é um HTMLCollection em JavaScript?',
        code: null,
        options: {
            a: 'Uma coleção (Array) de clones de elementos que podem ser reaproveitados em outras partes do documento.',
            b: 'É uma coleção de atributos de um determinado elemento. Sendo possível obtê-los por métodos como, por exemplo, ' + frag('.qetAttribute()')+'.',
            c: 'Uma coleção genérica (Array) de elementos que podem ser acessados um a um com métodos como, por exemplo, ' + frag('.forEach()') + ' e/ou ' + frag('.map()') + '.',
            d:'Uma coleção genérica (Array) de elementos na ordem em que aparecem no documento e oferece métodos e propriedades para selecioná-los da lista.'
        },

        correct: 'd'
    },

    q8: {
        text: 'Qual a direfença entre os métodos ' + frag('forEach()') + ' e ' + frag('map()') + ' em JavaScript?',
        code: null,
        options: {
            a: `${frag('forEach()')} percore objetos iteráveis e executa uma função para cada elemento. ${frag('map()')} percorre apenas nodeList e HTMLCollection e executa uma dunção para cada elemento.`,
            b: `${frag('forEach()')} é capaz de percorrer Arrays e Strings e executa uma dada função para cada elemento. ${frag('map()')} faz o mesmo que o forEach, porém não é capaz de percorrer objetos do tipo string.`,
            c: `${frag('forEach()')} executa uma dada função em cada elemento de um array. ${frag('map()')} invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado.`,
            d:'Nenhuma das alternativas acima.'
        },

        correct: 'c'
    },

    q9: {
        text: 'Marque a alternativa correta para a saída do seguinte trecho de código.',
        code: codeMedium.q9,
        options: {
            a: '[Teste, 123, Olá]',
            b: 'Teste 123',
            c: 'Teste 123 Olá',
            d:'Teste 123 Olá undefined'
        },

        correct: 'b'
    },

    q10: {
        text: 'O que o método ' + frag('stopPropagation()') + ' faz?',
        code: null,
        options: {
            a: `Desabilita o evento de click em um ${frag('button')} ou ${frag('a href=""')}, impedindo que o usuário o use até que seja liberado.`,
            b: 'Remove um evento de um elemento passando como parâmetro o tipo de evento e a função que é executada.',
            c: 'Evita que um elemento que esteja escondido ou atrás de outro elemento dispare qualquer evento.',
            d:'Evita que o evento seja processado por outros elementos da hierarquia (elemento-pai, e elemento-filho) e se espalhe.'
        },

        correct: 'd'
    },

    q11: {
        text: 'Qual a função JavaScript é responsável por capturar eventos disparados na página?',
        code: null,
        options: {
            a: 'getEventListenner()',
            b: 'mouseEvent()',
            c: 'addEventListenner()',
            d: 'preventDefault()'
        },

        correct: 'c'
    },

    q12: {
        text: 'Marque a alternativa correta para a sáida do seguinte trecho de código.',
        code: codeMedium.q12,
        options: {
            a: '[999, 12, 4, 3, 0]',
            b: '[999, 12, 4, 999, 0]',
            c: '[3, 12, 4, 999, 0]',
            d:'Nenhuma das alternativas acima.'
        },

        correct: 'd'
    },

    q13: {
        text: 'O que o método ' + frag('replace()') + ' faz?',
        code: null,
        options: {
            a: 'Permite que você encontre todas as ocorrências de uma determinada sequência de caracteres em uma string e as substitua por outra sequência de caracteres especificada.',
            b: 'Permite que você encontre apenas a primeira ocorrência de uma determinada sequência de caracteres em uma string e as substitua por outra sequência de caracteres especificada.',
            c: 'Permite que você encontre todas as ocorrências de um determinado valor em um Array e as substitua por outro valor especificado',
            d:'Permite que você encontre apenas a primeira ocorrência de um determinado valor em um Array e as substitua por outro valor especificado'
        },

        correct: 'b'
    },

    q14: {
        text: 'O que é um método na programação?',
        code: null,
        options: {
            a: 'Determinam o comportamento dos objetos de uma classe ou propriedades de um objeto e são análogos a funções ou procedimentos da programação estruturada.',
            b: 'Quando uma propriedade de um objeto recebe uma função sem retorno esta se torna um método.',
            c: 'São funções que modificam as propriedades de um determinado objeto e retorna uma nova propriedade',
            d:'Nenhuma das alternativas acima.'
        },

        correct: 'a'
    },

    q15: {
        text: 'Qual método JavaScript adiciona um nó ao final da lista de filhos de um nó especificado?',
        code: null,
        options: {
            a: 'appendNode()',
            b: 'insertNode()',
            c: 'addChild()',
            d:'appendChild()'
        },

        correct: 'd'
    },

    q16: {
        text: 'Marque a alternativa correta para o seguinte trecho de código.',
        code: codeMedium.q16,
        options: {
            a: 'Remove o nó filho de seu pai e o adiciona em outro nó pai.',
            b: 'Apenas adiciona o nó filho em um nó pai',
            c: 'Adiciona um clone do nó filho em um nó pai.',
            d:'Insere o nó filho no início da lista de nós filhos de um nó pai.'
        },

        correct: 'a'
    },

    q17: {
        text: 'O que o método' + frag(' insertBefore() ') + 'faz?',
        code: null,
        options: {
            a: 'Insere um nó depois do nó de referência como um filho de um nó pai especificado.',
            b: 'Insere um valor em um Array antes do valor de referência especificado pelo seu index.',
            c: 'Insere uma propriedade em um Object antes da propriedade de referência especificado.',
            d:'Insere um nó antes do nó de referência como um filho de um nó pai especificado.'
        },

        correct: 'd'
    },

    q18: {
        text: 'Em JavaScript quando tentamos referenciar um nó usando um dos métodos como, por exemplo,' + frag(' getElementById() ') + 'e este nó não existe no documento qual tipo de valor nos é retornado?',
        code: null,
        options: {
            a: 'undefined.',
            b: 'null.',
            c: 'NaN.',
            d:'Reference Error.'
        },

        correct: 'b'
    },

    q19: {
        text: 'É correto afirmar que:',
        code: null,
        options: {
            a: 'Java e JavaScript são a mesma linguagem de programação',
            b: 'JavaScript é uma linguagem de scripts OOP. Seu código é executado apenas em browsers.',
            c: 'JavaScript é uma linguagem compilada de alta tipagem tendo sua sintaxe baseada na linguagem Java.',
            d:'JavaScript não é uma linguagem OOP, sendo utilizada apenas em estilização de páginas web.'
        },

        correct: 'b'
    },

    q20: {
        text: 'Qual método JavaScript é reponsável por dividir uma string em substrings e retorná-las em um Array?',

        code: null,
        options: {
            a: 'divide()',
            b: 'replace()',
            c: 'split()',
            d: 'slice()'
        },

        correct: 'c'
    },

    q21: {
        text: 'O que a função' + frag(' setTimeout()') + ' faz?',

        code: null,
        options: {
            a: 'Atrasa a execução de um trecho de código por um determinado período de tempo',
            b: 'Executa um determinado código repetidamente em um intervalo de tempo definido.',
            c: 'Define um tempo de espera para cada iteração de um loop for.',
            d: 'Executa um decremento em um objeto do tipo Number até que seu valor chegue a zero.'
        }
    }
    
}

export {jsMedium}