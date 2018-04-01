import { Injectable } from "@angular/core";
import { AngularFireDatabase ,AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Post } from "../model/post.model";
import * as firebase from 'firebase';



@Injectable()
export class PostService{

    posts : AngularFireList<Post[]> = null; // list d'objets
    userId: string;

    constructor(private db: AngularFireDatabase, private afAuth:AngularFireAuth){
        // recuperation de l'id de l'utilisateur connecté
       this.afAuth.authState.subscribe(user =>{
           if(user) this.userId = user.uid;
       })
    }

    //Affichage de la liste des posts avec une requete optionelle

    getPostsList(): AngularFireList<Post[]>{
      if(!this.userId) return ;
      this.posts = this.db.list('posts/${this.userId}');
      return this.posts;
    }

    //Creation d'une nouvelle publication

    CreatePost(post: Post){
        //post.userId = this.userId;
        //this.posts.push(post[] );
        this.db.list('/post').push(post);
    }

    getAllPost(table: string){
        firebase.database().ref().child(table).orderByChild('status').equalTo(true).on('value',snap=>{
          const result = snap.val();
          const keys  = Object.keys(result);
           for(var i=0; i<keys.length ;i++){
              var k= keys[i];
              this.posts[i] = result[k];
              }
         });     
      }
}
