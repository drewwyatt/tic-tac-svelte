expect.extend({
  toEqualState(received, state) {
    if (received && received.state) {
      const message = () =>
        `expected state "${received.state.value}" to equal "${state}"`

      if (received.state.value == state) {
        return {
          message,
          pass: true,
        }
      }

      return {
        message,
        pass: false,
      }
    }

    return {
      message: () =>
        `expected "${received}" to be a state machine with state "${state}"`,
      pass: false,
    }
  },
})
