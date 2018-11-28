import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GeocodeComponent } from '../geocode/geocode.component';
import { Router } from "@angular/router";
import { RestaurantDetailsComponent } from '../restaurant-details/restaurant-details.component';
import { SearchComponent } from '../search/search.component';
import { LocationComponent } from '../location/location.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //form data
  searchForm = new FormGroup({
    'searchInput': new FormControl('')
  })

  constructor(private geoCode:GeocodeComponent, private router: Router, private detailedRestaurant:RestaurantDetailsComponent, private searchedResult:SearchComponent, private locComp:LocationComponent) { }

  ngOnInit() {
  }
  //search case handling
  search(event:any){
    event.preventDefault();
    console.log(this.geoCode.global_lat,this.geoCode.global_lon, this.detailedRestaurant.lat_global,this.detailedRestaurant.lon_global, this.searchedResult.subscribedLat)
    if(this.geoCode.global_lat && this.geoCode.global_lon){
      this.router.navigate(["search", this.searchForm.value.searchInput, this.geoCode.global_lat, this.geoCode.global_lon]);
    }
    else if(this.locComp.global_lat && this.locComp.global_lon){
      this.router.navigate(["search", this.searchForm.value.searchInput, this.locComp.global_lat, this.locComp.global_lon]);
    }
    else if(this.detailedRestaurant.lat_global && this.detailedRestaurant.lon_global){
      this.router.navigate(["search", this.searchForm.value.searchInput, this.detailedRestaurant.lat_global, this.detailedRestaurant.lon_global]);
    }
    else{
      this.router.navigate(["search", this.searchForm.value.searchInput, this.searchedResult.subscribedLat, this.searchedResult.subscribedLon]);
      this.searchedResult.getSerchedData(this.searchForm.value.searchInput, 0, this.searchedResult.subscribedLat, this.searchedResult.subscribedLon);
    }
    
  }

}
