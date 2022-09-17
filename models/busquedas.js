const axios = require('axios');
const fs = require('fs');
const archivo = './db/data.json';

class Busquedas {

    historial = [];
    historial2 = [];

    constructor() {
        this.historial = [];
        
    }

    

    get paramsMapbox() {

        return {
            'limit': '5',
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY,
        }

    }

    get listHistorial(){
        return this.historial;
    }

    paramsOpenWeather(lat, lng) {

        return {
            'lat': lat,
            'lon': lng,
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async lugar(lugar = '') {

        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get();

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name_es,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (err) {

            return [];

        }

    }

    async clima(lat, lng) {

        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: this.paramsOpenWeather(lat,lng)
            })

            const { data } = await instance.get();

            return {

                tiem: data.weather[0].description,
                temp: data.main.temp,
                min: data.main.temp_min,
                max: data.main.temp_max,
                vien: data.wind.speed,
            }

        } catch (err) {

            return {

                tiem: '',
                temp: '',
                min: '',
                max: '',
                vien: '',
            }

        }
    }

    agregarHistorial( lugar = '' ){

        

        if(this.historial.includes(lugar)){

            return this.historial;

        } else {

            if(this.historial.length === 5){
                this.historial.shift()
            } 

            this.historial.push(lugar);
            fs.writeFileSync( archivo,JSON.stringify(this.historial) );
            return this.historial;

        }
        
    }

    leerBd = () => {
        if( !fs.existsSync(archivo) ) {
    
            return null;
            
        }
    
        const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    
        const data = JSON.parse( info )
    
        return data;
    }
    
}

module.exports = Busquedas;