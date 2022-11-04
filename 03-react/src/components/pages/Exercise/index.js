import './assets/styles.css'
import React, { useState } from 'react'

export default function Exercise01 () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25
    },
    {
      m: [2, 4, 1],
      discount: 0.5
    },
    {
      m: [4, 2],
      discount: 0.1
    }
  ]

  const [cart, setCart] = useState([])

  const handleAddItemToCart = (item) => {
    setCart((prev) => {
      const isItemInTheCart = prev.find((i) => i.id === item.id)
      if (isItemInTheCart) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const handleIncrementCart = (item) => {
    setCart((prev) => {
      const isItemInTheCart = prev.find((i) => i.id === item.id)
      if (isItemInTheCart) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItemCart = (item) => {
    const id = item.id
    setCart((item) =>
      item.filter((cart) => cart.id !== id)
    )
  }

  const handleDecrementCart = (item) => {
    if (item.quantity < 2) {
      removeItemCart(item)
    } else {
      setCart((prev) => {
        const isItemInTheCart = prev.find((i) => i.id === item.id)
        if (isItemInTheCart) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
          )
        }
        return [...prev, { ...item, quantity: 1 }]
      })
    }
  }
  const { discount, m } = discountRules[0]
  const { discount: discount1, m: m1 } = discountRules[1]
  const { discount: discount2, m: m2 } = discountRules[2]
  const validar = () => {
    const encontrado = cart.filter(x => x.id === m[0])
    const encontrado2 = cart.filter(x => x.id === m[1])
    const encontrado3 = cart.filter(x => x.id === m1[0])
    const encontrado4 = cart.filter(x => x.id === m1[1])
    const encontrado5 = cart.filter(x => x.id === m1[2])
    const encontrado6 = cart.filter(x => x.id === m2[0])
    const encontrado7 = cart.filter(x => x.id === m2[1])
    if (encontrado.length && encontrado2.length) {
      return discount
    } if (encontrado3.length && encontrado4.length && encontrado5.length) {
      return discount1
    } if (encontrado6.length && encontrado7.length) {
      return discount2
    } else {
      return 0
    }
  }
  const getTotal = () => cart.reduce((sum, i) => (sum + i.price * i.quantity) - ((i.price * i.quantity) * validar()), 0) // TODO: Implement this

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li className="movies__list-card" key={o.id}>
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => handleAddItemToCart(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(x => (
            <li className="movies__cart-card" key={x.id}>
              <ul>
                <li>
                  ID: {x.id}
                </li>
                <li>
                  Name: {x.name}
                </li>
                <li>
                  Price: ${x.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => handleDecrementCart(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => handleIncrementCart(x)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal().toFixed(2)}</p>
        </div>
      </div>
    </section>
  )
}
