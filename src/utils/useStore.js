import {useReducer} from 'react';

const useStore = () => {
  const initialState = {
    loading: true,
    data: [],
    albomName: '',
    imageArr: [],
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'getData':
        return {...state, data: action.payload, loading: false};
      case 'setName':
        return {...state, albomName: action.payload};
      case 'setImageArr':
        return {...state, imageArr: [...state.imageArr, action.payload]};
      case 'deleteItem':
        return {...state, imageArr: action.payload};

      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const setName = (text) => dispatch({type: 'setName', payload: text});
  const checkImage = (url) => state.imageArr.includes(url);
  const addImage = (url) => {
    if (checkImage(url)) {
      const newArr = state.imageArr.filter((el) => el !== url);
      dispatch({type: 'deleteItem', payload: newArr});
    } else {
      dispatch({type: 'setImageArr', payload: url});
    }
  };

  const getData = (url) => {
    fetch(url).then((r) => {
      r.json().then((res) => dispatch({payload: res, type: 'getData'}));
    });
  };
  return [state, setName, addImage, getData];
};

export default useStore;
