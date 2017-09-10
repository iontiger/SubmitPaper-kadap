import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 

  constructor(
    public af:AngularFireAuth,
    public flashMessage:FlashMessagesService,
    private router:Router
    ) { }

  ngOnInit() {
    
  }

  login(){
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    // let memberDB = firebase.database().ref('/members');
    // let authEmail = this.af.auth.currentUser.email;

    // memberDB.orderByChild('email').on('value', function(snapshot){
    //   // return snapshot.val().email;
    //   // var memberDBEmail = snapshot.val().email;
    //   snapshot.forEach(function(emailSanpshot){
    //     console.log(emailSanpshot.val());
    //     if(emailSanpshot.val().email == authEmail){
    //     console.log('Success');
    //     let memberEmail = 'match';
    //     return true;
    //   } else{
    //     console.log('Fail');
    //     let memberEmail = 'unmatch';
    //     return true;
    //   }
    // });
    // });
  }

  logout(){
    this.af.auth.signOut();
    this.flashMessage.show('안전하게 로그아웃되었습니다', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/']);
  }
}
