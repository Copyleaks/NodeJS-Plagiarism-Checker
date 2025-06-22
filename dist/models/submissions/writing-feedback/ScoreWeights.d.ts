export interface ScoreWeights {
    /**
     * Grammar correction category weight in the overall score.
     */
    grammarScoreWeight: number;
    /**
     * Mechanics correction category weight in the overall score.
     */
    mechanicsScoreWeight: number;
    /**
     * Sentence structure correction category weight in the overall score.
     */
    sentenceStructureScoreWeight: number;
    /**
     * Word choice correction category weight in the overall score.
     */
    wordChoiceScoreWeight: number;
}
