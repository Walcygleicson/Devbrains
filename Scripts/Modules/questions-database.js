import { jsCodeBasic } from "./quest-data-base/js-code-block.js"

const jsBasic = {
    q0: {
        text: 'Qual das formas abaixo é a correta ao se declarar uma variável em Javascript?',
        code: null,
        options: {
            a: 'var exemplo = "Hello World!"',
            b: 'exemplo dois = "Hello World!"',
            c: 'var exemplo == "Hello World!"',
            d: 'exemplo: string = "Hello World!"'
        },
        correct: 'a'
    },

    q1: {
        text: 'Quais deste são considerados tipos de variáveis em JS?',
        code: null,
        options: {
            a: 'String, List, Boolean, Int',
            b: 'Char, String, Number, Boolean',
            c: 'String, Number, Array, Object',
            d: 'String, Float, Dict, Array'
        },
        correct: 'c'
    },
    q2: {
        text: 'É correto afirmar que a declaração <code class="frag">const</code> serve para:',
        code: null,
        options: {
            a: 'Declarar variáveis de escopo global',
            b: 'Declarar variáveis que não podem ser reatibuídas',
            c: 'Declarar funções anônimas',
            d: 'Declarar variáveis com valores somente leitura para o usuário'
        },
        correct: 'b'
    },

    q3: {
        text: 'Qual a saída correta deste código?',
        code: jsCodeBasic.q3,
        options: {
            a: 'Olá, meu nome é Mary',
            b: 'Olá, meu nome é Jhon',
            c: 'Olá, meu nome é undefined',
            d: 'Erro de console'
        },
        correct: 'c'
    }
}


export {jsBasic}