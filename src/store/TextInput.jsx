const handleResetText = (text) => {
  dispatch({
    type: 'reset',
    text: '',
  });
};

const inputTextReducer = (text, action) => {
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
};

export default inputTextReducer;
