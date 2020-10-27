import { Readable, readable } from 'svelte/store'
import {
  Event,
  EventData,
  InterpreterOptions,
  StateMachine,
  State,
  interpret,
} from 'xstate'

type MachineApi<T extends StateMachine<any, any, any>> = T extends StateMachine<
  infer C,
  infer S,
  infer E
>
  ? [
      Readable<State<C, E, S>>,
      (event: Event<E> | Event<E>[], eventData?: EventData) => State<C, E, S>,
    ]
  : never

const useMachine = <T extends StateMachine<any, any, any>>(
  machine: T,
  options: Partial<InterpreterOptions> = {},
): MachineApi<T> => {
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

  return [store, service.send] as MachineApi<T>
}

export default useMachine
