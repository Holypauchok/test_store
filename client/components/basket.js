import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from './header'
import { addSelection, removeSelection, getProducts, getRates } from '../redux/reducers/products'

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
    useEffect(() => {
      dispatch(getProducts())
      dispatch(getRates())
    }, [])
  const sum = Object.entries(select)
    .reduce((acc, [id, qty]) => acc + getProduct(id).price * qty * (rates[base] || 1), 0)
    .toFixed(2)
  const symbols = {
    USD: '$',
    EUR: 'E',
    CAD: 'C'
  }

  return Object.keys(basketList).length === 0 ? (
    <div>
      <Header />
      <div className="bag__title">
        hey, your bag is empty. Go to <Link to="/">main</Link>
      </div>
    </div>
  ) : (
    <div>
      <Header />
      <div>
        <div className="bag container">
          <div className="bag__title">Bag</div>
          <div className="bag__list">
            {basketList.map((card) => {
              return (
                <div className="product" key={card.title}>
                  <div className="prod-img">
                    <img className="product__image" src={card.image} alt={card.title} />
                  </div>
                  <div className="product__info">
                    <h3 className="product__title">{card.title}</h3>
                    <div className="product__price">
                      {(card.price * (rates[base] || 1)).toFixed(2)} {symbols[base]}
                    </div>
                    <div className="product__amount">{select[card.id] || 0}</div>
                    <div className="product__total_price">
                      {((select[card.id] || 0) * (card.price * (rates[base] || 1))).toFixed(2)}{' '}
                      {symbols[base]}
                    </div>
                    <button
                      type="button"
                      className="product__remove"
                      onClick={() => {
                        dispatch(removeSelection(card.id))
                      }}
                    >
                      remove
                    </button>
                    <button
                      className="product__add"
                      type="button"
                      onClick={() => {
                        dispatch(addSelection(card.id))
                      }}
                    >
                      add
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="bag__sum">
            total sum: {sum} {symbols[base]}
          </div>
        </div>
      </div>
    </div>
  )
}

Basket.propTypes = {}

export default React.memo(Basket)
