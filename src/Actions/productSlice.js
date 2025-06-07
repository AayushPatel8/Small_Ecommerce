import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { deleteProduct, getProducts, updateProducts, createProduct } from '../API/products';


//Thunks (async Functions)
export const fetchProducts = createAsyncThunk('products/fetchProduct',async()=>{
    const response = await getProducts();
    return response;
})

export const delProduct = createAsyncThunk('products/deleteProduct',async(id,thunkAPI)=>{
    const response = await deleteProduct(id);
    thunkAPI.dispatch(fetchProducts());
    return response;
})

export const updateProduct = createAsyncThunk('products/updateProduct',async(product,thunkAPI)=>{
    const response = await updateProducts(product);
    return thunkAPI.dispatch(fetchProducts());
    
})

export const createNewProduct = createAsyncThunk('products/createProduct',async(product,thunkAPI)=>{
    const response = await createProduct(product);
    return thunkAPI.dispatch(fetchProducts());
})

const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        data:[],
        error:null,
        auth: false
    },
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchProducts.pending,(state)=>{
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled,(state,action)=>{
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchProducts.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.error.message;
            })

    }
})


export default productSlice.reducer;
export const { setAuth } = productSlice.actions;