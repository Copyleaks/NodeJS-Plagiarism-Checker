/**
 * Weight of each correction category in the overall writing score.
 * Each weight is between 0.0 and 1.0. A weight you leave out defaults to 1.0. A weight of 0 ignores the category.
 */
export interface ScoreWeights {
    grammarScoreWeight?: number;

    mechanicsScoreWeight?: number;

    sentenceStructureScoreWeight?: number;

    wordChoiceScoreWeight?: number;
}
