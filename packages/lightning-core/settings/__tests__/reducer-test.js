import reducer, { selectors, LOG, LOGS } from '../reducer'

const logAction = { type: LOG, log: 'SIGTERM' }
const logsAction = { type: LOGS, logs: ['0;', 'SIGTERM'] }

describe('Settings Reducer', () => {
  test('inserts one log', () => {
    const state = reducer({ logs: [] }, logAction)
    expect(state).toEqual({ logs: ['SIGTERM'] })

    const nextState = reducer(state, logAction)
    expect(nextState).toEqual({ logs: ['SIGTERM', 'SIGTERM'] })
  })

  test('adds multiple logs', () => {
    const state = reducer({ logs: [] }, logsAction)
    expect(state).toEqual({ logs: ['0;', 'SIGTERM'] })

    const nextState = reducer(state, logsAction)
    expect(nextState).toEqual({ logs: ['0;', 'SIGTERM', '0;', 'SIGTERM'] })
  })
})


describe('Settings Selectors', () => {
  describe('getRecentLogs', () => {
    test('gets logs', () => {
      const state = { logs: ['SIGTERM'] }
      expect(selectors.getRecentLogs(state)).toEqual(['SIGTERM'])
    })

    test('gets the 500 most recent logs', () => {
      const state = { logs: [...new Array(1000), 'SIGTERM'] }
      const logs = selectors.getRecentLogs(state)
      expect(logs.length).toBe(500)
      expect(logs[499]).toBe('SIGTERM')
    })
  })
})
