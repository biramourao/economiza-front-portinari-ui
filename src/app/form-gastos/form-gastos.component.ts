import {Component, OnInit} from '@angular/core';
import {Gasto} from "../model/gasto";
import {PoDynamicFormField, PoNotificationService} from "@portinari/portinari-ui";

@Component({
  selector: 'app-form-gastos',
  templateUrl: './form-gastos.component.html',
  styleUrls: ['./form-gastos.component.css']
})
export class FormGastosComponent implements OnInit {

  gasto: Gasto = new Gasto();
  /*
  cod: number;
	nome: string;
	valor: number;
	vencimento: any;
	qtdParcelas: number;
	dtPagamento: any;
	categoriaGasto = new CategoriaGasto();
	cartaoDeCredito: CartaoDeCredito;
	*/

  fields: Array<PoDynamicFormField> = [
    {
      property: 'nome',
      label: 'Nome',
      required: true,
      minLength: 1,
      gridColumns: 6,
      gridSmColumns: 12
    },
    {
      property: 'valor',
      label: 'Valor',
      type: 'currency',
      gridColumns: 6,
      gridSmColumns: 12,
      errorMessage: 'erro'
    },
    {
      property: 'vencimento',
      label: 'Vencimento',
      type: 'date',
      gridColumns: 6,
      gridSmColumns: 12,
      errorMessage: 'The date must be before the year 2010.'
    }
  ];

  constructor(public poNotification: PoNotificationService) {
  }

  ngOnInit() {
  }

  salvar() {
    console.log(this.gasto);
  }

}
