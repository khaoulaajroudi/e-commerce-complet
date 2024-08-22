import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  orders: [],
  status: null,
};

export const ordersFetch = createAsyncThunk('/getorder',async()=>{
  try {
      let resultat= await axios.get('http://localhost:5000/api/orders/')
      return  resultat?.data;
  } catch (error) {
      console.log(error)
  }
})

export const ordersCreate =createAsyncThunk('/addorder',async(neworder)=>{
  try{
      let resultat= await axios.post('http://localhost:5000/api/orders/',neworder)
      return  resultat?.data;   

  }catch (error) {
      console.log(error)
  }

})

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers:  (builder) => {
    builder
    .addCase(ordersFetch.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(ordersFetch.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.status = "success";
    })
    .addCase(ordersFetch.rejected, (state, action) => {
      state.status = "rejected";
    })
    .addCase(ordersCreate.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(ordersCreate.fulfilled, (state, action) => {
      toast.success("order Created!");
    })
    .addCase(ordersCreate.rejected, (state, action) => {
      state.status = "rejected";
    })
  },
});

export default ordersSlice.reducer;
