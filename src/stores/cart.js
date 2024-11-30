import { createSlice } from "@reduxjs/toolkit"; // Redux Toolkit se createSlice function ko import kar rahe hain, jo state management ke liye use hota hai

// Initial state define kar rahe hain, jo cart ki shuruaati sthiti ko darshata hai
const initialState = {
    items: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [], // Agar local storage me 'carts' hai, to use parse karke items me daal rahe hain, nahi to khali array
    statusTab: false // Status tab ki initial value false hai, jo tab ko band dikhata hai
}

// Cart slice create kar rahe hain, jo state aur reducers ko encapsulate karta hai
const cartSlice = createSlice({
    name: 'cart', // Slice ka naam 'cart' hai, jo is slice ko identify karne me madad karta hai
    initialState, // Is slice ka initial state set kar rahe hain
    reducers: { // Reducers define kar rahe hain, jo state ko update karne ke liye functions hain
        addToCart(state, action){ // Cart me item add karne ka reducer function
            const {productId, quantity} = action.payload; // Action se productId aur quantity ko destructure kar rahe hain
            const indexProductId = (state.items).findIndex(item => item.productId === productId); // Cart me productId ka index dhoond rahe hain

            if(indexProductId >= 0){ // Agar product already cart me hai (index 0 ya usse zyada)
                state.items[indexProductId].quantity += quantity; // Toh uski quantity ko update kar rahe hain
            }else{ // Agar product cart me nahi hai (index -1)
                state.items.push({productId, quantity}); // Naya product object create karke items array me add kar rahe hain
            }
            localStorage.setItem("carts", JSON.stringify(state.items)); // Updated items array ko local storage me JSON format me save kar rahe hain
        },
        changeQuantity(state, action){ // Quantity change karne ka reducer function
            const {productId, quantity} = action.payload; // Action se productId aur quantity ko destructure kar rahe hain
            const indexProductId = (state.items).findIndex(item => item.productId === productId); // Product ka index dhoond rahe hain

            if(quantity > 0){ // Agar quantity positive hai
                state.items[indexProductId].quantity = quantity; // Toh uski quantity ko nayi value se update kar rahe hain
            }else{ // Agar quantity zero ya negative hai
                state.items = (state.items).filter(item => item.productId !== productId); // Toh product ko cart se remove kar rahe hain, filter function se
            }
            localStorage.setItem("carts", JSON.stringify(state.items)); // Updated items array ko local storage me save kar rahe hain
        },
        toggleStatusTab(state){ // Status tab ko toggle karne ka reducer function
            if(state.statusTab === false){ // Agar statusTab false hai
                state.statusTab = true; // Toh usse true kar rahe hain, tab ko khol rahe hain
            }else{ // Agar statusTab true hai
                state.statusTab = false; // Toh usse false kar rahe hain, tab ko band kar rahe hain
            }
        }
    }
})

// Actions ko export kar rahe hain, taaki components me use kiya ja sake
export const { addToCart, changeQuantity, toggleStatusTab } = cartSlice.actions;
// Reducer ko export kar rahe hain, jo store me use hoga
export default cartSlice.reducer;