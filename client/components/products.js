import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from './head'
import {
  addSelection,
  removeSelection,
  getProducts,
  getRates,
  sortProductList
} from '../redux/reducers/products'

const Products = () => {
  const dispatch = useDispatch()

  const listProd = useSelector((s) => s.products.productsList)
  const select = useSelector((s) => s.products.selection)
  const rates = useSelector((s) => s.products.rates)
  const base = useSelector((s) => s.products.base)
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getRates())
  }, [])

  const symbols = {
    USD: '$',
    EUR: 'E',
    CAD: 'C'
  }
  return (
    <div>
      <Head title="Hello" />
      <div className="content">
        <div className="container">
          <div className="content__title">choose any products</div>
          <div className="content__filter">
            {['A-Z', 'price'].map((it) => {
              return (
                <button
                  key={it}
                  type="button"
                  value={it}
                  onClick={(e) => dispatch(sortProductList(listProd, e.target.value))}
                >
                  {it}
                </button>
              )
            })}
          </div>
          <div className="cards-list">
            {listProd.map((card) => {
              return (
                <div className="card" key={card.title}>
                  <div className="card__image">
                    <img className="image" src={card.image} alt={card.title} />
                  </div>
                  <div className="card__info">
                    <div className="card__title">{card.title}</div>
                    <div className="card__price">
                      {(card.price * (rates[base] || 1)).toFixed(2)} {symbols[base]}
                    </div>
                  </div>
                  <div className="card__amount">
                    <div className="card__button-del">
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(removeSelection(card.id))
                        }}
                      >
                        -
                      </button>
                    </div>
                    <div className="card__product-amount">{select[card.id] || 0}</div>

                    <div className="card__button-add">
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(addSelection(card.id))
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

Products.propTypes = {}

export default React.memo(Products)