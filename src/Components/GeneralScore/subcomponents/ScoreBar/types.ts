type ScoreBarType = 'green' | 'orange' | 'red'

interface ScoreBarPropsI {
    title: string;
    value: number;
    type: ScoreBarType;
}

export type {ScoreBarPropsI, ScoreBarType};