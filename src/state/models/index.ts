import * as events from './events'

export type GameEvent = Exclude<
  ReturnType<typeof events[keyof typeof events]>,
  boolean
>

export { events }
export * from './models'
