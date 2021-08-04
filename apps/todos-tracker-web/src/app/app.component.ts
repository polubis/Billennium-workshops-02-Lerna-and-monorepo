import { Component, OnInit } from '@angular/core';
import { minLength, Schema } from '@stackoff/schema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todos-tracker-web';

  ngOnInit(): void {
    console.log(Schema('', [minLength(2)]));
  }
}
