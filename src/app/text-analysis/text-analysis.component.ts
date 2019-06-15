import { Component, OnInit } from '@angular/core';
import { TextAnalysisService } from '../services/text-analysis.service';

@Component({
  selector: 'text-analysis',
  templateUrl: 'text-analysis.component.html',
  styleUrls: ['text-analysis.scss'],
})
export class TextAnalysisComponent {
  textAnalysisService: any;
  textAnalysisScore: string;
  isScoreAvailable: boolean;
  tokens: any;
  words: any;
  positiveWords: any;
  negativeWords: any;

  constructor(textAnalysisService: TextAnalysisService) {
    this.textAnalysisService = textAnalysisService;
  }

  public callTextAnalysis(text: any) {
    this.textAnalysisService.callTextAnalysisAPI(text).subscribe(data => {
      this.isScoreAvailable = true;
      this.textAnalysisScore = data.score;
      this.tokens = data.tokens;
      this.words = data.words;
      this.positiveWords = data.positive;
      this.negativeWords = data.negative;
    });
  }
}
