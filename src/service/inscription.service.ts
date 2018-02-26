import { Injectable } from "@angular/core";
import { AngularFireDatabase ,AngularFireList } from 'angularfire2/database';
import { User } from "../model/user.model";


@Injectable()
export class InscriptionService{

    user : User;
constructor(private db : AngularFireDatabase){

}
    inscription(user){
        this.db.list('/users').push({
            nom: this.user.nom,
            login : this.user.login,
            email: this.user.email,
            password : this.user.password,
            ville : this.user.ville,
            numero: this.user.numero,
            Admin : this.user.isAdmin,
            photo : this.user.photo
          }).then( ()=>{
      
          })
    }
}