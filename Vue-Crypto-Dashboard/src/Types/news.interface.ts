export interface INews {
    name:          string;
    url:           string;
    description:   string;
    about?:        About[];
    datePublished: string;
    category?:     Category;
}

export interface About {
    _type:    AboutType;
    readLink: string;
    name:     string;
}

export enum AboutType {
    Thing = "Thing",
}

export enum Category {
    Business = "Business",
    ScienceAndTechnology = "ScienceAndTechnology",
}


