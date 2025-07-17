import { getEstadoCuencaMediteranea } from "./integration";

console.log("Estado de la Cuenca Mediterránea:");
const result = await getEstadoCuencaMediteranea();
console.log(JSON.stringify(result, null, 2));
