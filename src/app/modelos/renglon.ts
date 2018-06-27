import { Producto } from './producto';

export class Renglon {
    public productoId: string;
    public cantidad: number;
    public precioUnitario: number;
    public precioVenta: number;
    public _id: string;
    public producto: Producto;
    public cantidadMaxima = 1;
    generado = false;
}
