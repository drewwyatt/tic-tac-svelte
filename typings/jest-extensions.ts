declare namespace jest {
  interface Matchers<R> {
    toEqualState(state: string): R
  }

  interface Expect {
    toEqualState(state: string): R
  }
}
