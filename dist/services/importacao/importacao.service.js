"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importarDados = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = require("fs");
const util_1 = require("util");
const stream_1 = require("stream");
const promise_ftp_1 = __importDefault(require("promise-ftp"));
const config = __importStar(require("../../config/database.json"));
const database_1 = require("../../database");
const httpErrors_1 = require("../../utils/httpErrors");
const streamPipeline = util_1.promisify(stream_1.pipeline);
const filePath = "./dados.csv";
function download() {
    return __awaiter(this, void 0, void 0, function* () {
        const ftpClient = new promise_ftp_1.default();
        console.log("Conectando...");
        yield ftpClient.connect({
            host: "ftp2.ciasc.gov.br",
            user: "boavista",
            password: "dados_abertos",
        });
        console.log("Conectado!");
        console.log("Efetuando download do arquivo");
        const stream = yield ftpClient.get("boavista_covid_dados_abertos.csv");
        console.log("Arquivo baixado com sucesso!");
        console.log("Gravando arquivo...");
        yield streamPipeline(stream, fs_1.createWriteStream(filePath));
        console.log("Arquivo gravado com sucesso!");
        yield ftpClient.end();
        console.log("Encerrado");
    });
}
function readCsvFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const results = [];
            fs_1.createReadStream(path)
                .pipe(csv_parser_1.default({ separator: ";", mapHeaders: ({ header, index }) => header.trim().toLowerCase() }))
                .on("data", (data) => results.push(data))
                .on("end", () => resolve(results))
                .on("error", (e) => reject(e));
        });
    });
}
function normalizarDados(dados) {
    return dados.map((dado) => ({
        publicacao: new Date(dado.data_publicacao),
        recuperado: dado.recuperados === "SIM",
        inicioSintomas: new Date(dado.data_inicio_sintomas),
        coleta: dado.data_coleta,
        sintomas: dado.sintomas,
        comorbidades: dado.comorbidades,
        internado: dado.internacao === "INTERNADO",
        internadoUti: dado.internacao_uti === "INTERNADO UTI",
        sexo: dado.sexo,
        municipio: dado.municipio,
        obito: dado.obito === "SIM",
        dataObito: new Date(dado.data_obito),
        idade: Number(dado.idade),
        dataResultado: new Date(dado.data_resultado),
        codigoIbge: isNaN(Number(dado.codigo_ibge_municipio)) ? 9999999 : Number(dado.codigo_ibge_municipio),
        latitude: Number(dado.latitude),
        longitude: Number(dado.longitude),
        criterioConfirmacao: dado.criterio_confirmacao,
        tipoTeste: dado.tipo_teste,
        municipioNotificacao: dado.municipio_notificacao,
        origemEsus: dado.origem_esus === "SIM",
        origemSivep: dado.origem_sivep === "SIM",
        origemLacen: dado.origem_lacen === "SIM",
        origemLaboratorioPrivado: dado.origem_laboratorio_privado === "SIM",
        nomeLaboratorio: dado.nom_laboratorio === "NULL" ? null : dado.nom_laboratorio,
    }));
}
function importarDados() {
    return __awaiter(this, void 0, void 0, function* () {
        yield download();
        const dadosNormalizados = normalizarDados(yield readCsvFile(filePath));
        if (!dadosNormalizados) {
            throw new httpErrors_1.HTTP400Error("Dados do SES/SC não estão íntegros!");
        }
        const municipios = Array.from(new Set(dadosNormalizados.map((d) => d.codigoIbge)));
        const dados = municipios.map((codigoIbge) => {
            const dadosMunicipio = dadosNormalizados.filter((d) => d.codigoIbge === codigoIbge);
            return {
                nome: dadosMunicipio[0].municipio,
                codigoIbge,
                casos: dadosMunicipio.length,
                recuperados: dadosMunicipio.filter((d) => d.recuperado).length,
                internados: dadosMunicipio.filter((d) => d.internado).length,
                internadosUti: dadosMunicipio.filter((d) => d.internadoUti).length,
                obitos: dadosMunicipio.filter((d) => d.obito).length,
                dados: dadosMunicipio,
            };
        });
        const resumo = {
            publicacao: dadosNormalizados[0].publicacao,
            internados: dados.reduce((soma, dado) => soma + dado.internados, 0),
            internadosUti: dados.reduce((soma, dado) => soma + dado.internadosUti, 0),
            recuperados: dados.reduce((soma, dado) => soma + dado.recuperados, 0),
            obitos: dados.reduce((soma, dado) => soma + dado.obitos, 0),
            casos: dados.reduce((soma, dado) => soma + dado.casos, 0),
            dados,
        };
        const dadosBanco = yield database_1.Database.findOne(config.collections.resumo, { publicacao: resumo.publicacao });
        if (!dadosBanco) {
            const retorno = yield database_1.Database.save(config.collections.resumo, resumo);
            if (!retorno.insertedId) {
                throw new httpErrors_1.HTTP400Error();
            }
            return resumo;
        }
        return {};
    });
}
exports.importarDados = importarDados;
