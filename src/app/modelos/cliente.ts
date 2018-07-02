export class Cliente {
    public Nombre: string;
    public Apellido: string;
    public DNI: string;
    public Email: string;
    public Telefono: string;
    public Domicilio: string;
    public Fecha_alta: Date;
    public Fecha_baja: Date;
    public Activo: boolean;
    public _id: string;

    // para formatear
    formateo: string = '';
}
