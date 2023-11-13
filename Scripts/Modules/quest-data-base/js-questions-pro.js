import { codePro, frag } from "./js-code-block.js"


const jsPro = {
    q0: {
        text: 'O que é um Prototype de um objeto em JavScript?',
        code: null,
        options: {
            a: 'É a classe construtora de todos os objetos JavaScript.',
            b: 'Última propriedade da hieraquia de propriedades de um nó.',
            c: 'Mecanismo pelo qual objetos JavaScript herdam recursos uns dos outros.',
            d:'Todo nó da arvore DOM de um documento possui um Prototype que especifica todas as informações que aquele nó oferece.'
        },

        correct: 'c'
    },

    q1: {
        text: 'Marque a alternativa correta para o seguinte trecho de código.',
        code: codePro.q1,
        options: {
            a: 'Atribuição de um novo método para elementos HTML que insere novo conteúdo de texto. Assim:' + frag(' element.myFn()') + '.',
            b: 'Atribuição de uma nova função no prototype de qualquer objeto que retorna um' + frag(' this') + '.',
            c: 'Atribuição de uma nova função no prototype de um objeto que insere novo conteúdo de texto: Assim:' + frag(' prototype.myFn()') + '.',
            d:'TypeError. Não é possível adicionar funcionalidades ao prototype de qualquer objeto em JavaScript.'
        },

        correct: 'a'
    },

    q2: {
        text: 'Marque a alternativa correta para a saída do seguinte trecho de código.',
        code: codePro.q2,
        options: {
            a: 'Function',
            b: 'myFn',
            c: '0',
            d:'Object'
        },

        correct: 'b'
    },

    q3: {
        text: 'O que é um objeto' + frag(' Blob') + '?',
        code: null,
        options: {
            a: 'Um tipo de dado usado em banco de dados.',
            b: 'Dar-se o nome Blob para a codificação de dados para base64 usando a função global' + frag(' btoa()') + '.',
            c: 'Um objeto literal nativo do JavaScript que possibilita guardar imagens como propriedades desse objeto.',
            d:'Um objeto semelhante a um arquivo de dados brutos imutáveis; eles podem ser lidos como texto ou dados binários, ou convertidos em um arquivo ReadableStream.'
        },

        correct: 'd'
    },

    q4: {
        text: 'Para que serve as funções globais' + frag(' btoa() ') + 'e' + frag(' atob()') + ' em JavaScript?',
        code: null,
        options: {
            a: frag('atob() ') + 'decodifica uma string de dados que foi codificada através da codificação base64,' + frag(' btoa() ') + 'Cria uma string ASCII codificada em Base64 a partir de uma string binária.',
            b: frag('atob() ') + 'Cria uma string ASCII codificada em Base64 a partir de uma string binária,' + frag(' btoa() ') + 'decodifica uma string de dados que foi codificada através da codificação base64.',
            c: frag('atob() ') + 'decodifica um arquivo de dados que foi codificada através da codificação base64,' + frag(' btoa() ') + 'Cria uma string ASCII codificada em Base64 a partir de um arquivo binária.',
            d:frag('atob() ') + 'decodifica dados em binário para o formato original,' + frag(' btoa() ') + 'Codifica dados de arquivos em binário.'
        },

        correct: 'a'
    },

    q5: {
        text: 'Qual interface fornece a capacidade de analisar o código-fonte XML ou HTML de uma string em um DOM Document?',
        code: null,
        options: {
            a: 'FileReader()',
            b: 'DOMParser()',
            c: 'DocumentFragment()',
            d: 'querySelector()'
        },

        correct: 'b'
    },

    q6: {
        text: 'Qual método JavaScript usar para converter uma string contento HTML em um HTMLDocument?',
        code: null,
        options: {
            a: 'parseFromString()',
            b: 'DOMParser()',
            c: 'encodeInto()',
            d: 'stringToHTML()'
        },

        correct: 'a'
    },

    q7: {
        text: 'Qual objeto permite que aplicativos da web leiam de forma assíncrona o conteúdo de arquivos (ou buffers de dados brutos) armazenados no computador do usuário?',
        code: null,
        options: {
            a: 'Fetch()',
            b: 'FileReader()',
            c: 'File()',
            d:'OpenFile()'
        },

        correct: 'b'
    },

    q8: {
        text: 'Qual o significado dos operadores' + frag(' << ')+ 'e'+ frag(' >> ') + 'em JavaScript?',
        code: null,
        options: {
            a: 'Bit menor que e bit maior que.',
            b: 'Deslocamento bit a bit para a esquerda e deslocamento bit a bit para a direita.',
            c: 'Maior que e menor que para valores binários.',
            d:'Nenhuma das alternativas. Esses operadores não existem em JavaScript.'
        },

        correct: 'b'
    },

    q9: {
        text: 'Marque a alternativa correta para o seguinte trecho de código.',
        code: codePro.q9,
        options: {
            a: 'TypeError, pois a string está fora de uma variável',
            b: frag('"use strict" ') + 'é uma diretiva que indica que todo o escopo do script será executado em modo estrito.',
            c: frag('"use strict" ') + 'é uma regra JavaScript que indica que toda variável daquele escopo pode ser usada sem antes ser declarada.',
            d: 'A variável' + frag(' x ') + 'não declarada é ignorada durante a execução e não pode ser invocada.'
        },

        correct: 'b'
    },

    q10: {
        text: 'O que é uma Função Imediata (IIFE) em JavaScript?',
        code: null,
        options: {
            a: 'É uma função que pode ser definida sem o uso da palavra reservada' + frag(' function ') + 'e, se ouver parâmetros, também sem o uso dos parênteses.',
            b: 'Função definida no parâmetro de outra função. É excutada ao mesmo tempo em que ocorre a execução da função que a recebe. ',
            c: 'Função definida dentro da propriedade construtora de um classe. Essa função não pode ser acessada de fora da classe.',
            d:'É uma função em JavaScript que é executada assim que definida.'
        },

        correct: 'd'
    },

    q11: {
        text: 'Marque a alternativa correta para o seguinte trecho de cógido.',
        code: codePro.q11,
        options: {
            a: 'Função Imediata.',
            b: 'Função Construtora.',
            c: 'Função Lambda.',
            d: 'Função Recursiva.'
        },

        correct: 'a'
    },

    q12: {
        text: 'Em JavaScript é possível chamar uma função dentro dela mesma?',
        code: null,
        options: {
            a: 'Sim, chama-se Recursividade.',
            b: 'Sim, chama-se Self-Invoking (autoinvocável)',
            c: 'Sim, porém somente como um argumento dela mesma.',
            d: 'Não, pois no momento da invocação dentro dela mesma a função ainda está não declarada.'
        },

        correct: 'a'
    },

    q13: {
        text: 'Marque a alternativa correta para o seguinte trecho de código.',
        code: codePro.q13,
        options: {
            a: 'A palavra "Hello" é imprimida uma vez no console e em seguida um erro é disparado.',
            b: 'A palavra "Hello" é imprimida duas vezes no console.',
            c: 'Apenas um erro é imprimido no console.',
            d:'A palavra "Hello" é imprimida infinitamente no console.'
        },

        correct: 'd'
    },

    q14: {
        text: 'Qual destes não é um framework JavaScript?',
        code: null,
        options: {
            a: 'Ember',
            b: 'Vue',
            c: 'Django',
            d: 'Angular'
        },

        correct: 'c'
    },

    q15: {
        text: 'Qual operador JS testa se um objeto tem, em seu prototype, a função construtora?',
        code: null,
        options: {
            a: 'typeof',
            b: 'isPrototypeOf',
            c: 'this',
            d:'instanceof'
        },

        correct: 'd'
    },

    q16: {
        text: 'Marque a alternativa correta para a saída do seguinte trecho de código.',
        code: codePro.q16,
        options: {
            a: '0',
            b: '1',
            c: '2',
            d:'typeError'
        },

        correct: 'b'
    },

    q17: {
        text: 'Marque a alternativa correta para o seguinte trecho de código.',
        code: codePro.q17,
        options: {
            a: 'A função'+ frag(' bind() ')+'extrai o código bruto do objeto "module", pois o método "myMethod" retona o próprio objeto.',
            b: 'A função' + frag(' bind() ') + 'cria uma nova função vinculada que encapsula o objeto da função original e então retorna o valor da propriedade "myNumb".',
            c: 'A função' + frag(' bind() ') + 'insere um pseudo parâmetro no método "myMethod" que é o próprio objeto de origem e então retorna as propriedades do objeto passado.',
            d:'Imprime o valor 23 no console, pois a const "foo" recebe o método "myMethod" que retona o valor de "myNumb" e a const "bar" a recebe e a executa como uma função.'
        },

        correct: 'b'
    },

    q18: {
        text: 'Quais palavras chaves são usadas para lidar com exceções em JavaScript?',
        code: null,
        options: {
            a: 'try, exception, throw e else',
            b: 'try, catch, throw e exception',
            c: 'try, catch, finally e throw',
            d: 'try, throw, else, catch e pass'
        },

        correct: 'c'
    },

    q19: {
        text: 'Para que serve as declarações' + frag(' try ') + 'e' + frag(' catch ') + 'em JavaScript?',
        code: null,
        options: {
            a: 'Marcam um bloco de declarações para testar. Se a execução em try falhar o bloco de instruções em catch é executado.',
            b: 'Usadas para fazer execuções assíncronas. As instruções em try fazem a requisição, enquanto as em catch esperam pela reposta.',
            c: 'Usado apenas para depuração de código. Instruções em try são depuradas e se houver erros as instruções em catch pausa a execução na linha.',
            d:'Usado para testar cáculos matemáticos onde os valores fornecidos são desconhecidos ou enviados pelo usuário. Instruções em try avaliam a lógica e se algum valor inesperado ou erro de cáculo surgir as instruções em catch as corrigirão.'
        },

        correct: 'a'
    },

    q20: {
        text: 'O que é uma Regex?',
        code: null,
        options: {
            a: 'Um padrão de busca utilizado na programação para verificar se determinada sequência de caracteres existe em uma string.',
            b: 'É um pattern usado em formulários para verificar se o padrão de um input está sendo garantido. Caso contrário uma caixa de alerta padrão é mostrada na tela.',
            c: 'Regex é um operador JavaScript usada para tranformar um padrão de carateres de uma string em operadores condicionais. Esses operadores servem para fazer testes lógicos especificados pelo programador.',
            d: 'Regex é uma interface JavaScript usada para manipular strings. Ela oferece métodos como' + frag(' subString()') + ',' + frag(' slice()') + ',' + frag(' repaceAll() ') + 'e etc..'
        },
        correct: 'a'
    }
    
}

export {jsPro}