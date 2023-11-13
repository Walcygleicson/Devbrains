
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
            c: 'Uma função que oferece o método' + frag(' next() ') + 'o qual retorna o próximo item da sequência a cada vez que for invocado. Este método retorna um objeto com duas propriedades: done e value.',
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
        text: 'Marque a alternativa correta para as saídas do seguinte trecho de código.',
        code: codeAdvanced.q7,
        options: {
            a: '{value: 0, done: false}, {value: 1, done: false}, {value: undefined, done: true}',
            b: '{value: 0, done: false}, {value: 1, done: false}, undefined',
            c: 'Não imprime nada pois a função não possui retorno.',
            d:'{value: 0, done: false}, {value: 1, done: false}, {value: 2, done: true}'
        },

        correct: 'a'
    },

    q8: {
        text: 'O que significa uma função ser assíncrona?',
        code: null,
        options: {
            a: 'Permite sincronizar uma função com a execução de outra função.',
            b: 'Permite sincronizar a execução de uma função com outra que está em outro aquivo ou máquina.',
            c: 'Permite esperar por um resultado de uma busca demorada para que suas instruções sejam executadas.',
            d:'Permite executar uma função imediatamente assim que esta é criada.'
        },

        correct: 'c'
    },

    q9: {
        text: 'Qual destes não é um método de requisição HTTP em JavaScript?',
        code: null,
        options: {
            a: 'REQUIRE',
            b: 'GET',
            c: 'POST',
            d:'CONNECT'
        },

        correct: 'a'
    },

    q10: {
        text: 'O que são Classes em JavaScript?',
        code: null,
        options: {
            a: 'Estrutura que permite criar uma única instância de diferentes objetos. Usa-se o operador' + frag(' new') + '.',
            b: 'Estrutura usada especificamente para definir características imutáveis de um objeto literal.',
            c: 'Estrutura que define um objeto com propriedades e métodos. Ela serve como um molde para criar objetos com características semelhantes.',
            d:'Estrutura que permite armazenas dados, propriedades e características de um determinado objeto literal para ser utilizado posteriormente.'
        },

        correct: 'c'
    },

    q11: {
        text: 'O que são métodos' + frag(' getter ') + 'e' + frag(' setter ') + ' em JavaScript?',
        code: null,
        options: {
            a: 'Um método getter retorna seu valor, enquanto um método setter o define ou atualiza.',
            b: 'Um método getter define ou atualiza seu valor, enquanto um método setter retorna seu valor',
            c: 'Um método getter retorna seu valor, enquanto um método setter reseta seu valor para o estado inicial.',
            d:'Um método getter serve para acessar um valor imutável, enquanto um método setter o define um valor imutável.'
        },

        correct: 'a'
    },

    q12: {
        text: 'Qual é o método estático que define ou modifica uma propriedade diretamente em um objeto?',
        code: null,
        options: {
            a: 'Object.create()',
            b: 'Object.keys()',
            c: 'Object.defineProperty()',
            d:'Object.prototype.constructor'
        },

        correct: 'c'
    },

    q13: {
        text: 'Marque a alternativa correta para o seguinte trecho de código.',
        code: codeAdvanced.q13,
        options: {
            a: 'Luca, 23, Male',
            b: 'name, age, gender',
            c: '{name: "Luca"}, {age: 23}, {gender: "Male"}',
            d:'Erro no console.'
        },

        correct: 'a'
    },

    q14: {
        text: 'Marque a alternativa correta para o seguinte trecho de código.',
        code: codeAdvanced.q14,
        options: {
            a: 'Imprime undefined, pois a única propriedade definida foi deletada no código.',
            b: 'Imprime "Olá", pois a propriedade não pode ser deletada ou seu valor reescrito.',
            c: 'Imprime 12, pois o valor de uma propriedade de um objeto definido com' + frag(' let ') + 'é sempre mutável e o operador' + frag(' delete ') + 'não deleta propriedades.',
            d:'Imprime TypeError, pois o valor de uma propriedade definida com' + frag(' writable: false ') + 'e' + frag(' configurable: false ') + 'não pode ser reescrita e nem deletada. '
        },

        correct: 'd'
    },

    q15: {
        text: 'Qual a diferença entre' + frag(' localStorage ') + 'e' + frag(' sessionStorage') + '?',
        code: null,
        options: {
            a: 'localStorage os dados não tem tempo de expiração, sessionStorage os dados são apagados quando a página é fechada.',
            b: 'localStorage os dados são armazenados localmente, sessionStorage os dados são armazenados no servidor.',
            c: 'localStorage os dados não tem tempo de expiração, sessionStorage os dados expiram caso uma data e hora de expiração seja definida.',
            d:'localStorage os dados são armazenados no navegador do cliente, sessionStorage os dados são armazenados em bancos de dados externos.'
        },

        correct: 'a'
    },

    q16: {
        text: 'Um objeto literal é composto por um par de chaves ({}) que envolve algumas propriedades. Sabemos que é possivel converter números em strings e vice-versa. Dito isso, é possível converter um objeto literal inteiro em uma string?',
        code: null,
        options: {
            a: 'Não. Somente os valores das propriedades podem ser convertidos.',
            b: 'Sim. Usando o método' + frag(' Object.toString()') + '.',
            c: 'Sim. Usando o método' + frag(' JSON.parse()') + '.',
            d: 'Sim. Usando o método' + frag(' JSON.stringify()') + '.'
        },

        correct: 'd'
    },

    q17: {
        text: 'É possível armazenar imagens em localStorage do navegador?',
        code: null,
        options: {
            a: 'Não. É possível apenas armazenar uma URL ou o caminho da imagem.',
            b: 'Sim. Usando o método' + frag(' localStorage.setItem() ') + 'junto com a URL da imagem.',
            c: 'Sim. Porém antes a imagem deve ser convertida em base64 usando o' + frag(' new FileReader()') + '.',
            d:'Sim. Porém antes a imagem deve ser comprimida em uma arquivo .zip.'
        },

        correct: 'c'
    },

    q18: {
        text: 'Para que serve o operador' + frag(' new ') + 'em JavScript?',
        code: null,
        options: {
            a: 'Cria uma instancia de um tipo de objeto que possua uma função construtora.',
            b: 'Serve apenas para criar uma instância de uma classe definida pelo usuário.',
            c: 'Permite que os métodos e propriedades de uma classe sejam acessadas.',
            d:'Inicializa uma classe e invoca suas propriedades que foram definidas usando o operador' + frag(' this') + '.'
        },

        correct: 'a'
    },

    q19: {
        text: 'O que é o Fetch API?',
        code: null,
        options: {
            a: 'Uma API JavaScript para manipulação de dados de imagem, audio e vídeo.',
            b: 'Uma interface JavaScript moderna para fazer requisições HTTP/HTTPS de forma assíncrona',
            c: 'Fecth é uma função JavaScript usada para conectar-se com um servidor.',
            d:'Uma API JavaScript usada na criação de servidores e conexão entre clientes.'
        },

        correct: 'b'
    },
    
}

export {jsAdvanced}