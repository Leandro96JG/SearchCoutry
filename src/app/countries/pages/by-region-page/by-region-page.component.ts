import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../service/countries.service';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent implements OnInit{

  public countries:Country[] = [];
  public isLoading:boolean = false;
  public regions:Region[] =['Asia','Africa','America','Europe','Oceania']
  public selectedRegion?:Region;

  constructor(private countriesService:CountriesService){}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(value:Region){
    this.selectedRegion = value;
    this.isLoading = true;
    this.countriesService.searchRegion(value)
    .subscribe(countries =>
    {this.countries = countries;
      this.isLoading = false;
    });
  }
}
