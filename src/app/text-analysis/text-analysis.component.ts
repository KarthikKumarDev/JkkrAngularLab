import { Component, OnInit } from '@angular/core';
import { TextAnalysisService } from '../services/text-analysis.service';

@Component({
  selector: 'text-analysis',
  templateUrl: 'text-analysis.component.html',
  styleUrls: ['text-analysis.scss'],
})
export class TextAnalysisComponent {
  textAnalysisService: TextAnalysisService;
  textAnalysisScore: string;
  isScoreAvailable: boolean;
  tokens: string;
  words: string;
  positiveWords: string;
  negativeWords: string;
  isLoading: boolean;

  constructor(textAnalysisService: TextAnalysisService) {
    this.textAnalysisService = textAnalysisService;
  }

  public callTextAnalysis(text: any) {
    this.isLoading = true;
    this.textAnalysisService.callTextAnalysisAPI(text).subscribe(data => {
      this.isScoreAvailable = true;
      this.textAnalysisScore = data.score;
      this.tokens = data.tokens;
      this.words = data.words;
      this.positiveWords = data.positive;
      this.negativeWords = data.negative;
      this.isLoading = false;
    });
  }
}
