import type { EmbalseUpdateSAIHEntity } from "db-model";

export const getEstadoCuencaMediteranea = async (): Promise<
  EmbalseUpdateSAIHEntity[]
> => {
  return [
    {
      id: 1,
      nombre: "Embalse de Buendía",
      aguaActualSAIH: 1234567,
      fechaMedidaSAIH: "2023-10-01T12:00:00Z",
    },
    {
      id: 2,
      nombre: "Embalse de Bolarque",
      aguaActualSAIH: 2345678,
      fechaMedidaSAIH: "2023-10-01T12:00:00Z",
    },
    // Add more embalses as needed
  ];
};
