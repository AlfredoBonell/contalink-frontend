import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from './rest.service';
import { Invoice } from './Invoice';

import * as _moment from 'moment';
import { Moment } from 'moment';
import { HttpParams } from '@angular/common/http';

const moment = _moment;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  title = 'contalink-frontend';

  fechaInicio!: string;
  fechaFin!: string;

  constructor(private restService: RestService) { }

  response: any;
  responseList = [];
  invoices: Invoice[] = [];

  startChange(event: { value: any; }) {
    this.fechaInicio = moment(event.value, "DD/MM/YYYY").format("YYYY-MM-DD");
    console.log("La fecha inicio es: " + this.fechaInicio);
  }

  endChange(event: { value: any; }) {
    this.fechaFin = moment(event.value, "DD/MM/YYYY").format("YYYY-MM-DD");
    console.log("La fecha final es: " + this.fechaFin);

    let queryParams = new HttpParams();
    queryParams = queryParams.append("fechaInicio", this.fechaInicio);
    queryParams = queryParams.append("fechaFin", this.fechaFin);

    this.restService.getReporte(queryParams).subscribe(
      (res) => {
        this.response = res;
        if(this.response.codigo_respuesta == 200){
          this.responseList = this.response.invoicesList;
          this.invoices = this.responseList;
        }
        else{
          alert("No hay facturas para mostrar");
          this.invoices = this.responseList;
        }
        
        // if (this.lis.length > 0) {
        //   this.invoices = this.lis;
        //   console.log(res);
        // }
        // else {
        //   alert("No hay facturas para mostrar");
        //   this.invoices = res.invoicesList;
        // }
      },
      (err) => {
        console.log(err);
        alert("Error al obtener las facturas");
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
