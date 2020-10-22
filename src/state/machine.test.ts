import { interpret } from 'xstate'
import machine from './machine'

const IDLE = 'idle'
const AWAITING_MOVE = 'awaitingMove'
const INVALID_MOVE = 'invalidMove'

describe('state machine', () => {
  const game = interpret(machine)

  beforeEach(() => {
    game.stop().start()
  })

  it('starts in an idle state', () => {
    expect(game).toEqualState(IDLE)
  })

  it('awaits move on start', () => {
    game.send('START')
    expect(game).toEqualState(AWAITING_MOVE)
  })

  it('allows a move onto an empty space', () => {
    game.send('START')
    game.send('MOVE', { position: 0 })
    expect(game).toEqualState(AWAITING_MOVE)
    expect(game.state.context.moves[0]).not.toEqual(null)
  })

  it('blocks moves onto non-empty spaces', () => {
    game.send('START')
    game.send('MOVE', { position: 0 })
    game.send('MOVE', { position: 0 })
    expect(game).toEqualState(INVALID_MOVE)
  })
})
