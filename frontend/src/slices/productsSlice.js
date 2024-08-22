import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
};

export const productsFetch = createAsyncThunk('/getproduct',async()=>{
  try {
      let resultat= await axios.get('http://localhost:5000/api/products/')
      return  resultat?.data;
  } catch (error) {
      console.log(error)
  }
})

export const productsCreate =createAsyncThunk('/addproduct',async(newcontact)=>{
  try{
      let resultat= await axios.post('http://localhost:5000/api/products/',newcontact)
      return  resultat?.data;   

  }catch (error) {
      console.log(error)
  }

})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers:  (builder) => {
    builder
    .addCase(productsFetch.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(productsFetch.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    })
    .addCase(productsFetch.rejected, (state, action) => {
      state.status = "rejected";
    })
    .addCase(productsCreate.pending, (state, action) => {
      state.createStatus = "pending";
    })
    .addCase(productsCreate.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      toast.success("Product Created!");
    })
    .addCase(productsCreate.rejected, (state, action) => {
      state.createStatus = "rejected";
    })
  },
});

export default productsSlice.reducer;
