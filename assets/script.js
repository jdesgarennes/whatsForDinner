

var ingredientInput = document.querySelector(".ingredientInput")
var ingredientsList = document.querySelector(".ingredientsList")
var searchIngredient= document.querySelector('#searchIngredient');







// function to get ingredients
function getIngredient() {

    var requestUrl = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients='+ ingredientInput.value;

  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var i = 0; i < data.length; i++) {
          var listItem = document.createElement('li');
          listItem.textContent = data[i].ingredientInput.value;
          ingredientsList.appendChild(listItem);
        }
        console.log(getIngredient)
      });
  }
  
  fetchButton.addEventListener('click', getIngredient);