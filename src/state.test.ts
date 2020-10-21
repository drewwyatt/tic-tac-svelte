import { interpret } from 'xstate'
import machine from './state'

const IDLE = 'idle'

describe('state machine', () => {
  const game = interpret(machine)

  beforeEach(() => {
    game.stop().start()
  })

  it('starts in an idle state', () => {
    expect(game.state.value).toEqual(IDLE)
  })
})
