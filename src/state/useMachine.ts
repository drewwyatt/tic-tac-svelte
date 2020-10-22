import { Readable, readable } from 'svelte/store'
import {
  Event,
  EventData,
  InterpreterOptions,
  StateMachine,
  State,
  interpret,
} from 'xstate'

const useMachine = <T extends StateMachine<any, any, any>>(
  machine: T,
  options: Partial<InterpreterOptions> = {},
): T extends StateMachine<infer C, infer S, infer E>
  ? {
      send: (
        event: Event<E> | Event<E>[],
        eventData?: EventData,
      ) => State<C, E, S>
      state: Readable<State<C, E, S>>
    }
  : never => {
  const service = interpret(machine, options)

  const store = readable(service.initialState, set => {
    service.onTransition(state => {
      set(state)
    })

    service.start()

    return () => {
      service.stop()
    }
  })

  return {
    state: store,
    send: service.send,
  } as any
}

export default useMachine
