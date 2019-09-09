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

import { MediaProvider } from './media.provider';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class YoutubeProvider extends MediaProvider {
    options: string[] = [
        'default',
        'mqdefault',
        'hqdefault',
        'sddefault',
        'maxresdefault'
    ];    

    getImage(id: string, options?: any) {
        options.resolution = this.isValidProviderOption(options.resolution) ? options.resolution : 'default';

        let src = `https://img.youtube.com/vi/${id}/${options.resolution}.jpg`;

        let result = {
            link: src,
            html: `<img src="${src}"/>`
        };

        return Promise.resolve(result);
    }

    getVideo(id: string, options?: any): string {
        options = this.parseGlobalOptions(options);

        return this.sanitize_iframe('<iframe src="https://www.youtube.com/embed/'
          + id + options.query + '"' + options.attributes
          + ' frameborder="0" allowfullscreen></iframe>');

        // return this.sanitize_iframe(`<iframe src="https://www.youtube.com/embed/${id}${options.query}" ${options.attributes} frameborder="0" allowfullscreen></iframe>`);        
    }

    getMediaId(url: URL): string {
        if (url.hostname.indexOf('youtube.com') > -1) {
            return url.search.split('=')[1];
          }
      
          if (url.hostname === 'youtu.be') {
            return url.pathname.split('/')[1];
          }
      
          return '';
    }

}