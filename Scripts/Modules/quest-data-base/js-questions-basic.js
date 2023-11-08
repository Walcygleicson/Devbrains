import { codeBasic, frag } from "./js-code-block.js"

const jsBasic = {
    q0: {
        text: 'Quais das formas abaixo é a correta ao se declarar uma variável em Javascript?',
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
        text: 'Quais destes são considerados tipos de variáveis em JS?',
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
        text: `É correto afirmar que a declaração ${frag('const')} serve para:`,
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
        text: 'Qual a saída correta do seguinte trecho de código?',
        code: codeBasic.q3,
        options: {
            a: 'Olá, meu nome é Mary',
            b: 'Olá, meu nome é Jhon, Philip, Mary',
            c: 'Olá, meu nome é undefined',
            d: 'Erro no console'
        },
        correct: 'c'
    },
    q4: {
        text: 'Qual a saída correta do seguinte trecho de código?',
        code: codeBasic.q4,
        options: {
            a: 'Erro no console: TypeError',
            b: '28',
            c: '"10"',
            d: '"235"'
        },
        correct: 'd'
    },
    q5: {
        text: `Qual a diferença entre as declarações ${frag('let')}, ${frag('var')} e ${frag('const')} em Javascript?`,
        code: null,
        options: {
            a: 'var: escopo global - let: escopo de função - const: escopo de bloco',
            b: 'var: escopo de bloco - let: escopo de bloco e pode ser declarada novamente - const: escopo de global e não pode ser declarada novamente',
            c: 'var: escopo global ou de função - let: escopo de bloco - const: escopo de bloco e não pode ser reatribuída',
            d: 'var: escopo local e de bloco - let: escopo de bloco - const: escopo global e não pode ser reatribuída'
        },
        correct: 'c'
    },
    q6: {
        text: 'O que são Arrays em Javascript?',
        code: null,
        options: {
            a: 'São "listas de objetos" que podem armazenar vários valores de diferentes tipos podendo ser acessados por seus índices',
            b: 'São "listas de objetos" que podem armazenar vários valores de diferentes tipos podendo ser acessados por suas chaves',
            c: 'São "listas de elementos" que podem armazenar vários elementos podendo ser acessados por seus id ou class names',
            d: 'Nenhuma das alternativas acima'
        },
        correct: 'a'
    },

    q7: {
        text: 'Não são operadores Javascript:',
        code: null,
        options: {
            a: '%, &&, *, ++',
            b: '+, --, >=, ||',
            c: '!, **, <=, +=',
            d: '===, =>, //, ?'
        },
        correct: 'd'
    },

    q8: {
        text: 'Qual a saída correta do seguite trecho de código?',
        code: codeBasic.q8,
        options: {
            a: 'C',
            b: 'D',
            c: 'B',
            d: 'B e C'
        },
        correct: 'c'
    },

    q9: {
        text: 'O que o método ' + frag('window.alert()') + ' faz?',
        code: null,
        options: {
            a: 'Mostra uma mensagem de alerta no console do navegador',
            b: 'Mostra uma caixa de diálogo modal com um aviso e um botão de OK',
            c: 'Aponta um erro de código e dispara um alerta',
            d: 'Mostra uma caixa de diálogo modal com um campo para o usuário digitar algo'
        },
        correct: 'b'
    },

    q10: {
        text: 'Qual das formas abaixo é a correta para se obter um elemento HTML?',
        code: null,
        options: {
            a: 'const elemento = document.getElementById("#button")',
            b: 'var elemento = window.getElementById("button")',
            c: 'const elemento = document.querySelector("#button")',
            d: 'let elemento = document.getElementById(".button")'
        },
        correct: 'c'
    },
    
    q11: {
        text: 'Como adicionar um comentário em Javascript?',
        code: null,
        options: {
            a: '// Exemplo de comentário',
            b: '&lt;!-- Exemplo de comentário --&gt;',
            c: '# Exemplo de comentário',
            d: '/** Exemplo de comentário */'
        },
        correct: 'a'
    },
    q12: {
        text: 'Qual a saída correta do seguinte trecho de código?',
        code: codeBasic.q12,
        options: {
            a: 'null',
            b: 'undefined',
            c: 'Erro no console',
            d: 'Não imprime nada'
        },
        correct: 'b'
    },

    q13: {
        text: 'Marque a saída correta do seguinte trecho de código',
        code: codeBasic.q13,
        options: {
            a: '[3, 0, 1.8, 9, 10]',
            b: '[0, 10, 1.8, 9, 10]',
            c: '[3, 1.8, 9]',
            d: '[3, 0, 1.8, 9]'
        },
        correct: 'a'
    },

    q14: {
        text: 'O que são laços de repetição em Javascript?',
        code: null,
        options: {
            a: 'Estruturas condicionais encadeadas e aninhadas',
            b: 'Estruturas que executam em loop uma instrução ou bloco de instruções',
            c: 'Executa uma instrução ou bloco de instruções sempre que for chamada',
            d: 'Estruturas que reiniciam a leitura dos scripts em Javascript'
        },
        correct: 'b'
    },

    q15: {
        text: 'Marque a alternativa correta para o seguinte trecho de código',
        code: codeBasic.q15,
        options: {
            a: 'Concatenação',
            b: 'Junção',
            c: 'Incremento',
            d: 'Decremento'
        },
        correct: 'a'
    },

    q16: {
        text: 'A função ' + frag('isNaN') + ' verifica se um valor não é um número e retorna um boolean. Marque a alternativa correta para a saída do seguinte trecho de código',
        code: codeBasic.q16,
        options: {
            a: 'true, false',
            b: 'false, false',
            c: 'true, true',
            d: 'false, true'
        },
        correct: 'd'
    },
    q17: {
        text: 'Marque a alternativa correta para se atribuir uma propriedade nova ao objeto abaixo.',
        code: codeBasic.q17,
        options: {
            a: 'myObject.sexo = "masculino"',
            b: 'myObject[2]["sexo"] = "masculino"',
            c: 'myObject.push(sexo: "masculino")',
            d: 'myObject["sexo"]: "masculino"'
        },
        correct: 'a'
    },

    q18: {
        text: 'Qual a forma correta de se declarar um objeto em Javascript?',
        code: null,
        options: {
            a: 'let obj = []',
            b: 'let obj = ()',
            c: 'let obj = {}',
            d: 'Nenhuma das alternativas acima.'
        },
        correct: 'c'
    },

    q19: {
        text: 'O que são funções em Javascript?',
        code: null, 
        options: {
            a: 'São comandos que executam uma determinada tarefa.',
            b: 'São pedaços de códigos que podem ser reutilizados várias vezes.',
            c: 'São repetições de uma tarefa.',
            d: 'São um tipo de laço de repetição que executam uma tarefa e retorna um valor.'
        },
        correct: 'b'
    },

    q20: {
        text: 'Marque a alterniva correta para o seguinte trecho de código.',
        code: codeBasic.q20,
        options: {
            a: 'Função de soma',
            b: 'Função anônima',
            c: 'Arrow function',
            d: 'Função imediata'
        },
        correct: 'c'
    },

    q21: {
        text: 'Para que serve a declaração ' + frag('return') + '?',
        code: null,
        options: {
            a: 'Retorna a execução de um bloco de código para o início.',
            b: 'Finaliza a execução de um loop e retorna para a execução normal do script.',
            c: 'Congela e execução de uma função até que esta retorne algum valor, então prossegue com a execução normal.',
            d: 'Finaliza a execução de uma função e especifica os valores que devem ser retonados para onde a função foi chamada.'
        },
        correct: 'd'
    },

    q22: {
        text: `Marque a alternativa correta que defina as declarações ${frag('if')}, ${frag('else if')} e ${frag('else')}.`,
        code: null,
        options: {
            a: 'Verifica se uma condição é verdadeira - Verifica se uma nova condição é verdadeira se a anterior for falsa - Verifica se uma condição é verdadeira se todas as anteriores forem falsas',
            b: 'Verifica se uma condição é verdadeira - A condição else if não existe neste contexto - Verifica se uma condição é verdadeira se todas as anteriores forem falsas',
            c: 'Verifica se uma condição é verdadeira - Verifica se uam condição é verdadeira somente se os ifs forem falsos - Verifica se uma condição é verdadeira se todas as anteriores forem falsas',
            d: 'Verifica se uma condição é verdadeira - Verifica se uma condição é verdadeira se a anterior for falsa - Verifica se uma condição é verdadeira somente se o else if anterior for falso.'
        },
        correct: 'a'
    },

    q23: {
        text: 'O que são parâmetros de uma função?',
        code: null,
        options: {
            a: 'Variáveis declaradas na definição da função e que recebem argumentos, sendo eles opcionais ou obrigatórios.',
            b: 'Variáveis declaradas que só podem ser acessadas de dentro da função.',
            c: 'Variáveis que permitem pasar valores para dentro da função.',
            d: 'Todas as alternativas acima.'
        }
    },

    q24: {
        text: 'Qual a saída correta para o seguinte trecho de código?',
        code: codeBasic.q24,
        options: {
            a: 'Hello, world!',
            b: 'Bom dia!',
            c: 'Boa tarde!',
            d: 'Boa noite!'
        },
        correct: 'c'
    }

}


export {jsBasic}