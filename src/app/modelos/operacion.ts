export class Operacion {
    public descripcion: string;
    public tipo_operacion: number;
    public fecha_generacion: Date;
    public monto_operacion: number;

    public APERTURA_SALDO = 1;
    public COMPRA = 2;
    public PAGO = 3;
    public AJUSTE = 4;
    public ANULACION = 5;
}


