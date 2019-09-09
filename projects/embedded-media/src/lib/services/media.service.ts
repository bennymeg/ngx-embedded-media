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

import { Injectable } from '@angular/core';
import { YoutubeProvider } from '../providers/youtube.provider';
import { VimeoProvider } from '../providers/vimeo.provider';
import { DailyMotionProvider } from '../providers/daily-motion.provider';
import { MediaType, Options } from '../providers/media.provider';


export type Provider = 'youtube' | 'vimeo' | 'daily-motion';

@Injectable({
  providedIn: 'root'
})
export class EmbeddedMediaService {

  constructor(private _youtubeProvider: YoutubeProvider, private _vimeoProvider: VimeoProvider, 
    private _dailyMotionProvider: DailyMotionProvider) {}

  public getMedia(urlIdString: string, type: MediaType, provider?: Provider, options?: Options): any {
    if (urlIdString.match(/^[A-Za-z0-9]+$/g)) {
      if (!provider) console.warn('provider is missing');

      return this.getMediaById(urlIdString, type, provider, options);
    } else {
      return this.getMediaFromUrl(urlIdString, type, provider, options);
    }
  }

  public getMediaFromUrl(urlString: string, type: MediaType, provider?: Provider, options?: Options): any {
    let url = new URL(urlString);
    let result: any;

    switch (provider) {
      case 'youtube':
        result = this.getMediaById(this._youtubeProvider.getMediaId(url), type, provider, options);
        break;
      case 'vimeo':
        result = this.getMediaById(this._vimeoProvider.getMediaId(url), type, provider, options);
        break;
      case 'daily-motion':
        result = this.getMediaById(this._dailyMotionProvider.getMediaId(url), type, provider, options);
        break;
      default:
        if (this._youtubeProvider.isValidUrl(url)) {
          return this.getMediaById(this._youtubeProvider.getMediaId(url), type, 'youtube', options);
        } else if (this._vimeoProvider.isValidUrl(url)) {
          return this.getMediaById(this._vimeoProvider.getMediaId(url), type, 'vimeo', options);
        } else if (this._dailyMotionProvider.isValidUrl(url)) {
          return this.getMediaById(this._dailyMotionProvider.getMediaId(url), type, 'daily-motion', options);
        } else {
          console.error(`unknown content provider for '${url}'`);
        }     
    }

    return result;
  }

  public getMediaById(id: string, type: MediaType, provider?: Provider, options?: Options): any {
    let result: any;

    switch (provider) {
      case 'youtube':
        result = this._youtubeProvider.getMedia(id, type, options);
        break;
      case 'vimeo':
        result = this._vimeoProvider.getMedia(id, type, options);
        break;
      case 'daily-motion':
        result = this._dailyMotionProvider.getMedia(id, type, options);
        break;
      default:
        console.error(`unknown content provider '${provider}'`); 
    }

    return result;
  }
   
}
