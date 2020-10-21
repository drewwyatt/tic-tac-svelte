import { interpret } from 'xstate'
import machine from './state'

const IDLE = 'idle'
const AWAITING_MOVE = 'awaitingMove'

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
})
