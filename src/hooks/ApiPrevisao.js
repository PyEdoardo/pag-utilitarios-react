import axios from "axios";

export class Tempo {

    constructor(dadosGeograficos, dadosTempo){
        let partesGeo = dadosGeograficos.data[0].display_name.split(',');
        this.cidade = partesGeo[0];
        this.pais = partesGeo[partesGeo.length -1];
        this.estado = partesGeo.find((p, i) =>
            i > 0 && i < partesGeo.length - 1 &&
            p !== this.cidade &&
            p.length <= 20 &&
            !p.includes('Região') &&
            !p.includes('Metropolitana') &&
            !p.includes('Region') &&
            !p.includes('Metropolitan') &&
            !p.includes('Zone') &&
            p !== this.pais
        );
        console.log(dadosTempo);
        this.dia;

        if (dadosTempo.data.current_weather.is_day === 0){
            this.dia = false; 
        } else {
            this.dia = true;
        }

        this.temperatura = dadosTempo.data.current_weather.temperature;
        this.velocidadeVento = dadosTempo.data.current_weather.windspeed;
    }

    getTemperatura() {
        return `${this.temperatura}°C`;
    }

    getDescricao() {
        const traducoes = {
            'clear sky': 'céu limpo',
            'few clouds': 'poucas nuvens',
            'scattered clouds': 'nuvens dispersas',
            'broken clouds': 'nublado',
            'shower rain': 'chuva passageira',
            'rain': 'chuva',
            'thunderstorm': 'tempestade',
            'snow': 'neve',
            'mist': 'névoa'
            };
        return traducoes[this.descricao] || this.descricao;
    }

    getIconeURL() {
        return `https://openweathermap.org/img/wn/${this.icone}@2x.png`;
    }
}

export const getPrevisaoDoTempo = async (cidade) => {
    try {
        const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${cidade}&format=json&limit=1`;
        const geoResponse = await axios.get(geocodingUrl);

        if (geoResponse.data.length === 0) return;
        
        const { lat, lon } = geoResponse.data[0];

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&current_weather=true&forecast_days=1`;
        const weatherResponse = await axios.get(weatherUrl);

        const prev = new Tempo(geoResponse, weatherResponse);

        return prev;
    } catch (error) {
        console.error('Ocorreu um erro:', error.message);
        if (error.response) {
            console.error('Detalhes do erro da API:', error.response.data);
        }
    }
}