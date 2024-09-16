import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filterOpen: false,
    price: [0, 30000],
    brands: [],
    categories: []
}

export const productsFilterSlice = createSlice({
    name: 'productsFilter',
    initialState,
    reducers:{
        toggleFilterOpen: (state)=>{
            state.filterOpen = !state.filterOpen;
        },
        setPrice: (state, action) => {
            state.price = action.payload;
        },
        setBrands: (state, action) => {
            state.brands = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        resetFilter: (state) =>{
            state.price = [0, 30000];
            state.brands = [];
            state.categories = [];
        }
    }
})

export let productsFilterReducer = productsFilterSlice.reducer;
export let {toggleFilterOpen, setPrice, setBrands, setCategories, resetFilter} = productsFilterSlice.actions;   