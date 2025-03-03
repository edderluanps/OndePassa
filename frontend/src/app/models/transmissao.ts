import { Evento } from "./evento";

export interface Transmissao{

    id: number;
    transmissao: boolean;
    canal: string;
    canalImg: string;
    localidadeTransmissao: string;
    linkTransmissao: string;
    evento: Evento;

}