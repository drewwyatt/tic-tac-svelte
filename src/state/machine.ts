import { actions, createMachine, assign } from 'xstate'
import * as guards from './guards'
import { Context, GameEvent, togglePlayer, events } from './models'

const { choose, pure, send } = actions

const machine = createMachine<Context, GameEvent>(
  {
    id: 'game',
    initial: 'idle',
    context: {
      moves: [null, null, null, null, null, null, null, null, null],
      turn: null,
      winner: null,
    },
    states: {
      idle: { on: { START: 'awaitingMove' } },
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
        },
      },
      invalidMove: {},
      end: {
        entry: assign({ turn: () => null }) as any,
        states: {
          win: {
            entry: assign({
              winner: (_, { player }: events.WinEvent) => player,
            }) as any,
          },
          draw: {},
        },
      },
    },
  },
  {
    guards,
  },
)

export default machine
