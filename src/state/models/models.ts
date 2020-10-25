export type Player = 'x' | 'o'
export type Move = Player | null

export const togglePlayer = (player: Player) => (player === 'x' ? 'o' : 'x')
export const isPlayer = (value: unknown): value is Player =>
  value === 'x' || value === 'o'

export type Context = {
  moves: Move[]
  turn: Player | null
  winner: Player | null
}

export const DEFAULT_CONTEXT: Context = {
  moves: [null, null, null, null, null, null, null, null, null],
  turn: null,
  winner: null,
}
