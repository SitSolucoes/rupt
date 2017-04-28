export interface Admin {
    id: number,
    name: string,
    email: string, 
    password: string,
    createdAt: Date,
    UpdatedAt: Date,
    rememberToken: string,
    ativo: boolean
}
