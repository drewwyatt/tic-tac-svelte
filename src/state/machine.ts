import { actions, createMachine, assign } from 'xstate'
import * as guards from './guards'
import {
  Context,
  GameEvent,
  DEFAULT_CONTEXT,
  togglePlayer,
  events,
} from './models'

const { choose, pure, send } = actions

const machine = createMachine<Context, GameEvent>(
  {
    id: 'game',
    initial: 'awaitingMove',
    context: DEFAULT_CONTEXT,
    states: {
      awaitingMove: {
        entry: choose([
          {
            cond: 'hasWinner',
            actions: pure(({ turn }) =>
              send(events.reportWin(togglePlayer(turn!))),
            ),
          },
          {
            cond: 'isDraw',
            actions: send(events.reportDraw()),
          },
          {
            actions: assign({ turn: ({ turn }) => turn ?? 'x' }),
          },
        ]),
        on: {
          MOVE: [
            {
              target: 'awaitingMove',
              actions: assign({
                moves: (ctx, { position }) => [
                  ...ctx.moves.slice(0, position),
                  ctx.turn,
                  ...ctx.moves.slice(position + 1),
                ],
                turn: ctx => (ctx.turn === 'x' ? 'o' : 'x'),
              }),
              cond: 'isValidMove',
            },
            { target: 'invalidMove' },
          ],
          'END.WIN': 'end.win',
          'END.DRAW': 'end.draw',
          RESTART: {
            target: 'awaitingMove',
            actions: assign(DEFAULT_CONTEXT),
          },
        },
      },
      invalidMove: {
        on: {
          RESTART: {
            target: 'awaitingMove',
            actions: assign(DEFAULT_CONTEXT),
          },
        },
      },
      end: {
        entry: assign({ turn: () => null }) as any,
        on: {
          RESTART: {
            target: 'awaitingMove',
            actions: assign(DEFAULT_CONTEXT),
          },
        },
        states: {
          win: {
            type: 'final',
            entry: assign({
              winner: (_, { player }: events.WinEvent) => player,
            }) as any,
          },
          draw: {
            type: 'final',
          },
        },
      },
    },
  },
  {
    guards,
  },
)

export { events }
export default machine
