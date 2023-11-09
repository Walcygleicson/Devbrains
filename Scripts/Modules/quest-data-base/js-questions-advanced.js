
import { frag, codeAdvanced} from "./js-code-block.js"

const jsAdvanced = {
    q0: {
        text: 'Em JavaScript o que é uma função callback?',
        code: null,
        options: {
            a: 'Função que retorna outra função.',
            b: 'Função que recebe outra função como argumento de um parâmetro e a executa internamente.',
            c: 'Função passada a outra função como argumento, que é então invocado dentro da função externa.',
            d:'Função não nomeada e que é executada uma vez no momento de sua criação. Não pode ser invocada posteriormente.'
        },

        correct: 'c'
    },

    q1: {
        text: 'O que é uma Promisse em JavaScript?',
        code: null,
        options: {
            a: 'Operador resposável por executar uma função ou bloco de instrução assim que toda a página for carregada.',
            b: 'Permite atribuir atrasos em um loop' + frag(' while') + ' que normalmente não espera o fim de execuções internas.',
            c: 'Função que espera o retorno de outra função passada como argumento e retorna true indicando que a função passada terminou sua execução.',
            d:'Um objeto que representa a eventual conclusão ou falha de uma operação assíncrona.'
        },

        correct: 'd'
    },

    q2: {
        text: 'Qual operador é utilizado para esperar por uma Promisse e só pode ser usado dentro de uma função assíncrona?',
        code: null,
        options: {
            a: 'await',
            b: 'assync',
            c: 'then',
            d:'yield'
        },

        correct: 'a'
    },

    q3: {
        text: 'O que são Módulos JavaScript?',
        code: null,
        options: {
            a: 'São fragmentos de códigos JavaScript que podem ser usados dentro de um arquivo html através da tag' + frag(' &lsaquo;module&rsaquo;') + ' .',
            b: 'São arquivos JavaScript que tem a capacidade de exportar e importar informações de outros arquivos do mesmo tipo.',
            c: 'Também conhecidos como Decoradores tem a capacidade de atribuir uma nova funcionalidade a uma função já existente.',
            d:'Permite importar propriedades de um objeto e usar em outro objeto sem a necessidade de repertir o mesmo código.'
        },

        correct: 'b'
    },

    q4: {
        text: 'Marque a alternativa correta para o seguinte trecho de código.',
        code: codeAdvanced.q4,
        options: {
            a: 'Generator Function',
            b: 'Factory Function',
            c: 'Função Imediata',
            d:'Sintaxe não existem em JS.'
        },

        correct: 'a'
    },

    q5: {
        text: 'O que é um Generator Function ou também conhecido como Iterator em JavaScript?',
        code: null,
        options: {
            a: 'Uma maneira mais simplificada de criar classes em JavaScript, sendo uma função que retorna uma lista de propriedades e métodos.',
            b: 'Função que gera valores pseudo aleatórios tanto numéricos quanto ASCII.',
            c: 'Uma função que oferece o método' + frag(' next() ') + 'o qual retorna o próximo item da sequência. Este método retorna um objeto com duas propriedades: done e value.',
            d:'Função construtora que retorna a si mesmo com o operador' + frag(' new ') + '.'
        },

        correct: 'c'
    },

    q6: {
        text: 'Marque a alternativa correta para o seguinte trecho de código.',
        code: codeAdvanced.q6,
        options: {
            a: 'Imprime um número decimal multiplicado por 10.',
            b: 'Imprime todos os número inteiros entre 0 e 10.',
            c: 'Imprime um número aleatório entre 0 e 10.',
            d:'Imprime um número inteiro aleatório entre 0 e 10.'
        },

        correct: 'd'
    },

    q7: {
        text: 'Teste Teste Teste?',
        code: null,
        options: {
            a: 'Teste',
            b: 'Teste',
            c: 'Teste',
            d:'Teste'
        },

        correct: 'a'
    },

    q8: {
        text: 'Teste Teste Teste?',
        code: null,
        options: {
            a: 'Teste',
            b: 'Teste',
            c: 'Teste',
            d:'Teste'
        },

        correct: 'a'
    },

    q9: {
        text: 'Teste Teste Teste?',
        code: null,
        options: {
            a: 'Teste',
            b: 'Teste',
            c: 'Teste',
            d:'Teste'
        },

        correct: 'a'
    },

    q10: {
        text: 'Teste Teste Teste?',
        code: null,
        options: {
            a: 'Teste',
            b: 'Teste',
            c: 'Teste',
            d:'Teste'
        },

        correct: 'a'
    },

    q11: {
        text: 'Teste Teste Teste?',
        code: null,
        options: {
            a: 'Teste',
            b: 'Teste',
            c: 'Teste',
            d:'Teste'
        },

        correct: 'a'
    },

    q12: {
        text: 'Teste Teste Teste?',
        code: null,
        options: {
            a: 'Teste',
            b: 'Teste',
            c: 'Teste',
            d:'Teste'
        },

        correct: 'a'
    },

    q13: {
        text: 'Teste Teste Teste?',
        code: null,
        options: {
            a: 'Teste',
            b: 'Teste',
            c: 'Teste',
            d:'Teste'
        },

        correct: 'a'
    },

    q14: {
        text: 'Teste Teste Teste?',
        code: null,
        options: {
            a: 'Teste',
            b: 'Teste',
            c: 'Teste',
            d:'Teste'
        },

        correct: 'a'
    },

    q15: {
        text: 'Teste Teste Teste?',
        code: null,
        options: {
            a: 'Teste',
            b: 'Teste',
            c: 'Teste',
            d:'Teste'
        },

        correct: 'a'
    },

    q16: {
        text: 'Teste Teste Teste?',
        code: null,
        options: {
            a: 'Teste',
            b: 'Teste',
            c: 'Teste',
            d:'Teste'
        },

        correct: 'a'
    },

    q17: {
        text: 'Teste Teste Teste?',
        code: null,
        options: {
            a: 'Teste',
            b: 'Teste',
            c: 'Teste',
            d:'Teste'
        },

        correct: 'a'
    },

    q18: {
        text: 'Teste Teste Teste?',
        code: null,
        options: {
            a: 'Teste',
            b: 'Teste',
            c: 'Teste',
            d:'Teste'
        },

        correct: 'a'
    },

    q19: {
        text: 'Teste Teste Teste?',
        code: null,
        options: {
            a: 'Teste',
            b: 'Teste',
            c: 'Teste',
            d:'Teste'
        },

        correct: 'a'
    },
    
}

export {jsAdvanced}