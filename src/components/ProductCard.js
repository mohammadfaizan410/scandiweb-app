import React, { Component } from "react";
import "./styles/productCard.css";
import { Link } from "react-router-dom";
export default class ProductCard extends Component {
  state = {
    price: 0,
  };

  componentDidMount() {
    this.props.element.prices.forEach((item) => {
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

  updateState() {
    this.props.element.prices.forEach((item) => {
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

  render() {
    if (this.props.currency != this.state.currency) {
      this.updateState();
    }
    return (
      <Link to="/singleProduct">
        <div
          className="productCard"
                onClick={() => {
                    localStorage.setItem("current",JSON.stringify(this.props.element))
                    this.props.handleClick(this.props.element)
                }}
        >
          <img className="product--image" src={this.props.gallery[0]}></img>
          <h4 className="title">{this.props.id}</h4>
          <h4 className="price">
            {this.state.symbol}
            {this.state.price}
          </h4>
        </div>
      </Link>
    );
  }
}
