export interface CSV {
    data_publicacao: string;
    recuperados: string; //SIM ou NAO
    data_inicio_sintomas: string;
    data_coleta: string;
    sintomas: string;
    comorbidades: string; //Doenças recorrentes (Hipertensao, etc)
    internacao: string; //INTERNADO ou NAO INTERNADO
    internacao_uti: string; //INTERNADO UTI ou NAO INTERNADO UTI
    sexo: string; //MASCULINO ou FEMININO
    municipio: string;
    obito: string; // SIM ou NAO
    data_obito: string; //DATA OU NULL
    idade: number;
    regional: string; //MACRO
    raca: string;
    data_resultado: string;
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
    data_internacao: string;
    data_entrada_uti: string;
    regional_saude: string;
    data_evolucao_caso: string;
    data_saida_uti: string;
    bairro: string;
}
