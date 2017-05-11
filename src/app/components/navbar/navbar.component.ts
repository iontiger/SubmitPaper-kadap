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
  }

  logout(){
    this.af.auth.signOut();
    this.flashMessage.show('안전하게 로그아웃되었습니다', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/']);
  }
}
