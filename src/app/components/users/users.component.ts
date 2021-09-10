import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { IUser } from 'src/app/models/user';
import { JsonApiService } from 'src/app/services/json-api.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { IComment } from 'src/app/models/comment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[];
  posts: Post[];
  post: Post;
  comments: IComment[];
  step=0;

  closeResult = '';
  panelOpenState = false;


  constructor(private jsonApiService: JsonApiService,
              private modalService: NgbModal,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(){
    this.jsonApiService.getUsers().subscribe(
      response=>{this.users=response}
    )
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }




  onSelected(user: IUser){
    this.httpClient.get<Post[]>("https://jsonplaceholder.typicode.com/posts?userId="+user.id)
    .subscribe(
      response=>{this.posts=response}
    )
    console.log(this.posts)
  }


  onCommentSelected(post: Post){
    this.httpClient.get<IComment[]>("https://jsonplaceholder.typicode.com/comments?postId="+post.id)
    .subscribe(
      response=>{this.comments=response}
    )
    console.log(this.comments)
  }


 open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}


}
