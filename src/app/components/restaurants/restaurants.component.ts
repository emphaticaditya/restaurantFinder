import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  constructor(private apiService:ApiService, private router: Router) { }
  
  ngOnInit() {
  }
  //uses browser's location api
  geoLocator() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.router.navigate(["geocode", position.coords.latitude, position.coords.longitude]);
      });
    } 
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  //for navigating with data
  locationData(location:string){
    this.router.navigate(["locations", location]);
  }
}
