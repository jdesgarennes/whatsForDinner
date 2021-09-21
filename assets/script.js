

var ingredientInput = document.querySelector(".ingredientInput")
var ingredientsList = document.querySelector(".ingredientsList")
var searchIngredient= document.querySelector('#searchIngredient');
var fetchButton = document.getElementById("searchIngredient");








// function to get ingredients
function getIngredient() {

    var requestUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/classify?locale=en_us'+ ingredientInput.value;

    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5&ignorePantry=true&ranking=1", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "9e46aff44dmshfaaaf6ad37243c9p1b4948jsn65e37fc6e624"
	}
})  
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
  
    // fetch(requestUrl)
    //   .then(function (response) {
    //     return response.json();
    //   })
//       .then(function (data) {
//         for (var i = 0; i < data.length; i++) {
//           var listItem = document.createElement('li');
//           listItem.textContent = data[i];
//           ingredientsList.appendChild(listItem);
//         }
//         console.log(response)
//       });
//   }
}
  fetchButton.addEventListener('click', getIngredient);