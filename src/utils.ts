import { City } from "./_models/city";

export const startsWith = (term: string) => (text: string) => {
    const [normalisedTerm, normalisedName] = [term, text]
        .map(string =>
            string
                .normalize("NFD") // decompose to letter and diacratic symbol
                .replace(/[\u0300-\u036f]/g, "") // remove diacratic symbols
                .replace(/\u0142/g, "l") // 'ł' is considers as diffrent letter than 'l', so replace that too
                .toLowerCase()
        )
    return normalisedName.startsWith(normalisedTerm);
}