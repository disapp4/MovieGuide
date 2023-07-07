export enum Language {Russian = "Russian", English = "English"}

export namespace Language {
    export function fromCode(code: string): Language {
        switch (code) {
            case "ru": return Language.Russian;
            case "en": return Language.English;
            default: throw new Error("Код языка не поддерживается: " + code)
        }
    }
}