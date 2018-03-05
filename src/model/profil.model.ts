
import { isAdmin } from "@firebase/util/dist/esm/src/jwt";


export interface Profile {
    userId : string;
    nom: string;
    ville: string;
    numero: number;
    //photoUrl?: string;
    //isAdmin?: boolean; 
}