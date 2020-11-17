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
import { MediaProvider } from '../providers/media.provider';
import { TwitchProvider } from '../providers/twitch.provider';


export type Provider = 'youtube' | 'twitch' | 'vimeo' | 'daily-motion';

@Injectable({
    providedIn: 'root'
})
export class ProvidersFactory {

    constructor(private _youtubeProvider: YoutubeProvider, private _twitchProvider: TwitchProvider,
                private _vimeoProvider: VimeoProvider, private _dailyMotionProvider: DailyMotionProvider) { }

    public getProviderByName(providerName: Provider): MediaProvider {
        let result: MediaProvider;

        switch (providerName) {
            case 'youtube':
                result = this._youtubeProvider;
                break;
            case 'twitch':
                result = this._twitchProvider;
                break;
            case 'vimeo':
                result = this._vimeoProvider;
                break;
            case 'daily-motion':
                result = this._dailyMotionProvider;
                break;
            default:
                console.error(`unknown content provider '${providerName}'`);
        }

        return result;
    }

    public getProviderByUrl(providerUrl: URL): MediaProvider {
        let result: MediaProvider;

        if (this._youtubeProvider.isValidUrl(providerUrl)) {
            result = this._youtubeProvider;
        } else if (this._twitchProvider.isValidUrl(providerUrl)) {
            result = this._twitchProvider;
        } else if (this._vimeoProvider.isValidUrl(providerUrl)) {
            result = this._vimeoProvider;
        } else if (this._dailyMotionProvider.isValidUrl(providerUrl)) {
            result = this._dailyMotionProvider;
        } else {
            console.error(`unknown content provider for url: '${providerUrl}'`);
        }

        return result;
    }
}
