const firebase = require('firebase');
 // Add the Firebase services that you want to use
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');
export class Firebase{
  constructor(){
    this._config = {
      apiKey: "AIzaSyCQHL3Yo_u6DXXMDxwcREh2rrD4JdkR0-U",
      authDomain: "whats-clone-afb68.firebaseapp.com",
      projectId: "whats-clone-afb68",
      storageBucket: "whats-clone-afb68.appspot.com",
      messagingSenderId: "366273272432",
      appId: "1:366273272432:web:692703a46e5bbd3b04b2b5"
    };
    this.init();
  }

  init(){
    
    if(!window._initializedFirebase){
      firebase.initializeApp(this._config);
      firebase.firestore().settings({
        timestampsInSnapshots: true
      });
      window._initializedFirebase = true;
    }
  }

  static db(){
    return firebase.firestore();
  }

  static hd(){
    return firebase.storage();
  }

  initAuth(){
    return new Promise((resolve, reject) =>{
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(result =>{
        let token = result.credential.accessToken;

        let user = result.user;

        resolve({
          user,
          token
        });
      }).catch(error =>{
        reject(error);
      });
    });
  }
}