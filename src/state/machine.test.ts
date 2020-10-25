import { interpret } from 'xstate'
import machine from './machine'

const IDLE = 'idle'
const AWAITING_MOVE = 'awaitingMove'
const INVALID_MOVE = 'invalidMove'
const WIN = 'end.win'
const DRAW = 'end.draw'

//      +   +
//      |   |
//    0 | 1 | 2
// +-------------+
//    3 | 4 | 5
// +-------------+
//    6 | 7 | 8
//      |   |
//      +   +

describe('state machine', () => {
  const game = interpret(machine)

  beforeEach(() => {
    game.stop().start()
  })

  describe('idle', () => {
    it('starts in an idle state', () => {
      expect(game).toEqualState(IDLE)
    })
  })

  describe('moving', () => {
    beforeEach(() => {
      game.send('START')
    })

    const sendMoves = (...moves: number[]) => {
      moves.forEach(position => game.send('MOVE', { position }))
    }

    it('awaits move on start', () => {
      expect(game).toEqualState(AWAITING_MOVE)
    })

    it('allows a move onto an empty space', () => {
      sendMoves(0)
      expect(game).toEqualState(AWAITING_MOVE)
      expect(game.state.context.moves[0]).not.toEqual(null)
    })

    it('blocks moves onto non-empty spaces', () => {
      sendMoves(0, 0)
      expect(game).toEqualState(INVALID_MOVE)
    })

    describe('end states', () => {
      it('un-sets turn on win', () => {
        sendMoves(0, 3, 1, 4, 2)
        expect(game.state.context.turn).toEqual(null)
      })

      describe('draw', () => {
        it('ends the game in a draw when no spaces are available', () => {
          sendMoves(0, 1, 2, 3, 5, 4, 7, 8, 6)
          expect(game.state.matches(DRAW)).toEqual(true)
          expect(game.state.context.winner).toEqual(null)
        })
      })

      describe('wins', () => {
        describe('horizontal', () => {
          it('recognizes a top-row win', () => {
            sendMoves(0, 3, 1, 4, 2)
            expect(game.state.matches(WIN)).toEqual(true)
            expect(game.state.context.winner).toEqual('x')
          })

          it('recognizes a mid-row win', () => {
            sendMoves(0, 3, 1, 4, 6, 5)
            expect(game.state.matches(WIN)).toEqual(true)
            expect(game.state.context.winner).toEqual('o')
          })

          it('recognizes a right-col win', () => {
            sendMoves(6, 3, 7, 4, 8)
            expect(game.state.matches(WIN)).toEqual(true)
            expect(game.state.context.winner).toEqual('x')
          })
        })
        describe('vertical', () => {
          it('recognizes a left-col win', () => {
            sendMoves(1, 0, 2, 3, 4, 6)
            expect(game.state.matches(WIN)).toEqual(true)
            expect(game.state.context.winner).toEqual('o')
          })

          it('recognizes a mid-col win', () => {
            sendMoves(1, 3, 4, 2, 7)
            expect(game.state.matches(WIN)).toEqual(true)
            expect(game.state.context.winner).toEqual('x')
          })

          it('recognizes a right-col win', () => {
            sendMoves(6, 2, 1, 5, 4, 8)
            expect(game.state.matches(WIN)).toEqual(true)
            expect(game.state.context.winner).toEqual('o')
          })
        })
        describe('diagonal', () => {
          it('recognizes ltr diagonal wins', () => {
            sendMoves(0, 3, 4, 2, 8)
            expect(game.state.matches(WIN)).toEqual(true)
            expect(game.state.context.winner).toEqual('x')
          })

          it('recognizes rtl diagonal wins', () => {
            sendMoves(3, 2, 1, 4, 5, 6)
            expect(game.state.matches(WIN)).toEqual(true)
            expect(game.state.context.winner).toEqual('o')
          })
        })
      })
    })
  })
})
