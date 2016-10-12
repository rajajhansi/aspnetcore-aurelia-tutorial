export interface IContact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthDate: Date;
    thumbnailImage?: string;
}