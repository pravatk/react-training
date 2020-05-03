import React, { Component } from "react";
import classes from "./Burger.module.css";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

class Burger extends Component {
  render() {
    let ingredients = this.props.ingredients;
    let components = Object.keys(ingredients)
      .map(key => {
        let comps = [];
        for (let i = 0; i < ingredients[key]; i++) {
          comps.push(<BurgerIngredient type={key} key={`${key}_${i}`} />);
        }
        return comps;
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);

    return (
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {components.length === 0 ? <p>Please start ingredients</p> : components}
        <BurgerIngredient type="bread-bottom" />
      </div>
    );
  }
}

export default Burger;
