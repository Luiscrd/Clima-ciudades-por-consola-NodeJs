require('dotenv').config()
const { leerInput, inquiereMenu, pausa, listadoLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

require('colors');

const main = async () => {

    const busquedas = new Busquedas();

    busquedas.historial = busquedas.leerBd();


    let opt = '';

    do {

        opt = await inquiereMenu();

        switch (opt) {

            case 1:

                const lugar = await leerInput('¿Qué ciudad/lugar desea buscar?');

                const lugares = await busquedas.lugar(lugar);

                const idSelec = await listadoLugares(lugares);

                if (idSelec !== 0) {

                    const lugarSeleccionado = lugares.find( l => l.id === idSelec);


                    const lugaresBuscados = busquedas.agregarHistorial(lugarSeleccionado);


                    const { nombre, lng, lat } = lugarSeleccionado;

                    const clima =  await busquedas.clima(lat,lng);

                    const { tiem, temp, min, max, vien } = clima;

                    let lati = `${lat}.`.green;
                    let longi = `${lng}.`.green;
                    let tiempo = `${tiem}.`.green;
                    let temper = `${temp}g.`.green;
                    let tempMax = `${max}g.`.green;
                    let tempMin = `${min}g.`.green;
                    let vient = `${vien} km/h.`.green;

                    console.log();
                    console.log(`Información sobre ${nombre}:`.green);
                    console.log();
                    console.log(`Lugar: ${nombre.green}.`);
                    console.log(`Latitud: ${lati}`);
                    console.log(`Longitud: ${longi}`);
                    console.log(`Tiempo: ${tiempo}`);
                    console.log(`Temperatura: ${temper}`);
                    console.log(`Máximas: ${tempMax}`);
                    console.log(`Minimas: ${tempMin}`);
                    console.log(`viento: ${vient}`);
                    
                }

                break;

            case 2:

                const idSelecGua = await listadoLugares(busquedas.historial);

                if (idSelecGua !== 0) {

                    const lugarSeleccionado = busquedas.historial.find( l => l.id === idSelecGua);

                    const { nombre, lng, lat } = lugarSeleccionado;

                    const clima =  await busquedas.clima(lat,lng);

                    const { tiem, temp, min, max, vien } = clima;

                    let lati = `${lat}.`.green;
                    let longi = `${lng}.`.green;
                    let tiempo = `${tiem}.`.green;
                    let temper = `${temp}g.`.green;
                    let tempMax = `${max}g.`.green;
                    let tempMin = `${min}g.`.green;
                    let vient = `${vien} km/h.`.green;

                    console.log();
                    console.log(`Información sobre ${nombre}:`.green);
                    console.log();
                    console.log(`Lugar: ${nombre.green}.`);
                    console.log(`Latitud: ${lati}`);
                    console.log(`Longitud: ${longi}`);
                    console.log(`Tiempo: ${tiempo}`);
                    console.log(`Temperatura: ${temper}`);
                    console.log(`Máximas: ${tempMax}`);
                    console.log(`Minimas: ${tempMin}`);
                    console.log(`viento: ${vient}`);
                    
                }

                break;

        }

        if (opt !== 0) await pausa();

    } while (opt !== 0);

}

main();



