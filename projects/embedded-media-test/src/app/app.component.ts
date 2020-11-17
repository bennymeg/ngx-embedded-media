import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  youtubeVideoId = 'iHhcHTlGtRs';

  update() {
    this.youtubeVideoId = '3Wf29RiKp70';
  }
}
