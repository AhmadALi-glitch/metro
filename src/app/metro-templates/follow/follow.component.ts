import { Component, Input, OnInit } from '@angular/core';
import { FollowingService } from 'src/app/services/following.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  p1 = localStorage.getItem("email")?.toString();

  @Input("p2") p2:string | undefined;
  @Input("followState") followState:boolean | undefined;

  fState = "";

  constructor(private service:FollowingService) { }

  follow() {
    this.service.add({p2 : this.p2, p1:this.p1}, "follow")
      .subscribe({
        error : (err:any) => {
          console.log(err);
        }
        ,
        complete : () => {this.fState = "done"},
        next : (data:any) => console.log(data)
      })
  }

  unFollow() {
    this.service.add({p2 : this.p2, p1:this.p1}, "unfollow")
      .subscribe({
        error : (err:any) => {
          console.log(err);
        }
        ,
        complete : () => {this.fState = "done"},
        next : (data:any) => console.log(data)
      })
  }

  ngOnInit(): void {
    console.log(this.followState)
  }

}
