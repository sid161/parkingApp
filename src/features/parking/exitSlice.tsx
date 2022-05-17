
import {createSlice,PayloadAction} from '@reduxjs/toolkit'

interface ExitState{
  
    exitSlot:any

}



export const exitSlice = createSlice({
    name:'exit',
  initialState:{
      exitSlot:null
  },
  reducers:{
      setExitSlot: (state,action) => {
        state.exitSlot = action.payload
      },

   
  }
})

export const {setExitSlot} = exitSlice.actions
export default exitSlice.reducer