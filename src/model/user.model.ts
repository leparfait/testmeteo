import { isAdmin } from "@firebase/util/dist/esm/src/jwt";


export interface User {
    nom: string;
    login: string;
    email: string;
    password : string;
    ville: string;
    photo: any;
    isAdmin: boolean; 
}