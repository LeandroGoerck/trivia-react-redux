import { createMachine } from 'xstate';

export default formMachine = createMachine({
  id: 'formState',
  initial: 'checkLocalToken',
  states: {
    checkLocalToken: {
      on: {
        localTokenExists: { target: 'requestQuestions' },
        localTokenError: { target: 'requestNewToken' },
      },
    },
    requestNewToken: {
      on: {
        requestQuestions: { target: 'requestQuestions' },
      },
    },
    requestQuestions: {
      on: {
        checkResponseCode: { target: 'checkResponseCode' },
      },
    },
    checkResponseCode: {
      on: {
        codeZero: { target: 'renderQuestions' },
        codeThree: { target: 'requestNewToken' },
      },
    },
    renderQuestions: {
      on: {
        newGame: { target: 'checkLocalToken' },
      },
    },
  },
});
