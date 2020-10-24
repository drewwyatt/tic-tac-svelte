import { interpret } from 'xstate'
import machine from './machine'

const IDLE = 'idle'
const AWAITING_MOVE = 'awaitingMove'
const INVALID_MOVE = 'invalidMove'
const WIN = 'end.win'

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
      expect(game).toEqualState('invalidMove')
    })

    describe('end states', () => {
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

          it('recognizes a bottom-row win', () => {
            sendMoves(6, 3, 7, 4, 8)
            expect(game.state.matches(WIN)).toEqual(true)
            expect(game.state.context.winner).toEqual('x')
          })
        })
      })
    })
  })
})
