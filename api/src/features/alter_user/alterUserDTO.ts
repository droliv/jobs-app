export interface IAlterUserDTO {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    birthdate?: Date;
    type?: string;
}