import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private subscribedQuery:string;
  public subscribedLat:string;
  public subscribedLon:string;
  private lat:number;
  private lon:number;
  private locality:string;
  private city:string;
  private restaurants:Array<any>;
  private pageNum:number=0;
  private pageArr:Array<number>;
  private result_count:number;
  private results_shown:number;
  private pagination:boolean = false;
  private currentPage:number = 1;
  

  constructor(private apiService:ApiService, private router: Router, private readonly route: ActivatedRoute) { }

  ngOnInit() {
     //for getting param query from url
     this.route.paramMap.subscribe(params => {
      this.subscribedQuery = params.get("query");
      this.subscribedLat = params.get("lat");
      this.subscribedLon = params.get("long");
      this.lat = +this.subscribedLat;
      this.lon = +this.subscribedLon;
    });
    this.getSerchedData(this.subscribedQuery,this.pageNum, this.subscribedLat, this.subscribedLon);
    this.apiService.getRestaurantsGeocode(this.lat, this.lon).subscribe(
      data=>{
        this.locality = data.location.title;
        this.city = data.location.city_name;
      },
      (error)=>{
        console.log(error.error.message);
      }
    )
    
  }
  //gets search results
  getSerchedData(q:string, page:number, lat:string, lon:string){
    return this.apiService.getSearchedResults(q, page, lat, lon).subscribe(
      data=>{
        this.restaurants = data.restaurants;
        this.result_count = data.results_found;
        this.results_shown = data.results_shown;
        this.paginationData(this.result_count, this.results_shown);
      },
      (error)=>{
        console.log(error.error.message);
      }
    )
  }
  //handling pagination
  paginationData(count:number, results:number){
    if(this.result_count>this.results_shown){
      this.pagination = true;
      this.pageArr = new Array();
      let pages = this.result_count/this.results_shown;
      if(pages<5){
        for(var i=1; i<=pages; i++){
          this.pageArr.push(i);
        }
      }
      else{
        for(var i=1; i<=5; i++){
          this.pageArr.push(i);
        }
      }
    }
  }
  //change page function
  changePage(index:number, event:any){
    event.preventDefault();
    let pageStart = index*20;
    this.currentPage = index+1;
    this.getSerchedData(this.subscribedQuery,pageStart, this.subscribedLat, this.subscribedLon);
  }
  //detailed restaurant view navigator
  detailedRestaurant(index:number, event:any){
    event.preventDefault();
    let rest_id = this.restaurants[index].restaurant.id;
    this.router.navigate(["restaurants", rest_id]);
  }

}
