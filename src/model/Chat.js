import { Model } from "./Model";

import {Firebase} from './../util/Firebase';

export class Chat extends Model{
  constructor(){
    super();
  }

  get users(){
    return this._data.users;
  }

  set users(value){
    this._data.users = value;
  }

  static getRef(){
    return Firebase.db().collection('/chats');
  }

  static create(myEmail, contactEmail){
    return new Promise((resolve, reject) =>{
      let users = {};

      users[btoa(myEmail)] = true;
      users[btoa(contactEmail)] = true;
      Chat.getRef().add({
        users,
        timeStamp: Date.now()
      }).then(doc =>{
        Chat.getRef().doc(doc.id).get().then(chat =>{
          resolve(chat);
        }).catch(error =>{
          reject(error);
        });
      }).catch(error =>{
        reject(error);
      });
    });
  }

  static find(myEmail, contactEmail){
    return Chat.getRef()
    .where(btoa(myEmail),'==',true)
    .where(btoa(contactEmail),'==',true).get();
  }

  static createIfNotExists(myEmail, contactEmail){
    return new Promise((resolve, reject) =>{
      Chat.find(myEmail, contactEmail).then(chats =>{
        if(chats.empty){
          Chat.create(myEmail, contactEmail).then(chat =>{
            resolve(chat);
          }).catch(error =>{
            reject(error);
          });
        }else{
          chats.forEach(chat => {
            resolve(chat);
          });
        }
      }).catch(error =>{
        reject(error);
      });
    });
  }
}