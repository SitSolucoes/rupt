import { Interacao } from './interacao';
export class Interacoes {
    public interacoes: any;

    constructor(likes: number, loves: number, shares: number, sads: number, angries: number, cries: number){
        this.interacoes = {
            likes : new Interacao('likes', likes),
            loves : new Interacao('loves', loves), 
            shares : new Interacao('shares', shares), 
            sads : new Interacao('sads', sads),
            angries : new Interacao('angries', angries), 
            cries: new Interacao('cries', cries)
        };
    }
}
