import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  subscribedLocation:string;
  private locality:string;
  private city:string;
  private restaurants:Array<any>;
  public global_lat:string;
  public global_lon:string;
  constructor(private apiService:ApiService, private router: Router, private readonly route: ActivatedRoute) { }

  ngOnInit() {
    //for getting param query from url
    this.route.paramMap.subscribe(params => {
      this.subscribedLocation = params.get("location");
    });
    this.locationResponse(this.subscribedLocation);
  }
  //gets restaurants based on location
  locationResponse(location:string){
    return this.apiService.getLocations(location).subscribe(
        data=>{
          this.apiService.getLocationDetails(data.location_suggestions[0].entity_id, data.location_suggestions[0].entity_type).subscribe(
            res=>{
              this.locality = res.location.title;
              this.city = res.city;
              this.restaurants = res.best_rated_restaurant;
              this.global_lat = res.location.latitude;
              this.global_lon = res.location.longitude;
            },
            (error)=>{
              console.log(error.error.message);
            }
          )
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
