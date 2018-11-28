import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantsComponent } from '../components/restaurants/restaurants.component';
import { RestaurantDetailsComponent } from '../components/restaurant-details/restaurant-details.component';
import { SearchComponent } from '../components/search/search.component';
import { GeocodeComponent } from '../components/geocode/geocode.component';
import { LocationComponent } from '../components/location/location.component';

// Routes
const routes : Routes = [
  {
      path: '',
      component: RestaurantsComponent
  },
  {
    path: 'geocode/:lat/:long',
    component: GeocodeComponent
  },
  {
    path: 'locations/:location',
    component: LocationComponent
  },
  {
    path: 'restaurants/:restaurant',
    component: RestaurantDetailsComponent
  },
  {
    path: 'search/:query/:lat/:long',
    component: SearchComponent
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
