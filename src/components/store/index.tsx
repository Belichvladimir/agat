import { configureStore } from '@reduxjs/toolkit';
import leafletReducer from './leafletSlice';

export const store = configureStore({
    reducer: {
        leaflets:leafletReducer,
    },
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
