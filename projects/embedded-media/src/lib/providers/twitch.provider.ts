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
import { Provider } from '../factories/providers.factory';

// api: https://dev.twitch.tv/docs/embed/video-and-clips/
type VideoSubtype = 'video' | 'clip';

@Injectable({
    providedIn: 'root'
})
export class TwitchProvider extends MediaProvider {
    options: string[] = [];
    videoSubtype: VideoSubtype;

    getName(): Provider {
        return 'twitch';
    }

    getImage(id: string, options?: any) {
        // https://dev.twitch.tv/docs/api/reference#get-videos
        Promise.reject('Unimplemented feature: image input is currently not implemented for twitch service due to api auth requirements.');
    }

    getVideo(id: string, options?: any): string {
        options = this.preprocessOptions(id, options);
        options = this.parseGlobalOptions(options);
        let iframe: string = '';

        switch (this.getVideoSubtype(id)) {
            case 'video':
                iframe = this.sanitize_iframe('<iframe src="https://player.twitch.tv/'
                + options.query + '"' + options.attributes
                + ' frameborder="0" allowfullscreen></iframe>');
                break;
            case 'clip':
                iframe = this.sanitize_iframe('<iframe src="https://clips.twitch.tv/embed'
                + options.query + '"' + options.attributes
                + ' frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;"></iframe>');
                break;
        }

        return iframe;

        // return this.sanitize_iframe(`<iframe src="https://player.twitch.tv/${options.query}" ${options.attributes} frameborder="0" allowfullscreen></iframe>`);
    }

    getPlaylist(id: string, options?: any): string {
        throw new Error('Method not implemented.');
    }

    preprocessOptions(id: string, options?: any): any {
        const videoSubtype: VideoSubtype = this.getVideoSubtype(id);

        if (!options.hasOwnProperty('query')) {
            options.query = {};
        }

        switch (videoSubtype) {
            case 'video':
                options.query[videoSubtype] = `v${id}`;
                break;
            case 'clip':
                options.query[videoSubtype] = id;
                break;
        }

        return options;
    }

    getMediaId(url: URL): string {
        let id: string = '';

        if (url.hostname === 'www.twitch.tv') {
            const path = url.pathname.split('/');

            if (path.length >= 3) {
                if (path[1] === 'videos') {
                    this.videoSubtype = 'video';
                    id = path[2];
                }
            }

            if (path.length >= 4) {
                if (path[2] === 'clip') {
                    this.videoSubtype = 'clip';
                    id = path[3];
                }
            }
        }

        return id;
    }

    getVideoSubtype(id: string): VideoSubtype {
        let subtype: VideoSubtype;

        if (id) {
            if (id.match(/^[0-9]+$/)) {
                subtype = 'video';
            }

            if (id.match(/^[A-Za-z]+$/)) {
                subtype = 'clip';
            }
        }

        return subtype;
    }

}
