import axios from 'axios'

const GET_PRODUCTS_LIST = 'GET_PRODUCTS_LIST'
const ADD_TO_SELECTION = 'ADD_TO_SELECTION'
const DEL_FROM_SELECTION = 'DEL_FROM_SELECTION'
const GET_RATES = 'GET_RATES'
const SET_BASE = 'SET_BASE'
const SORT_PRODUCTS = 'SORT_PRODUCTS'

const initialState = {
  productsList: [],
  selection: [],
  rates: {},
  sortProducts: []
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
    case GET_PRODUCTS_LIST: {
      return { ...state, productsList: action.data }
    }
    case GET_RATES: {
      return { ...state, ...action.rates }
    }
    case SET_BASE: {
      return { ...state, base: action.base }
    }
    case SORT_PRODUCTS: {
      return { ...state, productsList: action.sorted }
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

export function sortProductList(listProd, type) {
    const types = {
      price: 'price',
      "A-Z": 'title'
    }
    const sortProperty = types[type]
    const sorted = [...listProd].sort((a, b) => {
      if (a[sortProperty] > b[sortProperty]) return 1
      if (a[sortProperty] < b[sortProperty]) return -1
      return 0
    })
    return { type: SORT_PRODUCTS, sorted }
}
