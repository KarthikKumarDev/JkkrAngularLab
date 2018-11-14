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
  repoGraphOptions: any;
  contributionGraphOptions: any;

  person: Person;
  dataArray = [];
  additions = [];
  deletions = [];
  dateTimes = [];

  constructor(gitHubService: GitHubService) {
    this.visualiseRepoSizeInfo(gitHubService);
    this.visualiseContributionsInfo(gitHubService);
  }

  private visualiseRepoSizeInfo(gitHubService: GitHubService) {
    gitHubService.getAllRepos().subscribe(data => {
      data.forEach(element => {
        if (!element.fork) {
          this.dataArray.push([element.name, element.size]);
        }
      });
      this.initRepoSizeGraph();
    });
  }

  private initRepoSizeGraph() {
    this.repoGraphOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        renderTo: 'container1',
        type: 'pie'
      },
      title: {
        text: 'Repo Size'
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
        name: 'size',
        colorByPoint: true,
        data: this.dataArray
      }]
    };
    var repoInfochart = new Highcharts.Chart(this.repoGraphOptions);
  }

  private visualiseContributionsInfo(gitHubService: GitHubService) {
    gitHubService.getRepoStats("angular").subscribe(data => {
      data[0].weeks.forEach(element => {
        if (element.c) {
          this.additions.push(element.a);
          this.deletions.push(element.d);
          this.dateTimes.push(gitHubService.convertUnixTimeStampToUTC(element.w));
        }
      });
      console.log(this.dateTimes)
      this.initContributionGraph();
    });
  }

  private initContributionGraph() {
    this.contributionGraphOptions =
      {
        chart: {
          type: 'area',
          renderTo: 'container2',
        },
        title: {
          text: 'This Project Contributions'
        },
        subtitle: {
          text: 'Additions, Deletions'
        },
        xAxis: {
          categories: this.dateTimes,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'count'
          }
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: 'Additions',
          data: this.additions
        },
        {
          name: 'Deletions',
          data: this.deletions
        }]
      }
    var contributionChart = new Highcharts.Chart(this.contributionGraphOptions);
  }
}