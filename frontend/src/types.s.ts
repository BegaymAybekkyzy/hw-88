export interface IUserForm {
    username: string;
    password: string;
}

export interface IUser {
    _id: string;
    username: string;
    token: string;
}

export interface IRegistrationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface IError {
    error: string;
}

export interface IPostApi {
    _id: string;
    user: {
        _id: string;
        username: string;
    }
    title: string;
    image: string;
    description: string;
    datetime: string;
}

export interface IPostForm {
    title: string;
    description: string;
    image: File | null;
}
