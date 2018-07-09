import { Operacion } from './operacion';

export class Saldo {
    public monto: number;
    public cliente: string;
    public _id: string;
    public operaciones: Operacion[];
}
