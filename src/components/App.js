import React, { Component } from 'react';
import AppHeader from './AppHeader'
import SearchBar from './SearchBar'
import IngredientsContainer from './IngredientsContainer'
import RecipesContainer from './RecipesContainer'
import './App.css';

// let url = `https://api.yummly.com/v1/api/recipes?_app_id=${APP_ID}&_app_key=${APP_KEY}`

class App extends Component {

  state = {
    input: '',
    allowedIngredients: '',
    ingredients: [],
    recipes: []
  }

  handleChange = event => this.setState({input: event.target.value})

  handleIngredientSubmit = event => {
    event.preventDefault()
    this.setState({ingredients: [...this.state.ingredients, this.state.input], input: ''})
  }

  removeIngredient = event => {
    console.log(event.target.parentNode.innerText)
    this.setState({
      ingredients: [...this.state.ingredients].filter(ingredient => ingredient !== event.target.parentNode.innerText)
    }, () => console.log(this.state.ingredients))
  }

  setAllowedIngredients = () => {
    let ingredientQueries = this.state.ingredients.map(ingredient => `&allowedIngredient[]=${ingredient}`)
    this.setState({allowedIngredients: ingredientQueries.join("")}, this.getRecipes)
  }

  getRecipes = () => {
    // this.setAllowedIngredients()
    // let newUrl = (url+this.state.allowedIngredients)
    // debugger
    fetch("http://localhost:3000/api/v1/show_recipes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: this.state.allowedIngredients
      })
    })
    .then(res => res.json())
    .then(json => {
      this.setState({recipes: json.matches})
    })
    // fetch(`${newUrl}`)
    // .then(res => res.json())
    // .then(json => {
    //   this.setState({recipes: json.matches})
    // })
  }

  render() {
    // console.log("state is", this.state);
    return (
      <div>
        <AppHeader />
        <SearchBar handleIngredientSubmit={this.handleIngredientSubmit} handleChange={this.handleChange} input={this.state.input} />
        <IngredientsContainer ingredients={this.state.ingredients} setAllowedIngredients={this.setAllowedIngredients} removeIngredient={this.removeIngredient} />
        <RecipesContainer recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
