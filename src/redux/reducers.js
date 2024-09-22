const initialState = {
  fruit: "",
  pricePerSize: {
    size: "",
    time: 0,
    price: 0
  },
  sideDishes: ""
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "addFruit": {
      return {
        ...state,
        fruit: action.payload.flavour,
      };
    }
    case "addPricePerSize": {
      return {
        ...state,
        pricePerSize: action.payload.pricePerSize,
      };
    }
    case "addSide": {
      return {
        ...state,
        sideDishes: action.payload.flavour,
      };
    }
    default:
      return state;
  }
}
