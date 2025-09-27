import { configureStore } from '@reduxjs/toolkit'
import summeryReducer from './Summery/summerySlice'

export const store = configureStore({
  reducer: {
    summery: summeryReducer,
  },
})