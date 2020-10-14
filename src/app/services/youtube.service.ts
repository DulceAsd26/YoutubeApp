import { HttpClient, HttpParams } from '@angular/common/http';
import { Youtuberesponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = "https://www.googleapis.com/youtube/v3";
  private apikey = "AIzaSyDe8lPusn0FUDJNfSRE2SdAnjRJrrFi6z8";
  private playlist = "UUuaPTYj15JSkETGnEseaFFg";
  private nextPageToken = "";


  constructor(private http: HttpClient ) {}

    getVideos() {

      const url= `${this.youtubeUrl}/playlistItems`;

      const params = new HttpParams()
          .set('part', 'snippet')
          .set('maxResults', '10')
          .set('playlistId', this.playlist)
          .set('key', this.apikey)

    return this.http.get<Youtuberesponse>( url, { params })
              .pipe(

                map( resp =>{
                  this.nextPageToken = resp.nextPageToken;
                  return resp.items;
                }),

                map( items => items.map( video => video.snippet ))
                


              )
   }


}
