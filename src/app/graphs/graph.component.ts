import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Person } from '../entities/person';
import * as HighchartsMore from 'highcharts/highcharts-more.src.js';
HighchartsMore(Highcharts); 

@Component({
  selector: 'graph',
  templateUrl: 'graph.component.html',
  styleUrls:['graph.scss'],
  
})
export class GraphComponent implements OnInit{
    options:any;
    person: Person;
constructor(){
    this.options = {
      chart: {
        polar:true,
        type:'line',
        renderTo:'container1',
        backgroundColor: '#ECEFF1'
    },
  
    
    xAxis:{
      categories:['DotNet','Java','Database','BigData'],
      tickmarkPlacement: 'on',
      lineWidth: 0
     
    },
     yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        max:10,
    },

      series: [
        {
        name:'Expected',
        data:[8,5,9,7],
        pointPlacement:'on',
         color: '#009900',
        }
      ],
      title: {
            text: 'Quantium'
        }
      
};
 // 
}
  ngOnInit(): void {
      if(this.person = JSON.parse(localStorage.getItem("person"))){
      var dataArr=[0,0,0,0];
      dataArr[0]= this.person.dotnet;
      dataArr[1]= this.person.java
      dataArr[2]= this.person.database;
      dataArr[3]=this.person.bigdata;
      var newSeriesData = {
        name: this.person.name,
        data: dataArr,
        pointPlacement:'on'
      };
      // Add the new data to the series array
      this.options.series.push(newSeriesData);
      }
      var chart = new Highcharts.Chart(this.options);
  }
}