export type FormContactConfig = {
    data: {
        heading ?: string;
    }
}

export type FormData = {
    name: string;
    surname: string;
    phone: string;
    email: string;
    dateOfBirth: Date;
    address: string;
    city: string;
    state: string;
    zipCode: string;
};
