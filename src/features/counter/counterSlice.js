import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'panier',
    initialState: {
        items: [
            {id: 1, title: 'Produit 1',url:"https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/73af7e44-42e5-5ed1-94ca-9d30c532e7e4/8e40e43a-83d8-5e2e-96f9-36fec456d47e.jpg" ,price: 10.0, quantity: 2},
            {id: 2, title: 'Produit 2',url:"https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/07e85105-ecad-5c11-8e95-3655291ab767/ed29c357-a8f3-53e4-8b81-2ae9ae4708f4.jpg", price: 20.0, quantity: 1},

        ],
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        augmenterQuantite: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        diminuerQuantite: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        viderPanier: (state) => {
            state.items = [];
        },
        afficherPanier: (state) => {
            console.log("Contenu du panier :", state.items);
        },

    },
});
export const {addItem, removeItem, augmenterQuantite, diminuerQuantite , viderPanier , afficherPanier} = counterSlice.actions;
export default counterSlice.reducer;
