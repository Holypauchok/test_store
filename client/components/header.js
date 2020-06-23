import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './header.scss'
import { setBase } from '../redux/reducers/products'
// import { history } from '../redux'

const Header = () => {
  const dispatch = useDispatch()
  const listProd = useSelector((s) => s.products.productsList)

  const select = useSelector((s) => s.products.selection)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const amountBacket = Object.values(select).reduce((acc, rec) => acc + rec, 0)
  const getPrice = (id) => listProd.find((it) => it.id === id).price
  const sum = Object.entries(select).reduce(
    (acc, [id, qty]) => acc + getPrice(id) * qty * (rates[base] || 1),
    0
  ).toFixed(2)

   const symbols = {
     USD: '$',
     EUR: 'E',
     CAD: 'C'
   }
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/">
            <div className="header__title">
              <div className="header__icon">
                <img src="../images/icons/icon_header.png" alt="icon_header" />
              </div>
              <div className="header__text">store</div>
            </div>
          </Link>
          <div className="header__currency-switcher">
            {['CAD', 'USD', 'EUR'].map((it) => {
              return (
                <button
                  key={it}
                  type="button"
                  className={`mx-4 ${base === it ? 'underline' : ''}`}
                  onClick={() => {
                    dispatch(setBase(it))
                  }}
                >
                  {it}
                </button>
              )
            })}
          </div>
          <div className="header__basket">
            <div className="header__basket-amount">
              <Link to="/basket">
                <img src="../images/icons/icon_basket.png" alt="icon_basket" />
              </Link>
              {amountBacket !== 0 && amountBacket}
            </div>
            <div className="header__basket-sum">
              {sum !== 0 && sum}
              {symbols[base]}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default React.memo(Header)
