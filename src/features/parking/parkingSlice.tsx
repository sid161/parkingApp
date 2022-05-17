
import {createSlice,PayloadAction} from '@reduxjs/toolkit'

interface ParkingState{
    parkingLot:any,

}



export const parkingSlice = createSlice({
    name:'parking',
  initialState:{
      parkingLot:[]
  },
  reducers:{
      setParkingLot: (state,action) => {
        state.parkingLot = action.payload
      },

   
  }
})

export const {setParkingLot} = parkingSlice.actions
export default parkingSlice.reducer