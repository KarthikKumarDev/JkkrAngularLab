import { Component } from '@angular/core';
import { Person} from './entities/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  isDarkTheme: boolean = false;  
}
