// Copyright 2019 Benny Megidish

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, OnInit, Input } from '@angular/core';
import { Provider } from '../factories/providers.factory';
import { EmbeddedMediaService } from '../services/media.service';
import { Styles, Attributes, Options } from '../interfaces/interfaces';

@Component({
  selector: 'embedded-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  embeddedMediaHtml: string = '';
  mediaOptions: Options = {};

  @Input('video') video?: string;
  @Input('image') image?: string;
  @Input('provider') provider?: Provider;
  @Input('classes') classes?: string[];
  @Input('styles') styles?: Styles;
  @Input('attributes') attributes?: Attributes | string;  // fixme: remove string option on next release
  @Input('query') query?: string;
  @Input('resolution') options?: string;
  // @Input('ratio') ratio?: string;

  constructor(private _mediaService: EmbeddedMediaService) { }

  ngOnInit() {
    this.parseMediaOptions();

    if (this.video) {
      this.embeddedMediaHtml = this._mediaService.getMedia(this.video, 'video', this.provider, this.mediaOptions);
    } else if (this.image) {
      this._mediaService.getMedia(this.image, 'image', this.provider, this.mediaOptions).then(response => {
        this.embeddedMediaHtml = response.html;
      }).catch(error => console.error('embedded-media:', error));
    } else {
        console.error('embedded-media:', 'media url is missing');
    }
  }

  parseMediaOptions() {
    if (this.query) this.mediaOptions['query'] = JSON.parse(this.query);

    if (this.attributes) {
      if (typeof this.attributes === 'string') {  // fixme: remove string option on next release
        this.mediaOptions['attributes'] = JSON.parse(this.attributes);
      } else {
        this.mediaOptions['attributes'] = this.attributes;
      }
    } else if (this.classes || this.styles) {
      this.mediaOptions['attributes'] = {};
    }

    if (this.classes) {
      if (this.mediaOptions['attributes']['class']) {
        this.mediaOptions['attributes']['class'] = 
          this.mediaOptions['attributes']['class'].toString().concat(' ', this.classes.join(' '));
      } else {
        this.mediaOptions['attributes']['class'] = this.classes.join(' ');
      }
    }

    if (this.styles) {
      if (this.mediaOptions['attributes']['style']) {
        this.mediaOptions['attributes']['style'] = 
          JSON.stringify(Object.assign(JSON.parse(this.mediaOptions['attributes']['style'].toString()), this.styles));
      } else {
        this.mediaOptions['attributes']['style'] = JSON.stringify(this.styles);
      }
    }

    if (this.options) this.mediaOptions['resolution'] = this.options;
  }

  isValidRatio(ratio: string): boolean {
    let expression = new RegExp('^\d+([.]\d+)?:\d+([.]\d+)?$');

    return expression.test(ratio);
  }

}
