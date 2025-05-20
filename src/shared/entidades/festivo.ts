export interface TipoFestivo {
    id: number;
    tipo: string;
}

export interface Festivo {
    id: number;     
    nombre: string;
    dia: number;
    mes: number;
    diasPascua?: number;
    idTipo: number;
    tipoFestivo?: TipoFestivo;
    fecha?: Date;
}


