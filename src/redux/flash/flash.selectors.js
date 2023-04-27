import { createSelector } from "reselect";

const selectFlashObject = (state) => state.flash;

export const selectFlash = createSelector(
  [selectFlashObject],
  (flash) => flash
);
