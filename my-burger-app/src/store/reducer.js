import * as actionTypes from './actions';

const initialState = {

    ingredients : {
        salad : 0,
        bacon : 0,
        meat : 0,
        cheese : 0
    },
    totalPrice : 4
}


const INGREDIENT_PRICE = {
    bacon : 0.5,
    meat : 0.2,
    salad : 0.3,
    cheese : 0.4
};


const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.ADD_INGREDIENT : 
            console.log("invoked");
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            };
        
        case actionTypes.REMOVE_INGREDIENT : 
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            };
        
        default : 
            return state;
    }
}


export default reducer;