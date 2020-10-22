import { createMachine, assign } from 'xstate'

type Player = 'x' | 'o'
type Move = Player | null

type Context = {
  moves: Move[]
  turn: Player | null
}

type TEvent<T extends string, U extends {} = {}> = {
  type: T
} & U
type Event = TEvent<'START'> | TEvent<'MOVE', { position: number }>

export const start = () => 'START' as const
export const move = (position: number) => ({ type: 'MOVE', position } as const)

const machine = createMachine<Context, Event>(
  {
    id: 'game',
    initial: 'idle',
    context: {
      moves: [null, null, null, null, null, null, null, null, null],
      turn: null,
    },
    states: {
      idle: { on: { START: 'awaitingMove' } },
      awaitingMove: {
        entry: assign({ turn: ({ turn }) => turn ?? 'x' }),
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

              // (ctx, { position }) => {
              //   console.log('ACTION!')
              //   ctx.moves[position] = ctx.turn
              //   ctx.turn = ctx.turn === 'x' ? 'o' : 'x'
              // },
              cond: 'isValidMove',
            },
            { target: 'invalidMove' },
          ],
        },
      },
      invalidMove: {},
    },
  },
  {
    guards: {
      isValidMove: (ctx, e) => {
        console.log('inValidMove', ctx, e)
        return e.type === 'MOVE' && ctx.moves[e.position] === null
      },
    },
  },
)

export default machine
