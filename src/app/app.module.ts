import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { ApiService } from '../app/services/api.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { AppComponent } from './app.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LocationComponent } from './components/location/location.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { SearchComponent } from './components/search/search.component';
import { GeocodeComponent } from './components/geocode/geocode.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    NavbarComponent,
    LocationComponent,
    RestaurantDetailsComponent,
    SearchComponent,
    GeocodeComponent
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [ApiService, RestaurantsComponent, NavbarComponent, RestaurantDetailsComponent, GeocodeComponent, SearchComponent, LocationComponent, NgxWebstorageModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
