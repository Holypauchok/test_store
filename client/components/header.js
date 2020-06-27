import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setBase } from '../redux/reducers/products'

const Header = () => {
  const dispatch = useDispatch()
  const listProd = useSelector((s) => s.products.productsList)

  const select = useSelector((s) => s.products.selection)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const amountBacket = Object.values(select).reduce((acc, rec) => acc + rec, 0)
  const getPrice = (id) => listProd.find((it) => it.id === id).price
  const sum = Object.entries(select)
    .reduce((acc, [id, qty]) => acc + getPrice(id) * qty * (rates[base] || 1), 0)
    .toFixed(2)

  const symbols = {
    USD: '$',
    EUR: 'E',
    CAD: 'C'
  }
  return (
    <header className="header">
      <div className="header__container container">
        <span className="header__title">
          {' '}
          <Link to="/">store</Link>
        </span>
        <div className="header__currency-switcher">
          {['CAD', 'USD', 'EUR'].map((it) => {
            return (
              <button
                key={it}
                type="button"
                className={`mx-4 ${base === it ? 'active' : ''}`}
                onClick={() => {
                  dispatch(setBase(it))
                }}
              >
                {it}
              </button>
            )
          })}
        </div>
        <div className="header__basket-info basket-header">
          <Link to="/basket">
            <div className="basket-header__amount">
              <img src="../images/icons/icon_basket.png" alt="icon_basket" />
              <p>{amountBacket !== 0 && amountBacket}</p>
            </div>
          </Link>
          <div className="basket-header__sum">
            {sum !== 0 && sum}
            {symbols[base]}
          </div>
          {/* <ul>
            <li className="basket-header__amount">
              <Link to="/basket">{amountBacket}</Link>
            </li>
            <li>
              {sum}
              {symbols[base]}
            </li>
          </ul> */}
        </div>
      </div>
    </header>
    // <header className="header">
    //   <div className="container">
    //     <div className="header__content">
    //       <Link to="/">
    //         <div className="header__title">
    //           <div className="header__icon">
    //             <img src="../images/icons/icon_header.png" alt="icon_header" />
    //           </div>
    //           <div className="header__text">store</div>
    //         </div>
    //       </Link>
    //       <div className="header__currency-switcher">
    //         {['CAD', 'USD', 'EUR'].map((it) => {
    //           return (
    //             <button
    //               key={it}
    //               type="button"
    //               className={`mx-4 ${base === it ? 'underline' : ''}`}
    //               onClick={() => {
    //                 dispatch(setBase(it))
    //               }}
    //             >
    //               {it}
    //             </button>
    //           )
    //         })}
    //       </div>
    //       <div className="header__basket">
    //         <div className="header__basket-amount">
    //           <Link to="/basket">
    //             <img src="../images/icons/icon_basket.png" alt="icon_basket" />
    //           </Link>
    //           {amountBacket !== 0 && amountBacket}
    //         </div>
    //         <div className="header__basket-sum">
    //           {sum !== 0 && sum}
    //           {symbols[base]}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </header>
  )
}

export default React.memo(Header)
