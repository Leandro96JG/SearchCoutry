import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../service/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit{

public countries:Country[] = [];
public isLoading:boolean = false;
public inicialValue:string = '';

  constructor(private countriesService:CountriesService){}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.inicialValue = this.countriesService.cacheStore.byCapital.term;
    
  }

  searchByCapital(value:string){

   this.isLoading = true;

    this.countriesService.searchCapital(value)
    .subscribe(countries =>
    {this.countries = countries;
      this.isLoading = false;
    });
  }

  onInicialValue(value:string):string{
    return this.inicialValue = value;
  }

}
