import { createSlice } from '@reduxjs/toolkit'
import { PresaleState } from 'state/types'
import  { fetchPresaleInfo, fetchCurrentPresaleInfo } from './fetchPresale'

const initialState: PresaleState = { 
    data: {
        started: false,
        closed: true,
        openTime: 0,
        endTime: 0,
        curStage: 0,
        rate: 60,
        totalSold: 0,
        soldAmount: 0,
        stages: []
    }
}

const presaleSlice = createSlice({
    name: 'presale',
    initialState,
    reducers : {
        setPresaleData: (state, action) => {
            state.data = {...state.data, ...action.payload}
        },
        setCurrentPresaleStatus: (state, action) => {
            state.data = {...state.data, ...action.payload}
        }
    }
})

// Actions
export const { setPresaleData, setCurrentPresaleStatus } = presaleSlice.actions

// Thunks
export const fetchPresaleInfoAsync = () => async (dispatch: any) => {
    const presale = await fetchPresaleInfo()
    dispatch(setPresaleData(presale))
}

export const fetchCurrentPresaleInfoAsync = () => async (dispatch: any) => {
    const presaleInfo = await fetchCurrentPresaleInfo()
    dispatch(setCurrentPresaleStatus(presaleInfo));
}

export default presaleSlice.reducer
  