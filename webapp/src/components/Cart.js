import React, { Component, useState } from 'react'
import { ReactComponent as CartLogo } from "./assets/svg/cart.svg";
import { ReactComponent as Plus } from "./assets/svg/plus.svg";
import { ReactComponent as Minus } from "./assets/svg/minus.svg";

import CokeMenu from "./assets/png/menu/hamburger.png"

const Item = ({ id, name, image, totalPrice, quantity, detail, setQuantity }) => {
  const [plus, setPlus] = useState("red")
  const [minus, setMinus] = useState("#2C3A57")

  const onMouseLeavePlus = () => {
    setPlus("red");
  }

  const onMouseDownPlus = () => {
    setPlus("#FC9393");
  }

  const onMouseUpPlus = () => {
    setPlus("red");
    setQuantity(id - 1, quantity + 1);
  }

  const onMouseLeaveMinus = () => {
    setMinus("#2C3A57");
  }

  const onMouseDownMinus = () => {
    setMinus("#C8CCD4");
  }

  const onMouseUpMinus = () => {
    setMinus("#2C3A57");
    setQuantity(id - 1, quantity - 1);
  }

  return (
    <div className="cart-item-container">
      <div className="cart-item-image-wrap">
        <img src={image} alt="Coke" className="cart-item-image" ></img>
      </div>
      <div>
        <p className="cart-text-wrap cart-item-text">
          <span className="cart-item-text" style={{ color: "red", textOverflow: "ellipsis" }}>
            {id + ". "}
          </span>
          {name}
        </p>
        <div style={{ minHeight: "10px" }}>
          {detail.map((d, index) => {
            return (
              <p
                className="cart-text-wrap cart-item-text cart-item-detail"
                key={index}
              >
                {d.desc} <span style={{ float: "right", color: "red", fontWeight: "bold" }}>Kr {d.price}</span>
              </p>
            )
          })}
        </div>
      </div>
      <div className="cart-item-quantity" style={{}}>
        <Minus className="cart-quantity"
          style={{
            marginLeft: "80px",
            fill: minus,
            border: "2px solid #C8CCD4"
          }}
          onMouseLeave={onMouseLeaveMinus}
          onMouseDown={onMouseDownMinus}
          onMouseUp={onMouseUpMinus}
        />
        <span className="cart-quantity-label">{quantity}</span>
        <Plus
          className="cart-quantity"
          style={{ fill: plus }}
          onMouseLeave={onMouseLeavePlus}
          onMouseDown={onMouseDownPlus}
          onMouseUp={onMouseUpPlus}
        />
      </div>
      <span className="cart-item-price">Kr {totalPrice}</span>
      <span className="cart-item-price cart-item-tax">
        (Incl. tax 10% = Kr {Math.round(totalPrice) / 100})
      </span>
    </div >
  )
}

class Cart extends Component {
  cart = [
    {
      id: 0,
      quantity: 1,
      detail: []
    },
    {
      id: 4,
      quantity: 1,
      detail: []
    },
    {
      id: 8,
      quantity: 1,
      detail: [
        {
          desc: "Not raw",
          price: "100"
        }
      ]
    },
    {
      id: 9,
      quantity: 9999,
      detail: [
        {
          desc: "Cup size: Humongous",
          price: 99999
        },
        {
          desc: "Face: Freaking cute",
          price: 8888
        },
        {
          desc: "Existence: Yes pls :(",
          price: 6969
        },
        {
          desc: "2D: No pls :(",
          price: 10
        },
      ]
    },
  ]
  item = {
    id: 1,
    name: "Fuck Fuck Fuck Fuck Fuck  Fuck  Fuck  Fuck Fuck" +
      "Fuck  Fuck Fuck Fuck Fuck Fuck Fuck Fuck Fuck Fuck",
    image: CokeMenu,
    price: 1200,
    quantity: 5,
    detail: [
      {
        desc: "Cup size: Humongous",
        price: 99999
      },
      {
        desc: "Face: Freaking cute",
        price: 8888
      },
      {
        desc: "Existence: Yes pls :(",
        price: 6969
      },
      {
        desc: "2D: No pls :(",
        price: 10
      },
    ]
  }

  render() {
    var totalPay = 0;

    return (
      <div className="cart-container" >
        <div className="cart-header" >
          <CartLogo className="cart-logo" />
          <h1 className="cart-font" > Your cart </h1>
          <button className="dine-button">DINE IN</button>
        </div>
        <div className="cart-main-container">
          {this.props.cart.map((c, index) => {
            var totalPrice = c.price;
            c.detail.forEach((d) => {
              totalPrice += d.price
            })
            totalPrice = Math.round(totalPrice * c.quantity * 100) / 100
            totalPay += totalPrice;

            return <Item
              key={index}
              id={c.id + 1}
              name={c.name}
              image={c.image}
              totalPrice={totalPrice}
              quantity={c.quantity}
              detail={c.detail}
              setQuantity={this.props.setQuantity}
            />
          })}
        </div>
        <div className="cart-checkout">
          Total:
          <p style={{
            float: 'right',
            color: "red",
            fontSize: "25px",
          }}>
            Kr {Math.round(totalPay * 100) / 100}
          </p>
          <p style={{
            float: 'right',
            fontSize: "15px",
          }}>
            (Incl. tax 10% = Kr {Math.round(totalPay) / 100})
          </p>
          <div className="cart-payment">
            <p>
              PAYMENT
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart
