import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const summerySlice = createSlice({
  name: 'summery',
  initialState,
  reducers: {
    clearSummery: (state) => {
      state.value = {}
    },
    setSummery: (state, action) => {
      state.value = action.payload 
    },
  },
})

export const { clearSummery, setSummery, updateSummery } = summerySlice.actions
export default summerySlice.reducer
