import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../service/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit{

  public country?:Country;

   constructor(
     private activatedRoute : ActivatedRoute,
     private countriceService:CountriesService,
     private router:Router,
     )
     {}

   ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.countriceService.searchCountryAlphaCode(id)),
    )
    .subscribe(country =>{
      if(!country){
        return this.router.navigateByUrl('')
      }
    this.country = country;
      return
    });






    // this.activatedRoute.params
    // .subscribe(({id}) =>{
    //   this.countriceService.searchCountryAlphaCode(id)
    //   .subscribe(country => {
    //     console.log({country})
    //   })
    // })
  }

}
