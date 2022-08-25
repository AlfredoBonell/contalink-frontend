import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from './rest.service';
import { Invoice } from './Invoice';

import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;
const regExp = new RegExp("([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  
  title = 'contalink-frontend';

  fechaInicio!: string;
  fechaFin!: string;

  constructor(private restService: RestService) { }

  invoices: Invoice[] = [];

  startChange(event: { value: any; }) {
    this.fechaInicio = moment(event.value, "DD/MM/YYYY").format("YYYY-MM-DD");
    console.log("La fecha inicio es: " + this.fechaInicio);

    if (!regExp.test(this.fechaInicio)) {
      alert("La fecha inicio es incorrecta");
    }

  }

  endChange(event: { value: any; }) {
    this.fechaFin = moment(event.value, "DD/MM/YYYY").format("YYYY-MM-DD");
    console.log("La fecha final es: " + this.fechaFin);

    if (!regExp.test(this.fechaFin)) {
      alert("La fecha final es incorrecta");
    }

    this.restService.getReporte(this.fechaInicio, this.fechaFin).subscribe(
      (res)=>{
        console.log(res);
        this.invoices = res;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  ngOnInit(): void {
    // this.restService.getReporte(fecha).subscribe(
    //   (res)=>{
    //     this.invoices = res;
    //   },
    //   (err)=>{
    //     console.log(err);
    //   }
    // )
  }
}
