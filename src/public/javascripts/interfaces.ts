export interface Product
{
    id: string;
    fields: Fields;
}

export interface ProductWeb
{
    id: string,
    featured?: boolean,
    name: string,
    price: number,
    company: string,
    colors: string[],
    image: string;
}

export interface Fields
{
    company: string;
    colors: string[];
    featured?: boolean;
    price: number;
    name: string;
    image: Image[];
}

export interface Image
{
    id: string;
    url: string;
    filename: string;
    size: number;
    type: Type;
    thumbnails: Thumbnails;
}

export interface Thumbnails
{
    small: Full;
    large: Full;
    full: Full;
}

export interface Full
{
    url: string;
    width: number;
    height: number;
}

export enum Type
{
    ImageJPEG = "image/jpeg",
}
