import type { Embalse } from "db-model";

export const getEstadoCuencaMediteranea = async (): Promise<Embalse[]> => {
  return [
    {
      id: "1",
      nombre: "Embalse de Iznájar",
      provincia: "Córdoba",
      capacidad: 981000000,
      nivelActual: 750000000,
      fechaUltimoNivel: new Date("2023-10-01"),
      porcentajeLlenado: 76.5,
    },
    {
      id: "2",
      nombre: "Embalse de El Chorro",
      provincia: "Málaga",
      capacidad: 229000000,
      nivelActual: 180000000,
      fechaUltimoNivel: new Date("2023-10-01"),
      porcentajeLlenado: 78.6,
    },
  ];
};
