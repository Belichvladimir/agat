import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { LeafletItemProps } from '../Leaflet/LeafletItem/LeafletItem';

export interface LeafletState {
    data: LeafletItemProps[]
}

const initialState: LeafletState = {
    data: [],
}

export const leafletSlice = createSlice({
  name: 'leaflets',
  initialState,
  reducers: {
    addArray: (state, action:PayloadAction<LeafletItemProps[]>) => {
      state.data = action.payload;
    },
    add: (state, action:PayloadAction<LeafletItemProps>) => {
      state.data.push(action.payload)
    },
    remove: (state, action:PayloadAction<number>) => {
        state.data = state.data.filter((elem) => elem.properties.id !== action.payload)
    },
  },
})

export const { add, remove, addArray } = leafletSlice.actions
export default leafletSlice.reducer