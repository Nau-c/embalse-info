import {
  ejecutarScrapingCompleto,
  scrapePresasCanariasAsCSV,
} from "./integration";
import { writeFileSync } from "fs";
import { join } from "path";

/**
 * Ejecuta el scraping de presas canarias desde la línea de comandos
 */
async function main() {
  try {
    console.log("🏝️  SCRAPER DE PRESAS CANARIAS");
    console.log("================================\n");

    // Ejecutar scraping completo
    await ejecutarScrapingCompleto();

    // Exportar a CSV
    console.log("\n📄 Exportando datos a CSV...");
    const csvData = await scrapePresasCanariasAsCSV();

    // Guardar archivo CSV
    const outputPath = join(process.cwd(), "presas_canarias.csv");
    writeFileSync(outputPath, csvData, "utf-8");
    console.log(`✅ Datos exportados a: ${outputPath}`);

    console.log("\n🎉 Proceso completado exitosamente!");
  } catch (error) {
    console.error("❌ Error en la ejecución:", error);
    process.exit(1);
  }
}

// Ejecutar la función principal
main();
