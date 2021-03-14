export interface ICreateUserRequestDTO {
    name: string;
    email: string;
    password: string;
    birthdate: Date;
    type: string;
}