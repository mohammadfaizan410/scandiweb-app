import React, { Component } from "react";
import "./styles/mainCart.css";
import "./styles/cartOverlay.css";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
export default class cartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
      priceArray: this.props.priceArray,
    };
  }

  priceArray = [];
  total = () => {
    let total = 0;
    this.props.cart.forEach((element) => {
      total = total + element.element.prices[0].amount * element.attr.count;
    });
    return total;
  };

  render() {
    let cartArray = null;
    if (this.props.cart.length > 0) {
      cartArray = this.props.cart.map((cartItem, index) => {
        if (index < 2) {
          return (
            <div className="itemContainer--cartOverlay">
              <div className="itemInfo--cartOverlay">
                <h1 className="apollo--cartOverlay">Apollo</h1>
                <div className="adjuster"></div>
                <h1 className="itemName--cartOverlay">
                  {cartItem.element.name}
                </h1>
                <h1 className="itemPrice--cartOverlay">
                  {cartItem.element.prices[0].currency.symbol}
                  {cartItem.element.prices[0].amount}
                </h1>
                {cartItem.element.attributes.map((attr) => {
                  if (attr.type === "text") {
                      return (
                        <div>
                          <h1 className="cartOverlayAttr--name">
                            {attr.name}:
                          </h1>
                          <div className="attrContainer--cartOverlay">
                            {attr.items.map((item) => {
                              return (
                                <div
                                  title={cartItem.element.name}
                                  className="cartOverlayText--container"
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
                        <h1 className="cartOverlayAttr--name">{attr.name}:</h1>
                        <div className="attrContainer--cartOverlay">
                          {attr.items.map((item) => {
                            return (
                              <div
                                style={{
                                  color: `${item.value}`,
                                  backgroundColor: `${item.value}`,
                                }}
                                className="cartOverlayColor--attr"
                                id={
                                  item.value === cartItem.attr[attr]
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
              <div className="cartOverlay--handle">
                <div className="cart--productCount">
                  <div
                    className="cartOverlay--incr"
                    onClick={() => this.props.incrementCount(cartItem)}
                  >
                    +
                  </div>
                  <div className="cartOverlay--productNum">
                    {cartItem.attr.count}
                  </div>
                  <div
                    className="cartOverlay--decr"
                    onClick={() => this.props.removeOrDecrement(cartItem)}
                  >
                    -
                  </div>
                </div>
                <div className="cartOverlay--carousel">
                  <img
                    alt=""
                    className="cartOverlay--Image"
                    src={cartItem.element.gallery[0]}
                  ></img>
                </div>
              </div>
            </div>
          );
        }
      return ""
      });
    }
    return (
      <div style={{ display: this.props.display }}>
        {this.props.cart.length > 0 ? (
          <div className="cartOverlay">
            <h4 className="cartOverlayTitle">
              My Bag,{" "}
              <span>
                {this.props.quantity()}{" "}
                {this.props.quantity() > 1 ? "items" : "item "}
              </span>
            </h4>
            <div className="cartOverlay--info">{cartArray}</div>
            <h4 className="cartOverlay--total">
              total:{" "}
              <span>
                {this.props.cart[0].element.prices[0].currency.symbol}
                {(
                  Math.round((this.total() + this.total() * 0.21) * 100) / 100
                ).toFixed(2)}
              </span>
            </h4>
            <div className="buttonContainer--cartOverlay">
              <Link style={{ textDecoration: "none" }} to="/mainCart">
                <div
                  className="cartOverlay--viewCart"
                  onClick={() => this.props.disableOverlay()}
                >
                  <span>View Cart</span>
                </div>
              </Link>
              <div className="cartOverlay--checkOut">
                <span>Checkout</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="cartOverlay--empty">
            <AiOutlineShoppingCart />
          </div>
        )}
      </div>
    );
  }
}
