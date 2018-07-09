import { Renglon } from './renglon';
import { Cliente } from './cliente';
import { CuponPago } from './cuponpago';

export class Factura {
    public clienteID: string;
    public pagoparcial: boolean;
    public cantidadCuotas: number;
    public cantidadDiasMoroso: number;
    public fecha_baja: Date;
    public fecha_alta: Date;
    public activo: boolean;
    public _id: string;
    public detalles: Renglon[];
    public total: number;
    public recargo: number;
    public descuento: number;
    public neto = 0;

    /**calculado */
    public cliente: Cliente;
    public cupones: CuponPago[];
  importeCuota: number;
  entrega: number;

}
