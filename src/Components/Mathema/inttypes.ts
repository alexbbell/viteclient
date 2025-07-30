export interface IExample {
  dig1: number
  dig2: number
  correctResult?: number
  result?: number
  sign?: string
}

export const AllMathActions: string[] = ['addition', 'subtraction', 'multiplication', 'division']
export type MathActions = typeof AllMathActions[number]

export interface IMathSettings {
  minValue: number
  maxValue: number
  mathAction: string | MathActions
}
