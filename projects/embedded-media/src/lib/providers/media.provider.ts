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

import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { Provider } from '../factories/providers.factory';

export type MediaType = 'video' | 'image' | 'playlist';

export type OptionsType = 'query' | 'attributes' | 'resolution';


@Injectable({
    providedIn: 'root'
})
export abstract class MediaProvider {
    abstract options: Array<string>;

    constructor(protected http: HttpClient, private _sanitizer: DomSanitizer) {}

    abstract getImage(id: string, options?: any): any;

    abstract getVideo(id: string, options?: any): string;

    abstract getPlaylist(id: string, options?: any): string;

    abstract getMediaId(url: URL): string;

    abstract getName(): Provider;

    public isValidUrl(url: URL): boolean {
        const mediaId: string = this.getMediaId(url);

        return mediaId && mediaId.length !== 0;
    }

    public getMedia(id: string, type: MediaType, options?: any): any {
        let result: any;

        if (!options || typeof options === 'function') {
            options = {};
        }

        switch (type) {
            case 'image':
                result = this.getImage(id, options);
                break;
            case 'video':
                result = this.getVideo(id, options);
                break;
            case 'playlist':
                result = this.getPlaylist(id, options);
                break;
        }

        return result;
    }

    // public static isValidMediaId(id: string): boolean {
    //     return !! id.match(/^[A-Za-z0-9]+$/g);
    // }

    public isValidProviderOption(option: string): boolean {
        return this.options.indexOf(option) >= 0;
    }

    public getProviderOptions(): Array<string> {
        return this.options;
    }

    protected parseGlobalOptions(options: any): any {
        let query = '';
        let attributes = '';

        if (options) {
            if (options.hasOwnProperty('query')) {
                query = '?' + this.serializeQuery(options.query);
            }

            if (options.hasOwnProperty('attributes')) {
                attributes = ' ' + this.serializeAttributes(options.attributes);
            }
        }

        return { query, attributes };
    }

    private serializeQuery(query: any): any {
        let queryString: any = [];

        for (let property in query) {
            if (query.hasOwnProperty(property)) {
                queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(query[property]));
            }
        }

        return queryString.join('&');
    }

    private serializeAttributes(attributes: any): any {
        let attributesString = <any> [];

        Object.keys(attributes).forEach(key => {
            attributesString.push(key + '="' + (attributes[key]) + '"');
        });

        return attributesString.join(' ');
    }

    protected sanitize_iframe(iframe: string): any {
        return this._sanitizer.bypassSecurityTrustHtml(iframe);
    }
}
