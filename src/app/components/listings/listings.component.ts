import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  
  listings: any;
  currentUserEmail: any;
  members: any;

  constructor(private firebaseService:FirebaseService, public afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.currentUserEmail = this.afAuth.auth.currentUser.email;
    console.log(this.currentUserEmail);
    // let loginEmail = this.afAuth.auth.currentUser.email;

    // this.firebaseService.findUsersMatchingEmail(this.currentUserEmail); 

    // if (this.firebaseService.findUsersMatchingEmail(this.currentUserEmail)){console.log('TRUE');}

    // let memberDB = firebase.database().ref('/members');
    // memberDB.orderByChild('email').equalTo(this.currentUserEmail).once('child_added').then(function (snapshot) {
    //   console.log(snapshot.val());
    //   let matchingEmail = snapshot.val().email;
    //   let loginEmail = this.afAuth.auth.currentUser.email;
    //   this.matchingEmail = snapshot.val().email;
    //   if (loginEmail == matchingEmail) {
    //     console.log('find USER');
    //     this.firebaseService.getListings().subscribe(listings =>{
    //       this.listings = listings;
    //     });     
    //     return true;
    //   } else {
    //     this.firebaseService.getUserListings().subscribe(listings =>{
    //       this.listings = listings;
    //     }); 
    //   }
    
    // }).catch((error)=>{
    //   console.log(error);
    // });

    // let memberDB = firebase.database().ref('/members');
    // let authEmail = this.afAuth.auth.currentUser.email;
    // let matchedEmail;

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

    // console.log(matchedEmail);
    // memberDB.orderByChild('email').on('value', function(snapshot){
    //   snapshot.forEach(function(emailSanpshot){
    //     if(emailSanpshot.val().email == authEmail){
    //       this.firebaseService.getListings().subscribe(listings =>{
    //         this.listings = listings;
    //     });
    //     // return true;
    //     } else {
    //       this.firebaseService.getUserListings().subscribe(listings =>{
    //         this.listings = listings;
    //       });
    //       return true;
    //     }
    //   });
    // });

    // this.firebaseService.getMembers().subscribe(members =>{
    //   this.members = members;
    //   //check members
    //   if (this.members) {
    //     console.log('success');
    //   } else {console.log('fail')}
    // });

    this.firebaseService.getMembers().subscribe(members =>{
      this.members = members;
      console.log(this.members);
    });
    
    
     
    if (this.currentUserEmail == 'iontiger@gmail.com' || this.currentUserEmail == 'shinhosung@gmail.com') {
      this.firebaseService.getListings().subscribe(listings =>{
        this.listings = listings;
      });
      
    } else {
      this.firebaseService.getUserListings().subscribe(listings =>{
        this.listings = listings;
      });
    }

    
  }
  

}
