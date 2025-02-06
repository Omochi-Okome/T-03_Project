function handleResetText(text) {
  dispatch({
    type: 'reset',
    text: '',
  });
}

export default function inputTextReducer(text, action) {
  switch (action.type) {
    case 'reset': {
      return {
        text: action.text,
      };
    }
    case 'enter': {
      return {
        text: action.text,
      };
    }
    default: {
      throw Error('Unknown action:' + action.type);
    }
  }
}
