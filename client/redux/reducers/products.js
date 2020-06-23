import axios from 'axios'

const GET_PRODUCTS_LIST = 'GET_PRODUCTS_LIST'
const ADD_TO_SELECTION = 'ADD_TO_SELECTION'
const DEL_FROM_SELECTION = 'DEL_FROM_SELECTION'
const GET_RATES = 'GET_RATES'
const SET_BASE = 'SET_BASE'
const ADD_TO_BASKET = 'ADD_TO_BASKET'



const initialState = {
  productsList: [],
  selection: [],
  rates: {},
  basketProducts: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_SELECTION: {
      // return {
      //   ...state,
      //   selection: [
      //     ...state.selection, {...action.card,
      //     amount: 0 + 1 }
      //   ]
      // }
      return {
        ...state,
        selection: {
          ...state.selection,
          [action.id]: (state.selection[action.id] || 0) + 1
        }
      }
    }
    case DEL_FROM_SELECTION: {
      const newSelection = {
        ...state.selection,
        [action.id]: (state.selection[action.id] || 0) - 1
      }
      if (newSelection[action.id] <= 0) {
        delete newSelection[action.id]
      }
      return {
        ...state,
        selection: newSelection
      }
    }
    case ADD_TO_BASKET: {
      return { ...state, basketProducts: action.basket }
    }

    case GET_PRODUCTS_LIST: {
      return { ...state, productsList: action.data }
    }
    case GET_RATES: {
      return { ...state, ...action.rates }
    }
    case SET_BASE: {
      return { ...state, base: action.base }
    }
    default:
      return state
  }
}

export function getProducts() {
  return (dispatch) => {
    axios.get('/api/v1/products').then(({ data }) => {
      dispatch({ type: GET_PRODUCTS_LIST, data })
    })
  }
}

export function getRates() {
  return (dispatch) => {
    axios.get('/api/v1/rates').then(({ data: rates }) => {
      dispatch({ type: GET_RATES, rates })
    })
  }
}

export function addSelection(id) {
  return { type: ADD_TO_SELECTION, id }
}

export function removeSelection(id) {
  return { type: DEL_FROM_SELECTION, id }
}

export function setBase(base) {
  return { type: SET_BASE, base }
}

export function addBasket(basket) {
  return { type: ADD_TO_BASKET, basket }
}

