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
import { ProvidersFactory, Provider } from '../factories/providers.factory';
import { MediaType, MediaProvider } from '../providers/media.provider';
import { Options } from '../interfaces/interfaces';


@Injectable({
    providedIn: 'root'
})
export class EmbeddedMediaService {

    constructor(private _providersFactory: ProvidersFactory) { }

    public getMedia(urlIdString: string, type: MediaType, provider?: Provider, options?: Options): any {
        if (urlIdString.match(/^[A-Za-z0-9_-]+$/g)) {
            if (!provider) console.warn('provider is missing');

            return this.getMediaById(urlIdString, type, provider, options);
        } else {
            return this.getMediaFromUrl(urlIdString, type, provider, options);
        }
    }

    public getMediaFromUrl(urlString: string, type: MediaType, provider?: Provider, options?: Options): any {
        let result: any;
        const url = new URL(urlString);
        let contentProvider: MediaProvider;

        // get content provider from the factory
        if (provider) {
            contentProvider = this._providersFactory.getProviderByName(provider);
        }

        // get content provider from the factory 2nd attempt
        if (!contentProvider) {
            contentProvider = this._providersFactory.getProviderByUrl(url);
        }

        // fetch media content
        if (contentProvider) {
            result = this.getMediaById(contentProvider.getMediaId(url), type, contentProvider.getName(), options);
        }

        return result;
    }

    public getMediaById(id: string, type: MediaType, provider: Provider, options?: Options): any {
        let result: any;
        const contentProvider: MediaProvider = this._providersFactory.getProviderByName(provider);

        // fetch media content
        if (contentProvider) {
            result = contentProvider.getMedia(id, type, options);
        }

        return result;
    }

}
