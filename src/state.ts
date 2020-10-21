import { createMachine } from 'xstate'

type Player = 'x' | 'o'
type Move = Player | null
type Position = number

type Context = {
  moves: [Move, Move, Move, Move, Move, Move, Move, Move, Move]
  turn: Player | null
}

type Event =
  | { type: 'START' }
  | {
      type: 'MOVE'
      position: Position
    }

const machine = createMachine<Context, Event>({
  id: 'game',
  initial: 'idle',
  context: {
    moves: [null, null, null, null, null, null, null, null, null],
    turn: null,
  },
  states: {
    idle: { on: { START: 'awaitingMove' } },
    awaitingMove: {},
  },
})

export default machine
