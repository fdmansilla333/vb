import { Producto } from './producto';

export class Renglon {
    public productoId: string;
    public cantidad: number = 1;
    public precioUnitario: number;
    public precioVenta: number;
    public _id: string;
    public producto: Producto;
    public cantidadMaxima = 1;
    generado = false;
    public anulado = false; // este campo sirve para las devoluciones
}
