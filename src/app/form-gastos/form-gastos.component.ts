import {Component, OnInit} from '@angular/core';
import {Gasto} from "../model/gasto";
import {PoDynamicFormField, PoNotificationService, PoSelectComponent, PoSelectOption} from "@po-ui/ng-components";
import {CategoriaGasto} from "../model/categoria-gasto";
import {ApiService} from "../api.service";
import {map} from "rxjs";

@Component({
  selector: 'app-form-gastos',
  templateUrl: './form-gastos.component.html',
  styleUrls: ['./form-gastos.component.css']
})
export class FormGastosComponent implements OnInit{

  gasto: Gasto = new Gasto();
  categorias: Array<PoSelectOption>;
  fields: Array<PoDynamicFormField>;

  constructor(public poNotification: PoNotificationService, private readonly apiService: ApiService) {
  }

  async ngOnInit() {
    await this.obterCategoriasDeGasto();
    this.initForm();
  }

  async obterCategoriasDeGasto() {
    this.categorias = new Array<PoSelectOption>();
    await this.apiService.listCategoriaDeGasto().pipe(
      map(categorias => {
        categorias.map(
            categoria => {
              let tempCategoria = {
                label: categoria.descricao,
                value: categoria.cod
              } as PoSelectOption
              this.categorias.push(tempCategoria);
              console.log(this.categorias);
            }
          )
        }
      )
    ).subscribe()
  }
  initForm(){
    this.fields = [
      {
        property: 'nome',
        label: 'Nome',
        required: true,
        placeholder: 'Digite a descrição',
        minLength: 1,
        gridColumns: 6,
        gridSmColumns: 12,
        order: 1
      },
      {
        property: 'valor',
        label: 'Valor',
        type: 'currency',
        icon: 'po-icon-finance',
        gridColumns: 6,
        gridSmColumns: 12,
        errorMessage: 'erro',
        required: true,
        placeholder: 'Digite o valor',
        order: 2
      },
      {
        property: 'vencimento',
        label: 'Vencimento',
        type: 'date',
        gridColumns: 6,
        gridSmColumns: 12,
        placeholder: 'Selecione o vencimento',
        format: 'DD/MM/YYYY',
        required: true
      },
      {
        property: 'dtPagamento',
        label: 'Pagamento',
        type: 'date',
        gridColumns: 6,
        gridSmColumns: 12,
        placeholder: 'Selecione a data de pagamento',
        format: 'DD/MM/YYYY',
        required: true
      },
      {
        property: 'categoriaGasto.id',
        label: 'Categoria',
        placeholder: 'Selecione a categoria',
        gridColumns: 6,
        options: this.categorias
      }

    ];
  }

  salvar() {
    console.log(this.gasto);
  }

}
