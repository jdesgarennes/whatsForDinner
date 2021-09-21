

var ingredientInput = document.querySelector(".ingredientInput")
var ingredientsList = document.querySelector(".ingredientsList")
var searchIngredient= document.querySelector('#searchIngredient');
var submitButton = document.getElementById("submitIngredient");
var listContainer = document.querySelector(".itemListContainer")
var searchRecipeButt = document.querySelector(".searchRecipes")
var itemList =[]







// function to get ingredients
function getIngredient() {

    var requestUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/classify?locale=en_us'+ ingredientInput.value;

    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" + ingredientInput.value + "&number=5&ignorePantry=true&ranking=1", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "9e46aff44dmshfaaaf6ad37243c9p1b4948jsn65e37fc6e624"
	}
})  
.then(response => {
   return response.json();
})
.then (data =>{
    console.log(data)
})
.catch(err => {
	console.error(err);
});
}

function recipeList(){
    listContainer.innerHTML = "";
    for (var i = 0; i < itemList.length; i++) {
        var itemLists = itemList[i];
        var li = document.createElement("li");
        li.textContent = itemLists;
        listContainer.appendChild(li);
    }
}

getIngredient()

// takes the ingredient list value and pushes it to the item list array so that its usable outsided of the function too
function ingredientPush(array){
    var ingredientText = ingredientInput.value;
    ingredientText.innerHTML ="";
    array.push(ingredientText);
    console.log(itemList);
}



  submitButton.addEventListener('click', function(event){
    event.preventDefault();
    ingredientPush(itemList);
    recipeList();
  });
  console.log(itemList);

   searchRecipeButt.addEventListener('click', function(){
      
   })




