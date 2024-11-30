import { configureStore } from "@reduxjs/toolkit"; // Redux Toolkit se configureStore function import kar rahe hain
import cartReducer from './cart'; // Cart reducer ko import kar rahe hain jo cart ki state ko manage karega

export const store = configureStore({ // Redux store ko configure kar rahe hain
    reducer: { // Reducers ka object define kar rahe hain
        cart: cartReducer, // Cart reducer ko 'cart' key ke saath store mein add kar rahe hain
        // user: ... // Yahan user reducer ko add karne ke liye jagah chhodi gayi hai
    }
})