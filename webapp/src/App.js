import React, { Component } from 'react';

import { ReactComponent as Home } from "./components/assets/svg/house.svg";
import Cart from "./components/Cart"
import Category from "./components/Category"
import Menu from "./components/Menu"

import Cupcake from "./components/assets/png/cupcake.png"
import Seafood from "./components/assets/png/seafood.png"
import Juice from "./components/assets/png/juice.png"
import Coke from "./components/assets/png/coke.png"
import Alcohol from "./components/assets/png/alcohol.png"
import Candy from "./components/assets/png/candy.png"

import Hamburger from "./components/assets/png/menu/hamburger.png"
import GrilledSquid from "./components/assets/png/menu/grilled_squid.png"
import ChickenNuggets from "./components/assets/png/menu/chicken_nuggets.png"
import CokeMenu from "./components/assets/png/menu/coke.png"
import Kimchi from "./components/assets/png/menu/kimchi.png"
import TomatoPotato from "./components/assets/png/menu/tomato_potato.png"
import Salad from "./components/assets/png/menu/salad.png"
import Steak from "./components/assets/png/menu/steak.png"
import Pork from "./components/assets/png/menu/pork.png"
import Weeb from "./components/assets/png/menu/weeb.png"

class App extends Component {

  state = {
    chosen: 0,
    curIdx: 0,
    cart: [
      {
        id: 0,
        quantity: 1,
        detail: []
      },
      {
        id: 2,
        quantity: 1,
        detail: []
      },
      {
        id: 3,
        quantity: 1,
        detail: []
      },
      {
        id: 4,
        quantity: 1,
        detail: []
      },
      {
        id: 6,
        quantity: 1,
        detail: []
      },
      {
        id: 8,
        quantity: 1,
        detail: [
          {
            desc: "Not raw",
            price: 100
          }
        ]
      },
      {
        id: 9,
        quantity: 9,
        detail: [
          {
            desc: "Cup size: Humongous",
            price: 9999
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
    ],
  }
  // Category
  categories = [
    { id: 0, image: Cupcake, name: 'Cupcake' },
    { id: 1, image: Seafood, name: 'Sea food' },
    { id: 2, image: Juice, name: 'Juice' },
    { id: 3, image: Coke, name: 'Coke' },
    { id: 4, image: Alcohol, name: 'Alcohol' },
    { id: 5, image: Candy, name: 'Candy' },
  ]
  leftFull = () => {
    return this.state.curIdx <= 0
  }
  rightFull = () => {
    return this.state.curIdx + 5 >= this.categories.length
  }
  getCategories = () => {
    var idx = this.state.curIdx;
    var init;
    if (idx + 5 <= this.categories.length) {
      init = idx;
    } else {
      init = this.categories.length - 5;
    }

    if (init > this.state.chosen || init + 4 < this.state.chosen) {
      this.setState({ chosen: init });
    }

    return this.categories.slice(init, init + 5);
  }
  prevCategories = () => {
    if (!this.leftFull()) {
      var idx = this.state.curIdx - 5;
      idx = idx < 0 ? 0 : idx;
      this.setState({ curIdx: idx });
    }
  }
  nextCategories = () => {
    if (!this.rightFull()) {
      var idx = this.state.curIdx + 10;
      idx = idx > this.categories.length ? this.categories.length - 5 : idx;
      this.setState({ curIdx: idx });
    }
  }
  categoryClick = (id) => {
    this.setState({ chosen: id });
  }
  getCateBackground = () => {
    var temp = [
      'white', 'white', 'white', 'white', 'white'
    ];
    temp[this.state.chosen - this.state.curIdx] = '#2C3A57';
    return temp;
  }

  // Menu
  menuItems = [
    { id: 0, name: "Hamburger", image: Hamburger, price: 123.00 },
    { id: 1, name: "Grilled squid satay", image: GrilledSquid, price: 241.69 },
    { id: 2, name: "Chicken nuggets", image: ChickenNuggets, price: 51241.12 },
    { id: 3, name: "Coca Cola", image: CokeMenu, price: 5126.25 },
    { id: 4, name: "Kimchi", image: Kimchi, price: 6426.25 },
    { id: 5, name: "Tomato & potato hybridization", image: TomatoPotato, price: 862.64 },
    { id: 6, name: "Salad", image: Salad, price: 325.64 },
    { id: 7, name: "Medium rare steak", image: Steak, price: 982.22 },
    { id: 8, name: "Raw pork", image: Pork, price: 77.22 },
    { id: 9, name: "Don't ask me, this is just an example", image: Weeb, price: 10.01 },
  ]
  menuAddCart = (id) => {
    var cart = this.state.cart
    var found = false;
    cart.forEach(function (part, index) {
      if (part.id === id) {
        this[index] = {
          id: part.id,
          quantity: part.quantity + 1,
          detail: part.detail,
        }
        found = true;
      }
    }, cart);

    if (!found) {
      cart.push({
        id: id,
        quantity: 1,
        detail: []
      })
    }

    // sort array by id
    cart.sort(function (a, b) {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    })

    this.setState({ cart: cart });
  }

  // Cart
  getCartItems = () => {
    let cart = this.state.cart;
    let items = this.menuItems;

    cart.forEach(function (part, index) {
      this[index] = {
        id: part.id,
        quantity: part.quantity,
        detail: part.detail,
        name: items[part.id].name,
        image: items[part.id].image,
        price: items[part.id].price,
      };
    }, cart);

    return cart;
  }
  setQuantity = (id, quantity) => {
    console.log("id: " + id + " quantity: " + quantity);
    let cart = this.state.cart;
    let i = 0;

    for (i; i < cart.length; i++) {
      if (cart[i].id === id) break;
    }

    if (quantity === 0) { cart.splice(i, 1) }
    else {
      cart[i] = {
        id: cart[i].id,
        quantity: quantity,
        detail: cart[i].detail,
      }
    }

    this.setState({ cart: cart })
  }

  render() {

    return (
      <div className="app no-select">
        <div className="home-container" >
          <button className="home-button" >
            <Home className="home-logo"
            />
          </button>
          <p className="home-font" > Back to Home </p>
        </div>
        <Category
          categories={this.getCategories()}
          curIdx={this.state.curIdx}
          chosen={this.state.chosen - this.state.curIdx}
          onClick={this.categoryClick}
          leftFull={this.leftFull}
          rightFull={this.rightFull}
          prevCategories={this.prevCategories}
          nextCategories={this.nextCategories}
          backgrounds={this.getCateBackground()}
        />
        <Menu
          category={this.categories[this.state.chosen].name}
          items={this.menuItems}
          onClick={this.menuAddCart}
        />
        <Cart
          cart={this.getCartItems()}
          setQuantity={this.setQuantity}
        />
      </div>
    );
  }
}

export default App;