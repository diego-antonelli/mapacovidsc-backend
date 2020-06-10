export interface Resumo {
    publicacao: Date;
    casos: number;
    recuperados: number;
    internados: number;
    internadosUti: number;
    obitos: number;
    dados: ResumoMunicipio[];
}

export interface ResumoMunicipio {
    nome: string;
    codigoIbge: number;
    casos: number;
    recuperados: number;
    internados: number;
    internadosUti: number;
    obitos: number;
    dados: Dado[];
}

export interface Dado {
    publicacao: Date;
    recuperado: boolean;
    inicioSintomas: Date;
    coleta: Date;
    sintomas: string;
    comorbidades: string; //Doenças recorrentes (Hipertensao, etc)
    internado: boolean; //INTERNADO ou NAO INTERNADO
    internadoUti: boolean; //INTERNADO UTI ou NAO INTERNADO UTI
    sexo: string;
    municipio: string;
    obito: boolean;
    dataObito?: Date;
    idade: number;
    dataResultado: Date;
    codigoIbge?: number;
    latitude?: number;
    longitude?: number;
    criterioConfirmacao: string;
    tipoTeste: string;
    municipioNotificacao: string;
    origemEsus: boolean;
    origemSivep: boolean;
    origemLacen: boolean;
    origemLaboratorioPrivado: boolean;
    nomeLaboratorio: string;
    testeRapido: boolean;
    pcr: boolean;
    dataInternacao: Date;
    dataEntradaUti: Date;
    regionalSaude: string;
    dataEvolucaoCaso: Date;
    dataSaidaUti: Date;
    bairro: string;
}
