import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { IComment } from '../models/comment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class JsonApiService {
  baseUrl = "https://jsonplaceholder.typicode.com/";
  constructor(private http: HttpClient) { }

  getPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.baseUrl+'posts')
  }

  getPostById(id):Observable<Post[]>{
    return this.http.get<Post[]>(this.baseUrl+'posts/'+id);
  }

  getSelectedPostComments():Observable<IComment[]>{
    return this.http.get<IComment[]>(this.baseUrl+'comments');
  }




  getUsers():Observable<IUser[]>{
    return this.http.get<IUser[]>(this.baseUrl+'users');
  }
}
