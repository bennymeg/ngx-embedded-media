import { Provider } from '../factories/providers.factory';

export interface Attributes {
    [key: string]: number | string;
}

export interface Styles {
    [key: string]: string;
}

export interface Options {
    query?: string;
    attributes?: Attributes;
    resolution?: string;
}

export interface Params {
    image?: string;
    video?: string;
    provider?: Provider;
    query?: string;
    attributes?: Attributes;
    classes?: string | string[];
    styles?: Styles;
    resolution?: string;
    // ratio?: string;
    // width?: number;
    // height?: number;
}
