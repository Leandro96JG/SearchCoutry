import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, } from '@angular/core';
import { Subject, Subscription, debounceTime, pipe } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit,OnDestroy {
  // subject es un tipo esp de observable
  private debouncer:Subject<string> = new Subject<string>();
  //

  // ? opcional por que la primera vez que inicia la paguina no hay ningun llamado de subcripcion
  private debouncerSubscription?:Subscription;


  @Input()
  public placeholder:string = '';

  @Input()
  public inicialValue?:string = '';

  @Output()
  public eventEmmit:EventEmitter<string>= new EventEmitter();
  @Output()
  public onDebounce:EventEmitter<string>= new EventEmitter();


  ngOnInit(): void {
    this.debouncerSubscription =this.debouncer
    .pipe(debounceTime(500)
    )
    .subscribe(value =>{
      this.onDebounce.emit(value);
    })
  }

  //ngDestroy es un metodo que se va a llamar cuando esta instancia del componente este destruido(ej cambio de ruta)
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

 sendEvent(tern: string):void{
 this.eventEmmit.emit(tern);
 }
 onKeyPress( searchTerm:string){

  //next: para hacer la sig emision del observable
  this.debouncer.next(searchTerm);
 }

}
