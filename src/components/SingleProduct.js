import React, { Component } from "react";
import parser from "html-react-parser";
import "./styles/singleProduct.css";

export default class SingleProduct extends Component {
  state = {
    currentPic: this.props.item ? this.props.item.gallery[0] : "",
    attributes: {
      Size: "",
      Capacity: "",
      WithUSB3ports: "No",
      TouchIDinkeyboard: "No",
      Color: "",
      count: 1,
    },
  };

  stateAttr = this.state ? this.state.attributes : null;

  updateState() {
    if (this.props.item) {
      this.props.item.prices.forEach((item) => {
        if (item.currency.label === this.props.currency) {
          this.setState((state) => {
            return {
              ...state,
              price: item.amount,
              currency: item.currency.label,
              symbol: item.currency.symbol,
            };
          });
        }
      });
    }
  }

  handleAttrClick = (e,attrName) => {
    this.setState(state => {
      return {
        ...state,
        attributes : {...state.attributes,[attrName.replace(/\s/g, '')] : e.target.innerHTML}
      }
    })
  }

  render() {
    if (this.props.currency !== this.state.currency) {
      this.updateState();
    }
    let gallery = null;
    let attrArray = null;
    if (this.props.item) {
      if (this.gallery === null) {
        gallery = this.props.item.gallery.map((element) => {
          return (
            <img
              alt=""
              key={this.element}
              onClick={() => {
                this.setState((state) => {
                  return {
                    ...state,
                    currentPic: element,
                  };
                });
              }}
              src={element}
              className="gallery--image"
              id={element === this.state.currentPic ? "selected" : ""}
            ></img>
          );
        });
      }
    }
    if (this.props.item) {
      attrArray = this.props.item.attributes.map((element) => {
        if (element.type === "text") {
            return (
              <div>
                <h4>{element.name}:</h4>
                <div className="attr--container">
                  {element.items.map((item) => {
                    return (
                      <div
                        className="text--attr"
                        onClick={(e) => this.handleAttrClick(e,element.name)}
                        id={
                          this.state.attributes[element.name.replace(/\s/g, '')] === item.value
                            ? "textAttrSelected"
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
                <h4>{element.name}:</h4>
                <div className="attr--container">
                  {element.items.map((item) => {
                    return (
                      <div
                        style={{
                          backgroundColor: `${item.value}`,
                          color: `${item.value}`,
                        }}
                        className="color--attr"
                        onClick={(e)=>this.handleAttrClick(e,element.name)}
                        id={
                          this.state.attributes[element.name.replace(/\s/g, '')] === item.value
                            ? "colorAttrSelected"
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
      });
    }
    return (
      <div>
        {this.props.item ? (
          <div className="singleProduct">
            <div className="gallery">{gallery}</div>
            <div>
              <img alt="" className="main--picture" src={this.state.currentPic}></img>
            </div>
            <div className="details">
              <h4 className="title">Apollo</h4>
              <h4 className="title">{this.props.item.name}</h4>
              <div>{attrArray}</div>
              <h4>Price:</h4>
              <h4>
                {this.state.symbol}
                {this.state.price}
              </h4>
              {this.props.item.inStock ? (
                <div
                  className="addToCart"
                  onClick={() => {
                    let attrArray = [];
                    for (let key in this.state.attributes) {
                      if (
                        this.state.attributes[key] !== "" &&
                        key !== "count" &&
                        key !== "WithUSB3ports" &&
                        key !== "TouchIDinkeyboard"
                      )
                        attrArray.push({ [key]: this.state.attributes[key] });
                    }
                    this.props.updateCart(
                      this.props.item,
                      this.state.attributes,
                      attrArray
                    );
                  }}
                >
                  <span className="cart--add">Add To Cart</span>
                </div>
              ) : (
                <div className="outOfStock">
                  <span className="cart--outOfStock">Out of Stock!</span>
                </div>
              )}
              <p>{parser(this.props.item.description)}</p>
            </div>
          </div>
        ) : (
          "please select an item first!"
        )}
      </div>
    );
  }
}
