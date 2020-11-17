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
import { map } from 'rxjs/operators';
import { Provider } from '../factories/providers.factory';

@Injectable({
    providedIn: 'root'
})
export class DailyMotionProvider extends MediaProvider {
    options: string[] = [
        'thumbnail_60_url',
        'thumbnail_120_url',
        'thumbnail_180_url',
        'thumbnail_240_url',
        'thumbnail_360_url',
        'thumbnail_480_url',
        'thumbnail_720_url',
        'thumbnail_1080_url'
    ];

    getName(): Provider {
        return 'daily-motion';
    }

    getImage(id: string, options?: any) {
        options.resolution = this.isValidProviderOption(options.resolution) ? options.resolution : 'thumbnail_480_url';

        return this.http.get(`https://api.dailymotion.com/video/${id}?fields=${options.resolution}`)
            .pipe(map((response: any) => {
                return {
                    'link': response[options.resolution],
                    'html': `<img src="${response[options.resolution]}"/>`
                };
            }))
            .toPromise()
            .catch(error => console.log(error));
    }

    getVideo(id: string, options?: any): string {
        options = this.parseGlobalOptions(options);

        return this.sanitize_iframe('<iframe src="https://www.dailymotion.com/embed/video/'
            + id + options.query + '"' + options.attributes
            + ' frameborder="0" allowfullscreen></iframe>');

        // return this.sanitize_iframe(`<iframe src="https://www.dailymotion.com/embed/video/${id}${options.query}" ${options.attributes} frameborder="0" allowfullscreen></iframe>`);
    }

    getPlaylist(id: string, options?: any): string {
        throw new Error('Method not implemented.');
    }

    getMediaId(url: URL): string {
        let id: string = '';

        if (url.hostname.indexOf('dailymotion.com') > -1) {
            id = url.pathname.split('/')[2].split('_')[0];
        }

        if (url.hostname === 'dai.ly') {
            id = url.pathname.split('/')[1];
        }

        return id;
    }

}
