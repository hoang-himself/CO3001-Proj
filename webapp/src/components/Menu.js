import React, { useState, Component } from 'react'
import { ReactComponent as CartLogo } from "./assets/svg/cart.svg";

const Item = ({ id, name, price, image, onClick }) => {
  const [shadow, setShadow] = useState("1px 1px 10px rgba(0, 0, 0, 0.1)")
  const [cart, setCart] = useState({ background: "red", fill: "white" })

  const onMouseEnterFrame = () => {
    setShadow("1px 1px 10px rgba(0, 0, 0, 0.5)");
  }

  const onMouseLeaveFrame = () => {
    setShadow("1px 1px 10px rgba(0, 0, 0, 0.1)")
  }

  const onMouseEnterCart = () => {
    setCart({ background: "#E9F0FF", fill: "red" })
  }

  const onMouseLeaveCart = () => {
    setCart({ background: "red", fill: "white" })
  }

  const onMouseDownCart = () => {
    setCart({ background: "#2C3A57", fill: "red" })
  }

  const onMouseUpCart = () => {
    setCart({ background: "#E9F0FF", fill: "red" })
    onClick(id);
  }

  return (
    <div className="menu-item-container"
      style={{ boxShadow: shadow }}
      onMouseEnter={onMouseEnterFrame}
      onMouseLeave={onMouseLeaveFrame}>
      <img src={image} alt="Cupcake"></img>
      <div className="menu-item-description" >
        <div>
          <p className="menu-text-wrap menu-item-text">
            <span className="menu-item-text" style={{ color: "red" }}>
              {id + 1}.
            </span>
            {" " + name}
          </p>
        </div>
        <p className="menu-item-text menu-price">
          Kr {price}
        </p>
        <CartLogo className="menu-cart"
          style={cart}
          onMouseEnter={onMouseEnterCart}
          onMouseLeave={onMouseLeaveCart}
          onMouseDown={onMouseDownCart}
          onMouseUp={onMouseUpCart}
        />
      </div>
    </div>
  )
}

class Menu extends Component {

  render() {
    return (
      <div className="menu-container" >
        <p className="menu-category-font">{this.props.category}</p>
        <div className="menu-line"></div>
        <section className="menu-main-container">
          {this.props.items.map(item => {
            return <Item
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              onClick={this.props.onClick}
            />
          })}
        </section>
      </div>
    )
  }
}

export default Menu
