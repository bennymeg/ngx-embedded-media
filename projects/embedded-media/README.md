# ngx-embedded-media

Embed media from from top tier media providers directly in your Angular 6+ application.
Currently supports YouTube, Vimeo, *Twitch (videos and clips) and Dailymotion.

[![licence](https://img.shields.io/github/license/bennymeg/ngx-embedded-media.svg)](https://github.com/bennymeg/IsraelPostalServiceAPI/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/ngx-embedded-media.svg)](https://www.npmjs.com/package/ngx-embedded-media)
[![Dependencies status](https://david-dm.org/bennymeg/ngx-embedded-media/status.svg)](https://david-dm.org/bennymeg/ngx-embedded-media)


## Installation

To install ngx-embedded-media library, run:

```bash
$ npm install ngx-embedded-media --save
```

## Importing the Library Module

```typescript
import { EmbeddedMediaModule } from 'ngx-embedded-media';

@NgModule({
  imports: [EmbeddedMediaModule.forRoot()]
})
export class AppModule {}
```

# Usage

Embedding a video:

```html
<embedded-media video='https://www.youtube.com/embed/3Wf29RiKp70'></embedded-media>
<!-- OR -->
<embedded-media video='3Wf29RiKp70' provider='youtube'></embedded-media>
```

Embedding video thumbnail:

```html
<embedded-media image='https://vimeo.com/186450193'></embedded-media>
<!-- OR -->
<embedded-media image='186450193' provider='vimeo'></embedded-media>
```

Embedding playlist:

```html
<embedded-media playlist='http://www.youtube.com/embed/videoseries?list=PLpRjkOHBe_TgmznCle__jWDhoV4aFgCjw'></embedded-media>
<!-- OR -->
<embedded-media platlist='PLpRjkOHBe_TgmznCle__jWDhoV4aFgCjw' provider='youtube'></embedded-media>
```

## Available Optional Inputs

### query

Object to be serialized as a query string and appended to the embedded content url. I.e:

```html
<embedded-media video='https://www.youtube.com/embed/3Wf29RiKp70' query='{ "portrait": 0, "muted": true }'></embedded-media>
```

### attributes

Object containing additional attributes to be added to the embedded iframe / image. I.e:

```html
<embedded-media video='https://www.youtube.com/embed/3Wf29RiKp70' attributes='{ "width": 600, "height": 300 }'></embedded-media>
```

### Provider

The service provider name.

- youtube
- vimeo
- twitch
- daily-motion

```html
<embedded-media video='3Wf29RiKp70' provider='youtube'></embedded-media>
```

### Resolution Options

Unique options that can be passed to the service provider to control the video / thumbnail appearance. 

#### Youtube Image Resolution Options

- default
- mqdefault
- hqdefault
- sddefault
- maxresdefault

```html
<embedded-media image='https://www.youtube.com/embed/3Wf29RiKp70' resolution='mqdefault'></embedded-media>
```

#### Vimeo Image Resolution Options

- thumbnail_small
- thumbnail_medium
- thumbnail_large

```html
<embedded-media image='https://vimeo.com/186450193' resolution='thumbnail_medium'></embedded-media>
```

#### Dailymotion Image Resolution Options

- thumbnail_60_url
- thumbnail_120_url
- thumbnail_180_url
- thumbnail_240_url
- thumbnail_360_url
- thumbnail_480_url
- thumbnail_720_url
- thumbnail_1080_url

```html
<embedded-media image='https://www.dailymotion.com/video/x36btaw' resolution='thumbnail_1080_url'></embedded-media>
```