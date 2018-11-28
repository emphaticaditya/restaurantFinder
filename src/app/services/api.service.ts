import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api_key:string = "a650cfbaf5afcad70c7c0039dbd8c83b";
  private baseUrl:string = "https://developers.zomato.com/api/v2.1/";
  private geoCode:string = "geocode?lat=";
  private locations:string = "locations?query=";
  private location_details:string = "location_details?entity_id=";
  private restaurant_details:string = "restaurant?res_id=";
  private reviews:string = "reviews?res_id=";
  private search:string = "search?q=";

  constructor(private httpClient:HttpClient) { }

  getRestaurantsGeocode(lat:number, long:number){
    const headers = new HttpHeaders().set("user-key", this.api_key);
    return this.httpClient.get<any>(this.baseUrl + this.geoCode + lat + '&lon=' + long, {headers});
  }
  getLocations(location:string){
    const headers = new HttpHeaders().set("user-key", this.api_key);
    return this.httpClient.get<any>(this.baseUrl + this.locations + location, {headers});
  }
  getLocationDetails(entity_id:number, entity_type:string){
    const headers = new HttpHeaders().set("user-key", this.api_key);
    return this.httpClient.get<any>(this.baseUrl + this.location_details + entity_id + '&entity_type=' + entity_type, {headers})
  }
  getRestaurantDetails(id:number){
    const headers = new HttpHeaders().set("user-key", this.api_key);
    return this.httpClient.get<any>(this.baseUrl + this.restaurant_details + id, {headers});
  }
  getReviews(id:number){
    const headers = new HttpHeaders().set("user-key", this.api_key);
    return this.httpClient.get<any>(this.baseUrl + this.reviews + id, {headers});
  }
  getSearchedResults(query:string, page:number, lat:string, lon:string){
    const headers = new HttpHeaders().set("user-key", this.api_key);
    return this.httpClient.get<any>(this.baseUrl + this.search + query + '&start=' + page + '&lat=' + lat + '&lon=' + lon, {headers});
  }

}
