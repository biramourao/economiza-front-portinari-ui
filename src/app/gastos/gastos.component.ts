import { Component, OnInit } from '@angular/core';

import { Gasto } from '../model/gasto';
import { ApiService } from '../api.service';
import { GlobalConstantsService } from '../shared/global-constants.service';
import { CategoriaGasto } from '../model/categoria-gasto';
import { formatDate } from '@angular/common';
import { GastoTable } from '../model/gasto-table'
import {PoPageAction, PoTableColumn} from "@po-ui/ng-components";

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {
  readonly actions: Array<PoPageAction> = [
    // actions of table here
  ];

  readonly columns: Array<PoTableColumn> = [
    // columns of table here
    { property: 'pago', width: '10%', label: 'Pago', type: 'subtitle',subtitles: [
      { value: 'PAGO', color: 'color-11', label: 'Pago', content: 'P' },
      { value: 'NAO PAGO', color: 'color-08', label: 'A Pagar', content:'N' }] },
    { property: 'nome', width: '60%', label: 'Descrição' },
    { property: 'valor', width: '30%' }
  ];

  items: Array<any> = [];
  inicio = this.primeiroDiaMes();
  fim = this.ultimoDiaMes();
  gastos = new Array<Gasto>();
  gasto = new Gasto();
  sortedData = new Array<Gasto>();
  lock = false;

  constructor(private apiService: ApiService, private globalConstants: GlobalConstantsService) {

   /*this.inicio = this.primeiroDiaMes();
    this.fim = this.ultimoDiaMes();*/
    this.inicio = this.primeiroDiaMes();
    this.fim = this.ultimoDiaMes();

  }

  ngOnInit() {
    this.atualizaGastos(this.inicio, this.fim);
   }

  loadItems(data: any[]){
    let tempItems = [];

    data.forEach(element => {
      let item = new GastoTable();
      item.nome = element.nome,
      item.valor = element.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      item.categoriaGasto = element.categoriaGasto.descricao;
      item.vencimento = formatDate(element.vencimento, 'dd/MM/yyyy', 'en-US','-0300');
      if (element.dtPagamento === null) {
        item.pago = 'NAO PAGO';
        item.dtPagamento = 'NÃO PAGO'
        item.type = 'danger'

      }else{
        item.pago = 'PAGO';
        item.dtPagamento = formatDate(element.dtPagamento, 'dd/MM/yyyy', 'en-US','-0300');
        item.type = 'success'
      }
      tempItems.push(item);

    });
    this.items = tempItems;

  }

  atualizaGastos(dtInicio: string, dtFim: string) {
    this.lock = true;
    this.apiService.listGasto(dtInicio, dtFim).subscribe(
      data => {
        this.gastos = data as unknown as Gasto[];
        this.globalConstants.setTotalGastos(this.somaGastos(this.gastos));
        this.globalConstants.gastos = data as unknown as Gasto[];
        this.globalConstants.atualizaFontesDeRenda(dtInicio, dtFim);
        this.loadItems(this.gastos);
        console.log(this.items)
        this.lock = false;
      },
      error => {
        console.log(error);
        alert(error.msg);
        this.lock = false;
      }
    );
  }

  excluir(gasto: Gasto) {
    const resposta = confirm('Deseja realmente excluir o gasto \'' + gasto.nome + '\'');
    if (resposta) {
      this.apiService.excluirGasto(gasto.cod).subscribe(
        data => {
          this.atualizaGastos(this.inicio, this.fim);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  cancelarPagamento(cod: number, operacao: string){
    this.apiService.pagarGasto(cod).subscribe(
      data => {
        alert('O Gasto ' + data.nome + ' foi cancelado com sucesso!');
        this.atualizaGastos(this.inicio, this.fim);
      },
      error => {
        console.log(error);
      }
    );
  }
  pagamento() {

    if (this.gasto.categoriaGasto.cod === null) {
      this.gasto.categoriaGasto = null;
    }
    this.apiService.editarGasto(this.gasto).subscribe(
      data => {
        alert('O Gasto ' + data.nome + ' foi pago com sucesso!');
        this.atualizaGastos(this.inicio, this.fim);
      },
      error => {
        console.log(error);
      }
    );
  }
  getGasto(cod: any) {
    this.apiService.getGasto(cod).subscribe(
      data => {
        this.gasto = data;
        this.gasto.vencimento = formatDate(data.vencimento, 'dd/MM/yyyy', 'en-US','-0300');
        if (this.gasto.dtPagamento) {
          this.gasto.dtPagamento = formatDate(data.dtPagamento, 'dd/MM/yyyy', 'en-US','-0300');
        }
        if (data.categoriaGasto === null) {
          this.gasto.categoriaGasto = new CategoriaGasto();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ultimoDiaMes(): string {
    const date = new Date();
    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return formatDate(ultimoDia, 'yyyy-MM-dd', 'en-US','+0430' );
  }

  primeiroDiaMes(): string {
    const date = new Date();
    const primeiroDia = new Date(date.getFullYear(), 1, 1);
    return formatDate(primeiroDia, 'yyyy-MM-dd', 'en-US','+0430');
  }

  somaGastos(gastos: Array<Gasto>): number {
    let totalGastos = 0;
    for (const iterator of gastos) {
      totalGastos += iterator.valor;
    }
    return totalGastos;
  }
  ativaFormCategoriaGasto() {
    if (this.gasto.dtPagamento.search(/([0-9][0-9][0-9][0-9])([ \-])(0?[1-9]|1[012])([ \-])(0?[1-9]|[12][0-9]|3[01])/g) === 0) {
      return false;
    } else {
      return true;
    }
  }
  ativaButtomFiltrar(){
    if ((this.inicio != '' && this.fim != '') && (this.inicio != null && this.fim != null)) {
      return 'false';
    }else{
      return 'true';
    }
  }
  onClick(){
    window.alert("teste");
  }
}

