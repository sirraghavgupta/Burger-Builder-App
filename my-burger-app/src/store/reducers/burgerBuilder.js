import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


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



const addIngredient = ( state, action ) => {
    const updatedIngredient = { 
        [action.ingredientName] : state.ingredients[action.ingredientName] + 1 
    };
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient);
    const updatedPrice = state.totalPrice + INGREDIENT_PRICE[action.ingredientName];

    return updateObject( state, { ingredients : updatedIngredients, totalPrice : updatedPrice });
}


const removeIngredient = ( state, action ) => {
    const updatedIngredient = { 
        [action.ingredientName] : state.ingredients[action.ingredientName] - 1 
    };
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient);
    const updatedPrice = state.totalPrice - INGREDIENT_PRICE[action.ingredientName];

    return updateObject( state, { ingredients : updatedIngredients, totalPrice : updatedPrice });
}


const setIngredients = ( state, action ) => {
    return updateObject( state, { ingredients : {...action.ingredients}, error : false, totalPrice : 4 });
}


const fetchIngredientsFailed = ( state, action ) => {
    return updateObject( state, { error : true } ); 
}




const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.ADD_INGREDIENT : return addIngredient( state, action );
        
        case actionTypes.REMOVE_INGREDIENT : return removeIngredient( state, action ) 
           
        case actionTypes.SET_INGREDIENTS : return setIngredients( state, action );
        
        case actionTypes.FETCH_INGREDIENTS_FAILED : return fetchIngredientsFailed( state, action );
        
        default : return state;
    }
}


export default reducer;