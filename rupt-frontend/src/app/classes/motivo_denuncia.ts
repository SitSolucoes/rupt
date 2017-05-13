
export class Motivo_Denuncia {
   id: number;
   motivo: string;
   ativo: boolean;
   created_at: Date;
   updated_at: Date;

   constructor(id, motivo, ativo, created_at, updated_at){
       this.id = id;
       this.motivo = motivo;
       this.ativo = ativo;
       this.created_at = created_at;
       this.updated_at = updated_at;
   }
}
