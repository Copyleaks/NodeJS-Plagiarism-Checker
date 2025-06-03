import { Language } from "./Language";
export interface CrossLanguages {
    /**
     *  Cross language plagiarism detection. Choose which languages to scan your content against.
     */
    languages?: Language[];
}
