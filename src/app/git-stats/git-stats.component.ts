import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Person } from '../entities/person';
import * as HighchartsMore from 'highcharts/highcharts-more.src.js';
import { GitHubService } from '../services/github.service';

HighchartsMore(Highcharts);

@Component({
  selector: 'git-stats',
  templateUrl: 'git-stats.component.html',
  styleUrls: ['git-stats.scss'],
})
export class GitStatsComponent {
  options: any;
  person: Person;
  dataArray = [];

  constructor(gitHubService: GitHubService) {
    gitHubService.getAllRepos().subscribe(data => {
      data.forEach(element => {
        if (!element.fork) {
          this.dataArray.push([element.name, element.size])
        }
      });
      this.InitContributionInfoGraph();
    })
  }
  
  private InitContributionInfoGraph() {
    this.options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        renderTo: 'container1',
        type: 'pie'
      },
      title: {
        text: 'Contribution Info'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: this.dataArray
      }]
    };
    var chart = new Highcharts.Chart(this.options);
  }
}