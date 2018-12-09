import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Person } from '../entities/person';
import * as HighchartsMore from 'highcharts/highcharts-more.src.js';
import { GitHubService } from '../services/github.service';
import { element } from '../../../node_modules/protractor';
import { isEmpty } from '../../../node_modules/rxjs/operators';

HighchartsMore(Highcharts);

@Component({
  selector: 'git-stats',
  templateUrl: 'git-stats.component.html',
  styleUrls: ['git-stats.scss'],
})
export class GitStatsComponent {

  repoGraphOptions: any;
  contributionGraphOptions: any;
  languageGraphOptions: any;
  isDataLoaded: Boolean;
  gitHubService: any;
  person: Person;
  repoNameAndSizeArray = [];
  additions = [];
  deletions = [];
  commits = [];
  dateTimes = [];
  repoListForRepoSizeGraph = [];
  repoListForLanguageGraph = [];
  languagesAndUsage = [];

  constructor(gitHubService: GitHubService) {

    this.gitHubService = gitHubService;
    this.visualiseRepoSizeInfo();
    this.visualiseContributionsInfo();
    this.visualizeLanguagesChart();
  }

  private visualiseRepoSizeInfo() {
    this.gitHubService.getAllRepos().subscribe(data => {
      data.forEach(element => {
        if (!element.fork && !element.name.includes('-')) {
          this.repoNameAndSizeArray.push([element.name, element.size]);
          this.repoListForRepoSizeGraph.push(element.name);
        }
      });
      this.initRepoSizeGraph();
    });
  }

  private initRepoSizeGraph() {

    const visualiseContributionInfoBindedMethod = this.visualiseContributionsInfo.bind(this);

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
        data: this.repoNameAndSizeArray,
        point: {
          events: {
            click: function (evt) {
              visualiseContributionInfoBindedMethod(this.name);
            }
          }
        }
      }]
    };
    var repoInfochart = new Highcharts.Chart(this.repoGraphOptions);
  }

  public visualiseContributionsInfo(repoName = "angular") {
    this.resetDataArrays();
    this.gitHubService.getRepoStats(repoName).subscribe(data => {
      if(Object.keys(data).length ===0){
        this.visualiseContributionsInfo(repoName);
        return;
      }
      data[0].weeks.forEach(element => {
        if (element.c) {
          this.additions.push(element.a);
          this.deletions.push(element.d);
          this.commits.push(element.c);
          this.dateTimes.push(this.gitHubService.convertUnixTimeStampToUTC(element.w));
        }
      });
      this.initContributionGraph(repoName);
    });
  }

  private initContributionGraph(repoName: string) {
    this.contributionGraphOptions =
      {
        chart: {
          type: 'area',
          renderTo: 'container2',
        },
        title: {
          text: 'Project ' + repoName + ' Contributions'
        },
        subtitle: {
          text: 'Additions, Deletions, Commits'
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
          data: this.additions,
        },
        {
          name: 'Deletions',
          data: this.deletions
        }, {
          name: 'Commits',
          data: this.commits
        }]
      }
    var contributionChart = new Highcharts.Chart(this.contributionGraphOptions);
    this.isDataLoaded = true;
  }

  private visualizeLanguagesChart(): any {
    this.gitHubService.getAllRepos().subscribe(data => {
      data.forEach(element => {
        if (!element.fork && !element.name.includes('-')) {
          this.repoListForLanguageGraph.push(element.name);
        }
      });
      this.initLanguageAndUsage();
    });
  }

  private initLanguageAndUsage(): any {
    var counter = 0;
    this.repoListForLanguageGraph.forEach(element => {
      this.gitHubService.getLanguageUsage(element).subscribe(data => {
        counter++;
        var keyNames = Object.keys(data);
        keyNames.forEach(key => {
          if (key in this.languagesAndUsage) {
            this.languagesAndUsage[key] += data[key]
          }
          else {
            this.languagesAndUsage[key] = data[key]
          }
        });
        // TODO: Refactor this part to work with aync methods and foreach
        if (counter == this.repoListForLanguageGraph.length)
          this.initLanguageRepoGraph();
      });
    });

  }

  private initLanguageRepoGraph() {

    // Extract the Language byte values and add a random color to the data
    var dataArray = [];
    for (var key in this.languagesAndUsage) {
      dataArray.push({ y: this.languagesAndUsage[key], color: '#'+(Math.random()*0xFFFFFF<<0).toString(16)});
    }
    this.languageGraphOptions =
      {
        chart: {
          type: 'column',
          renderTo: 'container3',
        },
        title: {
          text: 'Language Contributions'
        },
        xAxis: {
          categories: Object.keys(this.languagesAndUsage),
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Bytes of Code'
          }
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          showInLegend: false,
          name: 'Bytes',
          data: dataArray
        }]
      }
    var languagesChart = new Highcharts.Chart(this.languageGraphOptions);

    this.isDataLoaded = true;
  }

  onRepoSelectionChanged(evt: any) {
    this.visualiseContributionsInfo(evt.value)
  }

  private resetDataArrays() {
    this.dateTimes = [];
    this.additions = [];
    this.deletions = [];
    this.commits = [];
  }
}