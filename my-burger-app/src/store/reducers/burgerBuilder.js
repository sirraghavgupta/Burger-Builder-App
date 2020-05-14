import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients : null,
    totalPrice : 4,
    error : false
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

        case actionTypes.SET_INGREDIENTS : 
            return {
                ...state,
                /**
                 * here we can set the order of ingredients if we want. 
                 * but then there will be no flexibility that we get our
                 * ingredients from the server. but, we also dont have the 
                 * flexibility with our ingredients in css. 
                 */
                ingredients : {...action.ingredients},
                error : false,
                totalPrice : 4
            };
        
        case actionTypes.FETCH_INGREDIENTS_FAILED : 
            return {
                ...state,
                error : true
            };
        
        default : 
            return state;
    }
}


export default reducer;