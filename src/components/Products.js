import React, { Component } from "react";
import { endPoint, graphQlQuery } from "./queryConst";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./styles/product.css";
export default class Products extends Component {
  componentDidMount() {
    axios({
      url: endPoint,
      method: "post",
      data: {
        query: graphQlQuery,
      },
    }).then((result) => {
      this.setState({
        allProducts: result.data.data.categories[0].products,
      });
    });
  }

  render() {
    let prodArray = null;
    let currentState = null;
    if (this.state) {
      currentState = this.props.selectedLink;
      prodArray = this.state.allProducts.map((element) => {
        if (currentState === "allProducts") {
          return (
            <ProductCard
              handleClick={this.props.click}
              key={element.name}
              id={element.id}
              name={element.name}
              category={element.category}
              gallery={element.gallery}
              element={element}
              currency={this.props.currency}
            />
          );
        }
        if (currentState === element.category) {
          return (
            <ProductCard
              handleClick={this.props.click}
              key={element.name}
              id={element.id}
              name={element.name}
              category={element.category}
              gallery={element.gallery}
              element={element}
              currency={this.props.currency}
            />
          );
        }
      });
    }

    return (
      <div className="product">
        <h4 className="toUpper">{currentState}</h4>
        <div className="prod">{prodArray}</div>
      </div>
    );
  }
}
