export class CuponPago {
    _id: string;
    factura: string;
    importeCuota: number;
    numeroCuota: number;
    fechaVencimiento: Date;
    fecha_alta: Date;
    fecha_baja: Date;
    activo: boolean;
    pagada: boolean = false;
    mora: boolean = false;
    importeMora = 0;
    diasTranscurridos = 0;


}