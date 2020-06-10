import { Database } from "../../database";
import * as config from "../../config/database.json";
import { Resumo } from "../../models/resultado";
import { generateSort } from "../../utils/databaseHelpers";

export async function listarResultados() {
    const resultados = (await Database.findLast(
        config.collections.resumo,
        {},
        generateSort<Resumo>("publicacao", true),
    )) as Resumo[];
    if (resultados && resultados.length > 0) return resultados.shift();
    return [];
}
