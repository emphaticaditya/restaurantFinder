import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-geocode',
  templateUrl: './geocode.component.html',
  styleUrls: ['./geocode.component.css']
})
export class GeocodeComponent implements OnInit {
  private subscribedLat:string;
  private subscribedLon:string;
  private lat:number;
  private lon:number;
  private locality:string;
  private city:string;
  private restaurants:Array<any>;
  public global_lat:string;
  public global_lon:string;

  constructor(private apiService:ApiService, private router: Router, private readonly route: ActivatedRoute) { }

  ngOnInit() {
    //for getting param query from url
    this.route.paramMap.subscribe(params => {
      this.subscribedLat = params.get("lat");
      this.subscribedLon = params.get("long");
      this.lat = +this.subscribedLat;
      this.lon = +this.subscribedLon;
    });
    this.getDataGeoLocator(this.lat,this.lon);
  }
  //gets data on longitude and latitude
  getDataGeoLocator(latitude:number, longitude:number){
    return this.apiService.getRestaurantsGeocode(latitude, longitude).subscribe(
      data=>{
        this.locality = data.location.title;
        this.city = data.location.city_name;
        this.restaurants = data.nearby_restaurants;
        this.global_lat = data.location.latitude;
        this.global_lon = data.location.longitude;
      },
      (error)=>{
        console.log(error.error.message);
      }
    )
  }
  //navigates to restaurant detailed view
  detailedRestaurants(index:number, event:any){
    event.preventDefault();
    let rest_id = this.restaurants[index].restaurant.id;
    this.router.navigate(["restaurants", rest_id]);
  }

}
