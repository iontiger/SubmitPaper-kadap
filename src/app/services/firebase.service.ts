import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {
  listings: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<any>;
  members: FirebaseListObservable<any[]>;

  folder: any;
  userlistings: any;
  memberEmail: any;
  matchingEmail: any;

  

  constructor(
    private af: AngularFireModule, private db: AngularFireDatabase, public afAuth:AngularFireAuth,) 
    {
      this.folder = 'listingimages';
      this.listings = this.db.list('/listings') as FirebaseListObservable<Listing[]>;
      this.userlistings = this.db.list('/listings/'+afAuth.auth.currentUser.displayName) as FirebaseListObservable<Listing[]>;
      this.members = this.db.list('/members') as FirebaseListObservable<Listing[]>;
    }

  findUsersMatchingEmail( emailAddress ) {
    let memberDB = firebase.database().ref('/members');
    memberDB.orderByChild('email').equalTo(emailAddress).once('child_added').then(function (snapshot) {
      console.log(snapshot.val());
      // this.matchingEmail = snapshot.val().email;
      if (emailAddress == snapshot.val().email) {
        console.log('find USER');
        return true;        
      }
      
    }).catch((error)=>{
      console.log(error);
    });
  }

  getMembers(){
    this.members = this.db.list('/members', {
      query: {
        orderByChild: 'email',
        equalTo: this.afAuth.auth.currentUser.email
      }
    });
    return this.members;

    // let memberDB = firebase.database().ref('/members');
    // let authEmail = this.afAuth.auth.currentUser.email;

    // memberDB.orderByChild('email').once('value').then(function (snapshot) {
    //   console.log(snapshot.val().email);
    // }).catch((error)=>{
    //   console.log(error);
    // });

    // memberDB.orderByChild('email').once('value').then(function (snapshot) {
    //   snapshot.forEach(element => {
    //     if(element.val().email == authEmail){
    //       console.log('SUCCESS');
    //       matchedEmail = 'match';
    //     } else{
    //       matchedEmail = 'unmatch';
    //     }  
    //   });
    // });


  }

  getListings(){   
    // this.listings = this.db.list('/listings');
    // this.listings = this.listings.$ref.ref.child();
    return this.listings;
  }

  getUserListings(){
    this.listings = this.db.list('/listings', {
      query: {
        orderByChild: 'loginEmail',
        equalTo: this.afAuth.auth.currentUser.email
      }
    });
    return this.listings;
  }

  getListingDetails(id){
    this.listing = this.db.object('/listings/'+id) as FirebaseObjectObservable<Listing>;
    return this.listing;
  }

  updateListing(id, listing){
    return this.listings.update(id, listing);
  }

  deleteListing(id){
    return this.listings.remove(id);
  }

  addListing(listing){
    // get UID
    let userID = this.afAuth.auth.currentUser.displayName;
    // let userEmail = this.afAuth.auth.currentUser.email;
    listing.loginEmail = this.afAuth.auth.currentUser.email;

    // Create root ref
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        return this.listings.push(listing);

        // user displayName 하위에 목록 저장
        // return this.listings.$ref.ref.child(userID).push(listing);
      });
    }
  }

}

interface Listing{
  $key?:string;
  title?:string;
  type?:string;
  image?:string;
  city?:string;
  owner?:string;
  bedrooms?:string;
}
