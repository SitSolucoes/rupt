import { Leitor } from "app/classes/leitor";
import { Escritor } from "app/classes/escritor";

export class Seguidor {
    leitor_id: number;
    escritor_id: number;

    leitor: Leitor[];
    escritor: Escritor[];
}
