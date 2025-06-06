import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../Actions/productSlice';
import searchReducer from '../Actions/searchSlice';

const store = configureStore({
    reducer : {
        products: productReducer,
        search: searchReducer
    }
});

export default store;