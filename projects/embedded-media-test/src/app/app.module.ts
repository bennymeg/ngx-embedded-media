import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmbeddedMediaModule } from 'embedded-media';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EmbeddedMediaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
