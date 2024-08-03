const apiKey = "d03981c22e2604c06ea22ccac048e92d";

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cidade = document.querySelector('#cidade');
const bandeiraCidade = document.querySelector('#bandeiraPais');
const temperatura = document.querySelector('#temperatura span');
const descricao = document.querySelector('#descricao');
const descricaoIcon = document.querySelector('#icone_descricao');
const umidade = document.querySelector('#umidade span');
const vento = document.querySelector('#vento span');
const sensacaoTermica = document.querySelector('#sensacaoTermica span');

const dadosClima = document.querySelector ('#dadosClima');
const body = document.querySelector ('body');

// Funções
const recuperarDadosTempo = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const resposta = await fetch(apiWeatherURL);
    const dados = await resposta.json();
   
    return dados
}

const mostrarDadosTempo = async (city) => {
    const dados = await recuperarDadosTempo(city);
    console.log(dados);

    cidade.innerText = dados.name;
    bandeiraPais.setAttribute("src", `https://flagsapi.com/${dados.sys.country}/shiny/64.png`)
    temperatura.innerText = dados.main.temp;
    descricao.innerText = dados.weather[0]['description'];
    icone_descricao.setAttribute("src", `http://openweathermap.org/img/wn/${dados.weather[0]['icon']}@.png`)
    umidade.innerText = dados.main.humidity + "%";
    vento.innerText = dados.wind.speed + "km/h";
    sensacaoTermica.innerText = parseFloat(dados.main.feels_like);
    
    const indicadorCeu = dados.weather[0]['id'];
    
    //mudança do background pela condição climática
    if (indicadorCeu >= 801) {
        body.setAttribute("class", "nuvens");
    } else if (indicadorCeu >= 800) {
        body.setAttribute("class", "ceuLimpo");
    } else if (indicadorCeu >= 500 && indicadorCeu <= 531 ) {
        body.setAttribute("class", "chuva");
    } else if (indicadorCeu >= 200) {
        body.setAttribute("class", "tempestade");
    }
}


// Eventos
searchBtn.addEventListener("click", (e) => {

    e.preventDefault();

    const city = cityInput.value;


    mostrarDadosTempo(city);
    dadosClima.setAttribute("class", 'mt-4')
});