import { DateTime } from "ionic-angular/components/datetime/datetime";


export interface Profil {
    userId? : string;
    nom?: string;
    ville?: string;
    telephone?: number;
    imageUrl?: string;
    dateCreation?: DateTime;
}