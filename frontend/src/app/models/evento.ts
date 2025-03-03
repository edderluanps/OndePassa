import { Liga } from "./liga";

export interface Evento{

    id: number;
    timeA: string;
    timeB: string;
    liga: Liga;
    tipoEvento: string;
    dataEvento: string;

}