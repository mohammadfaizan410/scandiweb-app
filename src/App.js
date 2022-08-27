//ShortComings :
//Cart overlay displays the total amount and price only in USD.
//item with same attribute and name as an item in cart dosen't update the count
//instead count of that item can be increased from cart or cartOverlay.
import React, { Component } from "react";
import Products from "./components/Products";
import "./components/styles/app.css";
import SingleProduct from "./components/SingleProduct";
import CartOverlay from "./components/CartOverlay";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import MainCart from "./components/MainCart";
class App extends Component {
  state = {
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    currency: "USD",
    label: "$",
    currentItem: localStorage.getItem("current")
      ? JSON.parse(localStorage.getItem("current"))
      : null,
    selectedLink: localStorage.getItem("selectedLink")
      ? localStorage.getItem("selectedLink")
      : "allProducts",
    CartOverlayClicked: "none",
    currentAttrs: {}
  };

  disableOverlay = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        CartOverlayClicked: "none",
      };
    });
  }; 

  handleCartOverlayClick = (e) => {
    if (this.state.CartOverlayClicked === "none") {
      this.setState((prevState) => {
        return {
          ...prevState,
          CartOverlayClicked: "block",
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          CartOverlayClicked: "none",
        };
      });
    }
  };

  getPriceArray = (priceArray) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        priceArray: priceArray,
      };
    });
  };

  updateCurrentItem = (element) => {
    this.setState((state) => {
      return {
        ...state,
        currentItem: element,
      };
    });
  };

  updateSelectedLink = (e) => {
    localStorage.setItem("selectedLink", e.target.innerHTML);
    this.setState((state) => {
      return {
        ...state,
        selectedLink: e.target.innerHTML,
      };
    });
  };

  cartItemCount = () => {
    let total = 0;
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
    if (cart.length > 0) {
      cart.forEach((item) => {
        total = total + item.attr.count;
      });
    }
    return total;
  };

  tempArray = [];
  pp = [];

  addOrUpdateCart = (element, attr, currentAttrs) => {
    this.setState(prevState => { return { ...prevState, currentAttrs: currentAttrs } })
    this.tempArray = this.state.cart ? this.state.cart :[];
    let attrArray = [];
      if (currentAttrs.length<1) {
      window.alert("select attributes!")
    }
    else {    
      if (this.tempArray.length > 0) {
        this.tempArray.forEach(cartItem => {
          attrArray = [];
          for (let key in cartItem.attr) {
            if (cartItem.attr[key] !== "" && key !== "count"
                && key!=="WithUSB3ports" && key!=="TouchIDinkeyboard"
            )
            attrArray.push({ [key]: cartItem.attr[key] })
          }
          console.log(attrArray,currentAttrs)
          if ((JSON.stringify(element) + JSON.stringify(currentAttrs)) ===
            (JSON.stringify(cartItem.element) + JSON.stringify(attrArray))) {
            window.alert("Cart Item with same name and attributes exists!")
          }
          else {
              let attrs = attr ? attr : {};
              attr = attrs;
              attr.count = 1
              this.tempArray.push({ element, attr })
            }
          })
          
        }
        else {
          this.tempArray.push({ element, attr })
        }
   
        this.pp = this.tempArray.filter( (ele, ind) => ind === this.tempArray.findIndex( elem => ((JSON.stringify(ele.element) + JSON.stringify(ele.attr))===(JSON.stringify(elem.element) + JSON.stringify(elem.attr)))))
        localStorage.setItem("cart", [JSON.stringify(this.pp)])
        this.setState(prevState => {
          return {
            ...prevState,
            cart : this.pp
          }
        })
      }
  }

  removeOrDecrement = (element) => {
    const tempArray = this.state.cart;
    if (tempArray.length > 0) {
      tempArray.forEach((item, index) => {
        if (JSON.stringify(element)===JSON.stringify(item)) {
          if (element.attr.count > 1) {
            
           element.attr.count = element.attr.count - 1;
          } else {
            tempArray.splice(index, 1);
          }
        }
      });
      localStorage.setItem("cart", JSON.stringify(tempArray));
      this.setState((prevState) => {
        return {
          ...prevState,
          cart: tempArray,
        };
      });
    }
  };
  incrCount = (element) => {
    const tempArray = this.state.cart;
    if (tempArray.length > 0) {
      tempArray.forEach((item) => {
        if (JSON.stringify(element)===JSON.stringify(item)) {
           element.attr.count = element.attr.count + 1;
          }
      });
      localStorage.setItem("cart", JSON.stringify(tempArray));
      this.setState((prevState) => {
        return {
          ...prevState,
          cart: tempArray,
        };
      });
    }
  };

  emptyCart = () => {
    localStorage.setItem("cart", []);
    this.setState((prevState) => {
      return {
        ...prevState,
        cart: [],
      };
    });
  };

  render() {
    return (
      <Router>
        <div
          onClick={
            this.state.CartOverlayClicked === "block" ? this.disableOverlay : () => {}
          }
          className="app"
          id={this.state.CartOverlayClicked === "block" ? "cartOpen--app" : ""}
        >
          <div className="app--nav">
            <Link
              to="/"
              style={{
                marginRight: "20px",
                marginLeft: "70px",
                textDecoration: "none",
              }}
            >
              <h3
                onClick={this.updateSelectedLink}
                className={
                  this.state.selectedLink === "allProducts" ? "selected" : ""
                }
              >
                allProducts
              </h3>
            </Link>

            <Link
              to="/"
              style={{ marginLeft: "100px", textDecoration: "none" }}
            >
              <h3
                onClick={this.updateSelectedLink}
                className={this.state.selectedLink === "tech" ? "selected" : ""}
              >
                tech
              </h3>
            </Link>

            <Link
              to="/"
              style={{ marginLeft: "100px", textDecoration: "none" }}
            >
              <h3
                onClick={this.updateSelectedLink}
                className={
                  this.state.selectedLink === "clothes" ? "selected" : ""
                }
              >
                clothes
              </h3>
            </Link>
            <div className="cart">
              <select
                onChange={(e) =>
                  this.setState((state) => {
                    return {
                      ...state,
                      currency: e.target.value,
                      label: e.target.innerHTML,
                    };
                  })
                }
                value={this.state.currency}
              >
                <option value="USD">$</option>
                <option value="GBP">£</option>
                <option value="AUD">A$</option>
                <option value="JPY">¥</option>
              </select>
              <div>
                <span>
                  <AiOutlineShoppingCart
                    onClick={this.handleCartOverlayClick}
                  />
                  <span className="count">
                    {this.state.cart.length > 0 ? this.cartItemCount() : 0}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <Products
                  click={this.updateCurrentItem}
                  selectedLink={this.state.selectedLink}
                  currency={this.state.currency}
                />
              }
            />
            <Route
              path="singleProduct"
              element={
                <SingleProduct
                  item={this.state.currentItem}
                  currency={this.state.currency}
                  label={this.state.label}
                  updateCart={this.addOrUpdateCart}
                />
              }
            />

            <Route
              path="/mainCart"
              element={
                <MainCart
                  cart={this.state.cart}
                  currency={this.state.currency}
                  label={this.state.label}
                  quantity={this.cartItemCount}
                  removeOrDecrement={this.removeOrDecrement}
                  incrementCount={this.incrCount}
                  emptyCart={this.emptyCart}
                  handleCartAttrClick={this.handleCartAttrClick}
                  handleCartTouchIdClick={this.handleCartTouchIdClick}
                  handleCartwithUSBClick={this.handleCartwithUSBClick}
                  getPriceArray={this.getPriceArray}
                  priceArray={this.state.priceArray}
                />
              }
            />
          </Routes>
        </div>
        <CartOverlay
          cart={this.state.cart}
          currency={this.state.currency}
          label={this.state.label}
          quantity={this.cartItemCount}
          removeOrDecrement={this.removeOrDecrement}
          incrementCount={this.incrCount}
          emptyCart={this.emptyCart}
          display={this.state.CartOverlayClicked}
          disableOverlay={this.disableOverlay}
        />
      </Router>
    );
  }
}

export default App;
