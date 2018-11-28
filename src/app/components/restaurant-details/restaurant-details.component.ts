import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from "@angular/router";
import { LocalStorageService } from 'ngx-webstorage';


@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  private subscribedParam:string;
  private restaurantId:number;
  private name:string;
  private rating:number;
  private review_count:number;
  private cost_for_two:number;
  private cuisines:string;
  private address:string;
  private menu_link:string;
  private photos_link:string;
  private banner_img:string;
  private reviews:Array<any>;
  private reviews_shown:number;
  public lat_global:string;
  public lon_global:string;
  private like:number;
  private dislike:number;

  constructor(private apiService:ApiService, private router: Router, private readonly route: ActivatedRoute,private localSt: LocalStorageService) { }

  ngOnInit() {
    //for getting param query from url
    this.route.paramMap.subscribe(params => {
      this.subscribedParam = params.get("restaurant");
      this.restaurantId = +this.subscribedParam;
    });
    //for getting likes value
    this.likeGetter(this.subscribedParam+'like');
    //for getting dislike value
    this.dislikeGetter(this.subscribedParam+'dislike');
    //for getting particular restaurant details
    this.apiService.getRestaurantDetails(this.restaurantId).subscribe(
      data=>{
        this.name = data.name;
        this.rating = data.user_rating.aggregate_rating;
        this.cost_for_two = data.average_cost_for_two;
        this.cuisines = data.cuisines;
        this.address = data.location.address;
        this.menu_link = data.menu_url;
        this.photos_link = data.photos_url;
        this.banner_img = data.featured_image;
        this.lat_global = data.location.latitude;
        this.lon_global = data.location.longitude;
      },
      (error)=>{
        console.log(error.error.message);
      }
    )
    //for getting reviews
    this.apiService.getReviews(this.restaurantId).subscribe(
      data=>{
        this.review_count = data.reviews_count;
        this.reviews = data.user_reviews;
        this.reviews_shown = data.reviews_shown;
      },
      (error)=>{
        console.log(error.error.message);
      }
    )
  }
  //for handling likes/dislike
  likeHandler(){
    ++this.like;
    this.localSt.store(this.subscribedParam+'like', this.like);
  }
  likeGetter(id:string){
    this.like = this.localSt.retrieve(id);
  }
  dislikeHandler(){
    ++this.dislike;
    this.localSt.store(this.subscribedParam+'dislike', this.dislike);
  }
  dislikeGetter(id:string){
    this.dislike = this.localSt.retrieve(id);
  }
}
