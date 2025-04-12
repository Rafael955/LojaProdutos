import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { config } from '../../../config/environment';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    NavbarComponent,
    CommonModule,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  dados: any[] = [];
  grafico: Chart = new Chart();

  mensagem_erro: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`${config.produtosapi_dashboard}/obter-dados-fornecedores-produtos`)
      .subscribe({
        next: (data: any) => {
          this.dados = data as any[];

          //montando os dados no padrão do highcharts
          const series: any[] = [];
          this.dados.forEach(item => {
            series.push([item.fornecedor, item.produtos])
          });

          //criando o gráfico
          this.grafico = new Chart({
            chart: { type: 'pie' },
            title: { text: 'Quantidade de produtos por fornecedor.' },
            subtitle: { text: 'Somatório da quantidade de produtos para cada fornecedor' },
            credits: { enabled: false },
            plotOptions: {
              pie: {
                innerSize: '50%',
                dataLabels: { enabled: true }
              }
            },
            series: [{ data: series, type: 'pie', name: 'Fornecedores' }],
            legend: { enabled: false }
          });

        }, error: (err) => {
          this.mensagem_erro = err.error.message;
        }
      })
  }
}
