import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from './header'
import './basket.scss'
import { addSelection, removeSelection } from '../redux/reducers/products'

const Basket = () => {
  const dispatch = useDispatch()

  const listProd = useSelector((s) => s.products.productsList)
  const select = useSelector((s) => s.products.selection)
  const rates = useSelector((s) => s.products.rates)
  const base = useSelector((s) => s.products.base)
  const getProduct = (id) => listProd.find((it) => it.id === id)
  const basketList = Object.entries(select).reduce((acc, [id, qty]) => {
    return [...acc, { ...getProduct(id), amount: qty }]
  }, [])
  const sum = Object.entries(select)
    .reduce((acc, [id, qty]) => acc + getProduct(id).price * qty * (rates[base] || 1), 0)
    .toFixed(2)
  const symbols = {
    USD: '$',
    EUR: 'E',
    CAD: 'C'
  }

  return (
    <div>
      <Header />
      <div>
        <div className="container">
          <div className="bag">
            <div className="bag-list">
              <div className="title">Bag</div>
              <div className="bag-list__items">
                {basketList.map((card) => {
                  return (
                    <div className="bag-card" key={card.title}>
                      <div className="bag-card__image">
                        <img className="image" src={card.image} alt={card.title} />
                      </div>
                      <div className="bag-card__info">
                        <div className="bag-card__title">
                          <h3>{card.title}</h3>
                          <div className="bag__price">
                            {(card.price * (rates[base] || 1)).toFixed(2)} {symbols[base]}
                          </div>
                          <div className="bag__amount">
                            <div className="bag__button-del">
                              <button
                                type="button"
                                onClick={() => {
                                  dispatch(removeSelection(card.id))
                                }}
                              >
                                -
                              </button>
                            </div>
                            <div className="bag__product-amount">{select[card.id] || 0}</div>

                            <div className="bag__button-add">
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
                        <div className="bag-card__sum-price">
                          {((select[card.id] || 0) * (card.price * (rates[base] || 1))).toFixed(2)}{' '}
                          {symbols[base]}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="bag-info">
              <div className="title">Summary</div>
              <div className="bag__total-price">
                {sum} {symbols[base]}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="basket-list">
          {basketList.map((card) => {
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
        </div> */}
      </div>
    </div>
  )
}

Basket.propTypes = {}

export default React.memo(Basket)
