interface IUsuario {

    id: number;
    nombre: string;
    password: string;
    repo: string;

}

export class Usuario implements IUsuario {

    id: number;
    nombre: string;
    password: string;
    repo: string;

    constructor() {

        this.id = 0;
        this.nombre = '';
        this.password = '';
        this.repo = '';
    }

}