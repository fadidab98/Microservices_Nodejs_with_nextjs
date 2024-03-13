import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postApi } from "./User/postApi";
import { useMemo } from "react";
import { userApi } from "./User/userApi";

import  setting  from "./settingSlice";
import  house  from "./houseSlice";

import  login  from "./Login/loginSlice";
import { postDashApi } from "./Dashboard/postDashApi";
import { userDashApi } from "./Dashboard/userDashApi";
import { categoryDashApi } from "./Dashboard/categoryDashApi";
import { notificationDashApi } from "./Dashboard/notificationDashApi";
import { bazaarApi } from "./User/BazaarApi";
import { favApi } from "./User/favApi";
import { settingApi } from "./User/settingApi";

let store

const initialState = {}

 const reducer = combineReducers({
  [postApi.reducerPath]:postApi.reducer,
  [userDashApi.reducerPath]:userDashApi.reducer,
  [categoryDashApi.reducerPath]:categoryDashApi.reducer,
  [postDashApi.reducerPath]:postDashApi.reducer,
  [userApi.reducerPath]:userApi.reducer,
  [notificationDashApi.reducerPath]:notificationDashApi.reducer,
  [bazaarApi.reducerPath]:bazaarApi.reducer,
  [favApi.reducerPath]:favApi.reducer,
  [settingApi.reducerPath]:settingApi.reducer,

  setting:setting,
  auth:login,
  house:house
 }) 
function initStore(preloadedState = initialState) {
  return configureStore({
   reducer:reducer,
   preloadedState,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    userApi.middleware,
    postApi.middleware,
    postDashApi.middleware,
    userDashApi.middleware,
    categoryDashApi.middleware,
    notificationDashApi.middleware,
    bazaarApi.middleware,
    favApi.middleware,
    settingApi.middleware

    )
  });
}
export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}
export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
export function removeUndefined(state) {
  if (typeof state === 'undefined') return null
  if (Array.isArray(state)) return state.map(removeUndefined)
  if (typeof state === 'object' && state !== null) {
    return Object.entries(state).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: removeUndefined(value)
      }
    }, {})
  }

  return state
}
