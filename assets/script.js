

var ingredientInput = document.querySelector(".ingredientInput")
var ingredientsList = document.querySelector(".ingredientsList")
var searchIngredient= document.querySelector('#searchIngredient');
var submitButton = document.getElementById("submitIngredient");
var listContainer = document.querySelector(".itemListContainer")
var searchRecipeButt = document.querySelector("#searchRecipes")
var recipeCardContainer = document.querySelector(".recipeCardContainer")
var itemListString=""
var itemList =[]
var recipetitle = ""
var recipeImg = ""







// function to get ingredients
function getIngredient() {

    var requestUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/classify?locale=en_us'+ ingredientInput.value;
    console.log(itemListString)
    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" + itemListString + "&number=5&ignorePantry=true&ranking=1", {
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
    createRecipeCards(data);
})
.catch(err => {
	console.error(err);
});
}

function createRecipeCards(data){
    console.log(data)
    // foreach is pulling elements from Api on to page
    var recipeData = data
    recipeData.forEach((info) => {
    // console.log(info)
    // var recipe card below is creating a div element for our card
    var recipeCard = document.createElement("div")
    var titleH1 = document.createElement("h3")
    titleH1.innerText = info.title
    recipeCard.append(titleH1)
    console.log(recipetitle)

    
   
    recipeImageUrl = `https://spoonacular.com/recipeImages/${info.id}-90x90.jpg`
    var recipeImg = document.createElement("img")
    recipeImg.src = recipeImageUrl
    recipeCard.append(recipeImg)

    recipeCardContainer.append(recipeCard)
});
}
// Makes list of ingredients
function recipeList(){
    listContainer.innerHTML = "";
    for (var i = 0; i < itemList.length; i++) {
        var itemLists = itemList[i];
        var li = document.createElement("li");
        li.textContent = itemLists;
        listContainer.appendChild(li);
    }}


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
    ingredientInput.value = ""
  });
 

searchRecipeButt.addEventListener('click', function(){
  itemListString = itemList.toString().replaceAll(",", "%2C");
  getIngredient()

    console.log(itemListString)
   })




