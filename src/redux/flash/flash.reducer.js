import FLASH_ACTION_TYPES from "./flash.types";

const INITIAL_STATE = null

const flashReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FLASH_ACTION_TYPES.SET_FLASH:
      return {
          type: action.payload.type,
          message: action.payload.message,
      };
    case FLASH_ACTION_TYPES.CLEAR_FLASH:
      return null

    default:
      return state;
  }
};


export default flashReducer