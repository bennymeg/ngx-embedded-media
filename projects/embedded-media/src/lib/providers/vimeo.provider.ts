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
export class VimeoProvider extends MediaProvider {
    options: string[] = [
        'thumbnail_small',
        'thumbnail_medium',
        'thumbnail_large'
    ];

    getName(): Provider {
        return 'vimeo';
    }

    getImage(id: string, options?: any) {
        options.resolution = this.isValidProviderOption(options.resolution) ? options.resolution : 'thumbnail_large';

        return this.http.get(`https://vimeo.com/api/v2/video/${id}.json`).pipe(map((response: any) => {
            return {
                'link': response[0][options.resolution],
                'html': `<img src="${response[0][options.resolution]}"/>`
            };
        }))
            .toPromise()
            .catch(error => console.log(error));
    }

    getVideo(id: string, options?: any): string {
        options = this.parseGlobalOptions(options);

        return this.sanitize_iframe('<iframe src="https://player.vimeo.com/video/'
            + id + options.query + '"' + options.attributes
            + ' frameborder="0" allowfullscreen></iframe>');

        // return this.sanitize_iframe(`<iframe src="https://player.vimeo.com/video/${id}${options.query}" ${options.attributes} frameborder="0" allowfullscreen></iframe>`);
    }

    getPlaylist(id: string, options?: any): string {
        throw new Error('Method not implemented.');
    }

    getMediaId(url: URL): string {
        return (url.hostname === 'vimeo.com') ? url.pathname.split('/')[1] : '';
    }

}
