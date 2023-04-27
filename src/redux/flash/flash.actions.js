import FLASH_ACTION_TYPES from "./flash.types";

export const setFlash = (flash) => ({
  type: FLASH_ACTION_TYPES.SET_FLASH,
  payload: flash,
});

export const clearFlash = () => ({
  type: FLASH_ACTION_TYPES.CLEAR_FLASH,
});
