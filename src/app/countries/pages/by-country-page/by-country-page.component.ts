import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../service/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit {
  public countries:Country[] = [];
  public isLoading:boolean = false;
  public inicialValue:string ='';

  constructor(private countriesService:CountriesService){}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.inicialValue = this.countriesService.cacheStore.byCountries.term;
  }
  searchByCountry(value:string){
    this.isLoading = true;

    this.countriesService.searchCountry(value)
    .subscribe(countries =>
    {this.countries = countries;
      this.isLoading = false;
    });
  }

}
