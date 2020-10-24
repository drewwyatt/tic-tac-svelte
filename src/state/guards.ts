import type { ConditionPredicate } from 'xstate'
import { Context, GameEvent, Move, events, isPlayer } from './models'

type Guard = ConditionPredicate<Context, GameEvent>

export const isValidMove: Guard = (ctx, e) =>
  events.isMoveEvent(e) && ctx.moves[e.position] === null

const areMatchingPlayer = (
  moves: Move[],
  p1: number,
  ...positions: [number, number]
) => isPlayer(moves[p1]) && positions.every(p => moves[p] === moves[p1])

export const hasWinner: Guard = ctx => areMatchingPlayer(ctx.moves, 0, 1, 2)
