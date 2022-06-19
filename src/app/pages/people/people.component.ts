import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdvancedExploreService } from 'src/app/services/explore/advanced-explore.service';
import { ExploreService } from 'src/app/services/explore/explore.service';
import { GlobalExploreService } from 'src/app/services/explore/global-explore.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {


  constructor(private route:Router, private explore:ExploreService, private following:AdvancedExploreService, private global:GlobalExploreService) { }

  switchCase = "global";

  myEmail = localStorage.getItem('email');

  URL="http://localhost:2000/";

  byCountrypeople:Array<any> = [];
  byFollowingpeople:Array<any> = [];
  preByGlobalpeople:Array<any> = [];
  byGlobalpeople:Array<any> = [];

  searchWord:string | undefined;

  filter(value:any) {
    this.searchWord = value;
    this.byGlobalpeople = this.preByGlobalpeople.filter((element:any) => {
      return element.name == value;
    });
  }

  toHisPage(email:any) {
    this.route.navigate(["page/", email]);
  }

  ngOnInit(): void {
    this.explore.getAll(localStorage.getItem('email')?.toString())
      .subscribe({
        next : (data:any) => {
        data.forEach((element:any) => {
          const person = {
            email: element._fields[0],
            name : element._fields[1],
            image : element._fields[2]
          }

          if(person.email != localStorage.getItem('email')?.toString()) {
            this.byCountrypeople.push(person);
          }


        })},

        complete: () => console.log("completed"),

        error: (err:any) => console.log(err)

      })

      this.following.getAll(localStorage.getItem('email')?.toString())
      .subscribe({
        next : (data:any) => {
          data.forEach((element:any) => {
            const person = {
              email: element._fields[0],
              name : element._fields[1],
              image : element._fields[2]
            }
  
            this.byFollowingpeople.push(person);
  
          })
        },

        complete: () => console.log("completed"),

        error: (err:any) => console.log(err)

      })

      
      this.global.getAll(localStorage.getItem('email')?.toString())
      .subscribe({
        next : (data:any) => {
          data.forEach((element:any) => {
            const person = {
              email: element._fields[0],
              name : element._fields[1],
              image : element._fields[2]
            }
  
            this.preByGlobalpeople.push(person);
  
          })
        },

        complete: () => console.log("completed"),

        error: (err:any) => console.log(err)

      })

  }

}
