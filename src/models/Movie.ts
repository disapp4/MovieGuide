import { I18nMovie } from "./I18nMovie";
import { Language } from "./Language";

export class Movie {
    id!: string;
    i18n!: { [key in Language]?: I18nMovie };
    imageIds!: string[];
}