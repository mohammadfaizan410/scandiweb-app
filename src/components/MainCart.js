import React, { Component } from "react";
import { AiFillForward, AiFillBackward } from "react-icons/ai";
import "./styles/mainCart.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

export default class MainCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
      index: 0,
    };
  }

  componentDidMount() {
    this.props.getPriceArray(this.priceArray);
  }

  priceArray = [];
  updatePriceArray() {
    this.priceArray = [];
    this.state.cart.forEach((cartItem) => {
      cartItem.element.prices.forEach((element) => {
        if (element.currency.label === this.props.currency) {
          const priceObj = {
            price: element.amount,
            currency: element.currency.label,
            label: element.currency.symbol,
          };
          this.priceArray.push(priceObj);
        }
      });
    });
  }

  total = () => {
    let total = 0;
    this.priceArray.forEach((element) => {
      total = total + element.price;
    });
    return total;
  };

  render() {
    if (this.state.cart.length > 0) {
      if (this.props.currency !== this.state.currency) {
        this.updatePriceArray();
      }
    }
    let cartArray = null;
    if (this.props.cart.length > 0) {
      cartArray = this.props.cart.map((cartItem, index) => {
        return (
          <div className="itemContainer">
            <div className="itemInfo">
              <h1 className="apollo">Apollo</h1>
              <h1 className="itemName">{cartItem.element.name}</h1>
              <h1 className="itemPrice">
                {this.priceArray[index].label}
                {this.priceArray[index].price}
              </h1>
              {cartItem.element.attributes.map((attr) => {
                if (attr.type === "text") {
                    return (
                      <div>
                        <h1 className="cartAttr--name">{attr.name}:</h1>
                        <div className="attrContainer--cart">
                          {attr.items.map((item) => {
                            return (
                              <div
                                title={cartItem.element.name}
                                className="cartText--container"
                                id={
                                  item.value === cartItem.attr[attr.name.replace(/\s/g, '')]
                                    ? "cartText"
                                    : ""
                                }
                              >
                                {item.value}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  
                } else {
                  return (
                    <div>
                      <h1 className="cartAttr--name">{attr.name}:</h1>
                      <div className="attrContainer--cart">
                        {attr.items.map((item) => {
                          return (
                            <div
                              style={{
                                color: `${item.value}`,
                                backgroundColor: `${item.value}`,
                              }}
                              className="cartColor--attr"
                              id={
                                item.value === cartItem.attr[attr.name.replace(/\s/g, '')]
                                  ? "cartColor"
                                  : ""
                              }
                            >
                              {item.value}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="cart--handle">
              <div className="cart--productCount">
                <div
                  className="cart--incr"
                  onClick={() => this.props.incrementCount(cartItem)}
                >
                  +
                </div>
                <div className="cart--productNum">{cartItem.attr.count}</div>
                <div
                  className="cart--decr"
                  onClick={() => this.props.removeOrDecrement(cartItem)}
                >
                  -
                </div>
              </div>
              <div className="cart--carousel">
                <img
                  alt=""
                  className="cart--image"
                  src={
                    this.state[cartItem.element.name]
                      ? `${
                          cartItem.element.gallery[
                            this.state[cartItem.element.name]
                          ]
                        }`
                      : cartItem.element.gallery[0]
                  }
                ></img>
                <div className="cart--buttonContainer">
                  <div
                    className="cart--imageBack"
                    onClick={() => {
                      if (this.state.index > 0) {
                        this.setState((prevState) => {
                          return {
                            ...prevState,
                            index: prevState.index - 1,
                            [cartItem.element.name]: prevState.index - 1,
                          };
                        });
                      }
                    }}
                  >
                    <AiFillBackward />
                  </div>
                  <div
                    className="cart--imageForward"
                    onClick={() => {
                      if (
                        this.state.index <
                        cartItem.element.gallery.length - 1
                      ) {
                        this.setState((prevState) => {
                          return {
                            ...prevState,
                            index: prevState.index + 1,
                            [cartItem.element.name]: prevState.index + 1,
                          };
                        });
                      }
                    }}
                  >
                    <AiFillForward />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        {this.props.cart.length > 0 ? (
          <div className="mainCart">
            <h4 className="cartTitle">CART</h4>
            <div className="cart--info">{cartArray}</div>
            <h4 className="cart--tax">
              Tax 21%:{" "}
              <span>
                {this.priceArray[0].label}
                {Math.round((this.total() * 0.21 * 100) / 100).toFixed(2)}
              </span>
            </h4>
            <h4 className="cart--quantity">
              Quantity: <span>{this.props.quantity()}</span>
            </h4>
            <h4 className="cart--total">
              total:{" "}
              <span>
                {this.priceArray[0].label}
                {(
                  Math.round((this.total() + this.total() * 0.21) * 100) / 100
                ).toFixed(2)}
              </span>
            </h4>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div
                className="cart--button"
                onClick={() => this.props.emptyCart()}
              >
                <span>Order</span>
              </div>
            </Link>
          </div>
        ) : (
          <div className="mainCart--empty">
            <AiOutlineShoppingCart />
          </div>
        )}
      </div>
    );
  }
}
