import {
  handleCreateFlightRequested,
  createFlightRequested,
  createFlightSuccessReceived,
  handleCreateFlightSuccessReceived,
  createFlightErrorReceived,
  handleCreateFlightErrorReceived,
  resetAddFlightsState,
  handleResetAddFlightState,
  INITIAL_STATE
} from './addFlight'

test('handleCreateFlightRequested: expect isCreating is true and hasCreated is false', () => {
  const stateBefore = {
    error: '',
    isCreating: false,
    hasCreated: false,
    flight: null
  }
  const flight = {}
  const action = createFlightRequested(flight)
  const stateAfter = handleCreateFlightRequested(stateBefore, action)
  expect(stateAfter.isCreating).toBe(true)
  expect(stateAfter.hasCreated).toBe(false)
})

test(`createFlightSuccessReceived: 
expect isCreating to be true and hasCreated to be false`, () => {
  const stateBefore = {
    error: null,
    isCreating: false,
    hasCreated: false,
    flight: null
  }
  const flight = {}
  const action = createFlightSuccessReceived(flight)
  const stateAfter = handleCreateFlightSuccessReceived(stateBefore, action)
  expect(stateAfter.isCreating).toBe(false)
  expect(stateAfter.hasCreated).toBe(true)
  expect(stateAfter.error).toBeNull()
})

test(`createFlightErrorReceived:  
expect isCreating to be false and hasCreated to be false and error to equal the value`, () => {
  const stateBefore = {
    error: null,
    isCreating: false,
    hasCreated: false,
    flight: null
  }
  const error = ''
  const action = createFlightErrorReceived(error)
  const stateAfter = handleCreateFlightErrorReceived(stateBefore, action)
  expect(stateAfter.isCreating).toBe(false)
  expect(stateAfter.hasCreated).toBe(false)
  expect(stateAfter.error).toEqual(error)
})

test(`handleResetAddFlightState:  
expect isCreating to be false and hasCreated to be false and error to equal the value`, () => {
  const action = resetAddFlightsState()
  const stateAfter = handleResetAddFlightState(INITIAL_STATE, action)
  expect(stateAfter).toEqual(INITIAL_STATE)
})
