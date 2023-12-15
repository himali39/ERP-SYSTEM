const { combineReducers } = require("@reduxjs/toolkit");
const { adminReducer, globalReducer } = require("../state/index");

const rootReducer = combineReducers({
  adminReducer: adminReducer,
  global: globalReducer,
});
export default rootReducer;
