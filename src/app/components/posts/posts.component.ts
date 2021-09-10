import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { IComment } from 'src/app/models/comment';
import { JsonApiService } from 'src/app/services/json-api.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  comments: IComment[];
  selectedPost: Post;
  postFilter: any = 1;
  postById: any;

  closeResult = '';
  constructor(private jsonApiService: JsonApiService,
    private modalService: NgbModal,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getPosts();
  }

  onPostSelect(e) {
  this.getPostById(e);
  }
  getPosts() {
    this.jsonApiService.getPosts().subscribe(response => {
      this.posts = response
    })
  }

  getPostById(id) {
    this.jsonApiService.getPostById(id).subscribe(response => {
      this.postById = response
      console.log(this.postById)
    })

  }

 
  //Gets SelectedPost's Comments
  onSelected(post: Post) {
    this.selectedPost = post;
    this.httpClient.get<IComment[]>("https://jsonplaceholder.typicode.com/comments?postId=" + this.selectedPost.id).subscribe(
      response => { this.comments = response }
    )
    console.log(this.comments);
  }



  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
