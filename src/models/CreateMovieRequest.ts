import { Language } from "./Language";
import { I18nCreateMovieRequest } from "./I18nCreateMovieRequest";

export class CreateMovieRequest {
    imageIds!: Array<string> | null;
    i18n!: { [key in Language]?: I18nCreateMovieRequest };
}