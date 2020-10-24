import type { ConditionPredicate } from 'xstate'
import { Context, GameEvent, Move, events, isPlayer } from './models'

type Guard = ConditionPredicate<Context, GameEvent>

export const isValidMove: Guard = (ctx, e) =>
  events.isMoveEvent(e) && ctx.moves[e.position] === null

// const areMatchingPlayer = (
//   moves: Move[],
//   positions: [number, number, number][]
// ) => isPlayer(moves[p1]) && positions.every(p => moves[p] === moves[p1])

const WIN_POSITIONS: [number, number, number][] = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
]

export const hasWinner: Guard = ({ moves }) =>
  WIN_POSITIONS.some(
    ([p1, ...positions]) =>
      isPlayer(moves[p1]) && positions.every(p => moves[p] === moves[p1]),
  )
