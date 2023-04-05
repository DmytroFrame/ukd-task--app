type Gender = 'MALE' | 'FEMALE';

export interface IComment {
    id: number;
    text: string;
    createdAt: string;
}

export interface IPatient {
    id?: number;
    firstName: string;
    lastName: string;

    birthday: string;
    gender: Gender;

    country: string;
    state: string;
    address: string;

    comments?: IComment[];
}
