import type { Player } from './models'

export const start = () => ({ type: 'START' } as const)
export const move = (position: number) => ({ type: 'MOVE', position } as const)
export const reportWin = (player: Player) =>
  ({ type: 'END.WIN', player } as const)
export const reportDraw = () => ({ type: 'END.DRAW' } as const)
export const restart = () => ({ type: 'RESTART' } as const)

export type StartEvent = ReturnType<typeof start>
export type MoveEvent = ReturnType<typeof move>
export type WinEvent = ReturnType<typeof reportWin>

export const isMoveEvent = (event: { type: any }): event is MoveEvent =>
  event.type === 'MOVE'
