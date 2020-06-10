export interface CSV {
    data_publicacao: Date;
    recuperados: string; //SIM ou NAO
    data_inicio_sintomas: Date;
    data_coleta: Date;
    sintomas: string;
    comorbidades: string; //Doenças recorrentes (Hipertensao, etc)
    internacao: string; //INTERNADO ou NAO INTERNADO
    internacao_uti: string; //INTERNADO UTI ou NAO INTERNADO UTI
    sexo: string; //MASCULINO ou FEMININO
    municipio: string;
    obito: string; // SIM ou NAO
    data_obito: Date; //DATA OU NULL
    idade: number;
    regional: string; //MACRO
    raca: string;
    data_resultado: Date;
    codigo_ibge_municipio: number; //NUMERO ou NULL caso seja fora do estado
    latitude: number; //OU NULL
    longitude: number; //OU NULL
    criterio_confirmacao: string;
    tipo_teste: string;
    municipio_notificacao: string;
    codigo_ibge_municipio_notificacao: number;
    latitude_notificacao: number;
    longitude_notificacao: number;
    origem_esus: string; //SIM OU NAO
    origem_sivep: string; //SIM OU NAO
    origem_lacen: string; //SIM OU NAO
    origem_laboratorio_privado: string; //SIM OU NAO
    nom_laboratorio: string;
    fez_teste_rapido: string;
    fez_pcr: string;
    data_internacao: Date;
    data_entrada_uti: Date;
    regional_saude: string;
    data_evolucao_caso: Date;
    data_saida_uti: Date;
    bairro: string;
}
