import { Orden } from './../../modelos/orden';
import { OrdenController } from './../../controladores/orden-controller.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-grafica-ordenes',
  templateUrl: './grafica-ordenes.component.html',
  styleUrls: ['./grafica-ordenes.component.scss']
})
export class GraficaOrdenesComponent implements OnInit {


  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: { beginAtZero: true },
        position: 'left',
        scaleLabel: { display: true, labelString: 'N° Ordenes' }
      }],
      xAxes: [{
        labels: ['Estado'],
        ticks: { beginAtZero: true }
      }]
    },
    tooltips: { mode: 'point' },
    animation: {
      duration: 1000,
      easing: 'easeInCubic'
    },
  };

  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataSets[] = [];
  ordenes: Orden[] = [];

  constructor(private ordenController: OrdenController) { }

  ngOnInit(): void {
    this.getOrdenes();
  }


  getOrdenes() {
    this.ordenController.Ordenes().subscribe(
      ordenes => {
        this.ordenes = ordenes;
        let en_proceso = ordenes.filter(orden => orden.estado == 'En Proceso');
        let en_camino = ordenes.filter(orden => orden.estado == 'En Camino');
        let entregadas = ordenes.filter(orden => orden.estado == 'Entregadas');
        let no_entregadas = ordenes.filter(orden => orden.estado == 'No Entregadas');
        if(ordenes != []) {
          this.barChartData = [
            { data: [en_proceso.length], label: 'En Proceso', backgroundColor: '#ffaf0d', hoverBackgroundColor: '#ffaf0d' },
            { data: [en_camino.length], label: 'En Camino', backgroundColor: '#808080', hoverBackgroundColor: '#808080' },
            { data: [entregadas.length], label: 'Entregadas', backgroundColor: '#008000', hoverBackgroundColor: '#008000' },
            { data: [no_entregadas.length], label: 'No Entregadas', backgroundColor: '#ff0000', hoverBackgroundColor: '#ff0000' },
          ];
        }
        else {
          this.barChartData = [
            { label: 'En Proceso', backgroundColor: '#ffaf0d', hoverBackgroundColor: '#ffaf0d' },
            { label: 'En Camino', backgroundColor: '#808080', hoverBackgroundColor: '#808080' },
            { label: 'Entregadas', backgroundColor: '#008000', hoverBackgroundColor: '#008000' },
            { label: 'No Entregadas', backgroundColor: '#ff0000', hoverBackgroundColor: '#ff0000' },
          ]
        }
      },
      error => console.log(error)
    );
  }

}
