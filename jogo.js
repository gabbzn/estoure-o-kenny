// JavaScript Document by Gabbzn

// para clicar no botão de nível e recuperar o valor selecionado, devemos criar uma função 

// essa função serve para recuperar o valor do elemento "nivelJogo"

// inicio do jogo
var timerId = null; // variavel que armazena a chamada da função "timeOut"

function iniciaJogo(){
	// variavel criada para pegar o atributo
	var url = window.location.search;
	
	// variavel criada para mostrar somente o nível do jogo escolhido - a função replace serve para substituir um caractere
	var nivel_jogo = url.replace("?", "");
	
	var tempo_segundos = 0;
	
	if (nivel_jogo == 1) {// se o nível de jogo for igual a 1 facil - 120 segundos
		tempo_segundos = 120;
	}
	
	if (nivel_jogo == 2) {// se o nível de jogo for igual a 2 normal - 60 segundos
		tempo_segundos = 60;
	}
	
	if (nivel_jogo == 3) {// se o nível de jogo for igual a 3 dificil - 30 segundos
		tempo_segundos = 30;
	}
	
	//inserir os segundos no span, para recuperar as referências usaremos - o atributo innerHTML irá inserir um conteúdo dentro da tag
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	//quantidade de kenny
	var qtde_kenny = 80;

	cria_kenny (qtde_kenny);

	//imprimir qtde de kenny inteiros
	document.getElementById('kenny_inteiros').innerHTML = qtde_kenny;
	document.getElementById('kenny_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1)
}

	//contagem do cronometro - chamaremos essa função, na função "inicia jogo", seu parametro será "segundos"

	function contagem_tempo (segundos){

		// com estes parametros o cronometro solta
		segundos = segundos -1;

		//condição para o cronometro não seguir contato no negativo
		if(segundos == -1){
			clearTimeout(timerId); // com essa função, paramos a execução da função do settimeout
			// chamada da função de fim de jogo
			game_over();
			return false;
		}

		document.getElementById('cronometro').innerHTML = segundos;

		//criar uma função proxima a recursiva, iremos utilizar uma função jQuery, ela tem dois parametros - função + tempo em segundos
		// executa essa função a cada milisegundos = 1 segundo
		timerId = setTimeout("contagem_tempo("+segundos+")", 1000);

	}
	
	function game_over(){
		remove_eventos_baloes();
		alert('Fim de jogo, perdeu babaca!');
	}
	function cria_kenny(qtde_kenny){
		// utilizar laços de repetição
		// variável i vai ter que ser igual ou menor que a quantidade de balões
		for (var i = 1; i <= qtde_kenny; i++){

		// criando balões dentro do cenrário: variavel balao com o método DOM, assim conseguimos criar uma tag elemento dentro da nossa pag HTML
						var balao = document.createElement ("img");
						balao.src = 'imagens/kenny_pequeno.png';
						balao.style.margin = '12px';
						// para que
						balao.id = 'b'+i;
						// atribuir a chamada de um evento para estourar os kenny - this é uma referencia ao elemento em si
						balao.onclick = function(){estourar (this); }
		// a função appendchild ira colocar as imagens dentro da nossa DIV
						document.getElementById('cenario').appendChild(balao);

		}

	}
	
	//função para estourar, só com esta funnção, ira ocorrer somente o evento do click, necessario criar um id
	function estourar (e){

		//variavel que recupera o id de cada balao
		var id_balao = e.id;
		//removendo bug que fazia pontuação continuar mesmo com o kenny estourado - usando o setAttribute
		document.getElementById(id_balao).setAttribute("onclick","");
		document.getElementById(id_balao).src = 'imagens/kenny_pequeno_estourado.png';

		pontuacao (-1); // porque a cada clique eu terei menos um balao
	}

	//pontuação
	function pontuacao(acao){

		var kenny_inteiros = document.getElementById('kenny_inteiros').innerHTML;
		var kenny_estourados = document.getElementById('kenny_estourados').innerHTML; 

		kenny_inteiros = parseInt(kenny_inteiros);
		kenny_estourados = parseInt(kenny_estourados);

		kenny_inteiros = kenny_inteiros + acao;
		kenny_estourados = kenny_estourados - acao;
		
		// recupera a pontuação com os codigos acima
		document.getElementById('kenny_inteiros').innerHTML = kenny_inteiros;
		document.getElementById('kenny_estourados').innerHTML = kenny_estourados;

		situacao_jogo (kenny_inteiros);
		}

		function situacao_jogo(kenny_inteiros){
			if(kenny_inteiros == 0){
				alert('Parabéns, você venceu');
				parar_jogo();
			}
		}

function parar_jogo(){
	clearTimeout(timerId);
	}	

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}
