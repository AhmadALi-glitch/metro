import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit{

  photoPath = localStorage.getItem("photoPath")?.toString();
  name = localStorage.getItem("name")?.toString();
  email = localStorage.getItem("email")?.toString();
  aboutMe = localStorage.getItem("aboutMe")?.toString();

  constructor(private router:Router) {

  }

  ngOnInit(): void {
  }
}
