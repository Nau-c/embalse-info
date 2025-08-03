import { scrapeCuencaMediterranea } from './integration';

const URL = 'https://www.redhidrosurmedioambiente.es/saih/resumen/embalses';
console.log('Estado de la Cuenca Mediterránea:');
const result = await scrapeCuencaMediterranea(URL);
console.log(JSON.stringify(result, null, 2));
