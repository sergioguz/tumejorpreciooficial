import { createSlice } from "@reduxjs/toolkit";
import { calculate_total_price } from "../../utils/functions";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            cartItems:[],
            user:"demo",
            total: null,
            cartLenght:0,
            updateAt: Date.now().toLocaleString() //unix timestamp
        }
    },
    reducers: {
        addItem: (state,action)=>{
            const productInCart = state.value.cartItems.find(item=>item.id===action.payload.id)
            if(!productInCart){
                state.value.cartItems.push(action.payload) //action.payload es el producto
                state.value.cartLenght += 1
            }else{
                state.value.cartItems.map(item=>{
                    if(item.id===action.payload.id){
                        item.quantity += 1
                        return item
                    }
                    return item
                })
            }

            const total = calculate_total_price(state.value.cartItems)

            state.value = {
                ...state.value,
                total, 
                updatedAt: new Date().toLocaleString()
            }

        },
        removeItem: (state,action)=>{
            const productInCart = state.value.cartItems.find(item=>item.id===action.payload.id)
            
            if(productInCart){
                if (productInCart.quantity > 1) {
                    productInCart.quantity -= 1;
                } else {
                    state.value.cartItems = state.value.cartItems.filter(item => item.id !== action.payload.id);
                }
            }
            
            const total = calculate_total_price(state.value.cartItems);

            state.value = {
                ...state.value,
                total,
                updatedAt: new Date().toLocaleString(),
            };

        },
        clearCart: (state) => {    
            state.value.cartItems = [];
        
            // Recalcular el total (será 0 porque el carrito está vacío)
            const total = calculate_total_price(state.value.cartItems);
        
            state.value = {
                ...state.value,
                total,
                updatedAt: new Date().toLocaleString(),
            };
        }
    }
})

export const {addItem, removeItem,clearCart} = cartSlice.actions

export default cartSlice.reducer