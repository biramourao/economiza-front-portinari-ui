import { Component, OnInit } from '@angular/core';

import { PoPageAction, PoTableColumn } from '@portinari/portinari-ui';
import { Gasto } from '../model/gasto';
import { ApiService } from '../api.service';
import { GlobalConstantsService } from '../shared/global-constants.service';
import { CategoriaGasto } from '../model/categoria-gasto';
import { formatDate } from '@angular/common';

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
    { property: 'nome', width: '30%', label: 'Descrição' },
    { property: 'valor', width: '15%',type: 'currency', format: 'BRL' },
    { property: 'categoriaGasto', width: '20%', label: 'Categoria' },
    { property: 'vencimento', width: '15%', type: 'date' },
    { property: 'pago', width: '15%', label: 'Pagamento', type: 'label',labels: [
      { value: 'PAGO', color: 'color-11', label: 'Pago' },
      { value: 'NAO PAGO', color: 'color-08', label: 'A Pagar' }] }
  ];

  items: Array<any> = [];
  inicio = this.primeiroDiaMes();
  fim = this.ultimoDiaMes();
  gastos = new Array<Gasto>();
  gasto = new Gasto();
  sortedData = new Array<Gasto>();

  constructor(private apiService: ApiService, private globalConstants: GlobalConstantsService) {

   /*this.inicio = this.primeiroDiaMes();
    this.fim = this.ultimoDiaMes();*/
    this.inicio = this.primeiroDiaMes();
    this.fim = this.ultimoDiaMes();
    this.atualizaGastos(this.primeiroDiaMes(), this.ultimoDiaMes());
    
  }

  ngOnInit() {
    this.atualizaGastos(this.inicio, this.fim);
   }

  loadItems(data: any[]){
    data.forEach(element => {
      let item: {nome: string, valor: string, categoriaGasto: string, vencimento: string, pago: string, dtPagamento: string, type: string};
      item.nome = element.nome,
      item.valor = element.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      item.categoriaGasto = element.categoriaGasto.descricao;
      item.vencimento = formatDate(element.vencimento, 'dd/MM/yyyy', 'en-US');
      if (element.dtPagamento === null) {
        item.pago = 'NAO PAGO';
        item.dtPagamento = 'NÃO PAGO'
        item.type = 'danger'

      }else{
        item.pago = 'PAGO';
        item.dtPagamento = formatDate(element.dtPagamento, 'dd/MM/yyyy', 'en-US');
        item.type = 'success'
      }
      this.items.push(item);
      
    });
  }

  atualizaGastos(dtInicio: string, dtFim: string) {
    this.apiService.listGasto(dtInicio, dtFim).subscribe(
      data => {
        this.gastos = data as unknown as Gasto[];
        this.globalConstants.setTotalGastos(this.somaGastos(this.gastos));
        this.globalConstants.gastos = data as unknown as Gasto[];
        this.globalConstants.atualizaFontesDeRenda(dtInicio, dtFim);
        this.loadItems(this.gastos);
        console.log(this.items)
      },
      error => {
        console.log(error);
        alert(error.msg);
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
        this.gasto.vencimento = formatDate(data.vencimento, 'yyyy-MM-dd', 'en-US');
        if (this.gasto.dtPagamento) {
          this.gasto.dtPagamento = formatDate(data.dtPagamento, 'yyyy-MM-dd', 'en-US');
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
}

