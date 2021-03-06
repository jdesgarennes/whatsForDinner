
var ingredientInput = document.querySelector(".ingredientInput");
var searchIngredient= document.querySelector('#searchIngredient');
var submitButton = document.getElementById("submitIngredient");
var listContainer = document.querySelector(".itemListContainer");
var searchRecipeButt = document.querySelector("#searchRecipes");
var recipeCardContainer = document.querySelector(".recipeCardContainer");
var recipeIDData = document.querySelector("#recipeUniqeID");
var htmlJokeLine = document.querySelector("#norrisJokes");
var historySave =  JSON.parse(localStorage.getItem("Ingredient-history"))
var lastSearch = document.querySelector("#lastSearch")
var weightWatcherPoints = "";
var cookTime = "";
var testData =''
var itemListString=""
var itemList =[]
var recipetitle = ""
var recipeImg = ""


// function to get ingredients
function getIngredient(food) {

    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" + food + "&number=5&ignorePantry=true&ranking=1", {
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

// Creates Recipe Cards with information on each cards and adds an image to each card
function createRecipeCards(data){
    
  for (var i=0; i<5; i++){

    var  recipeHtml = document.getElementById('recipe'+i);

    var recipeImage =document.createElement('img');
    recipeImage.setAttribute("src", `https://spoonacular.com/recipeImages/${data[i].id}-312x231.jpg`);
    recipeImage.setAttribute('id', "recipeUniqeID");
    recipeImage.setAttribute("data-recipeID", data[i].id);
    testData = recipeImage.getAttribute('data-recipeID');
    recipeHtml.appendChild(recipeImage);

    var recipeTitleCard = document.createElement('h3');
    recipeTitleCard.setAttribute('class','uk-card-title recipeTitle');
    recipeTitleCard.textContent=data[i].title;
    recipeHtml.appendChild(recipeTitleCard);  
    
    var recipeLikes = document.createElement('p');
    recipeLikes.textContent='Likes: '+data[i].likes;
    recipeHtml.appendChild(recipeLikes);  

    var dataIDNumbers = data[i].id
    getFoodScore(dataIDNumbers, recipeHtml);
  }
}

// Fetches additional informtion to be used in the card
function getFoodScore(id, cardNumber) {
  fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=" + id, {
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
  console.log(data);
  appendTimeScore(data, cardNumber);
})
  .catch(err => {
    console.error(err);
  });

}

// Appends the additional information to the card
function appendTimeScore(data, recipeCard) {
  weightWatcherPoints = data[0].weightWatcherSmartPoints;
  cookTime = data[0].readyInMinutes;


  var weightWatcherScore = document.createElement('p');
  weightWatcherScore.textContent= 'Weight Watcher Score: ' + JSON.stringify(weightWatcherPoints);
  recipeCard.appendChild(weightWatcherScore);
  
  var cookingTime = document.createElement('p');
  cookingTime.textContent= 'Cooking Time: ' + JSON.stringify(cookTime) + " minutes";
  recipeCard.appendChild(cookingTime);
}


// Makes list of ingredients
function recipeList(){
    listContainer.innerHTML = "";
    for (var i = 0; i < itemList.length; i++) {
        var itemLists = itemList[i];
        var li = document.createElement("li");
        li.textContent = itemLists;
        li.style.fontSize= "160%"
        listContainer.appendChild(li);
}}

// Takes the ingredient list value and pushes it to the item list array so that its usable outsided of the function too
function ingredientPush(array){
  var ingredientText = ingredientInput.value;
  array.push(ingredientText);
  ingredientText.innerHTML ="";
  localStorage.setItem("Ingredient-history", JSON.stringify(array))
  console.log(itemList);
}

// displays local storage
function getHistory(){
if(localStorage.getItem("Ingredient-history") !== null){

  for (let i = 0; i < historySave.length; i++) {
  
    var li = document.createElement('li');
    li.textContent = historySave[i] ;
    li.style.fontSize= "160%";
    listContainer.appendChild(li);
    
}console.log(historySave)
}}

// Fetches a Chuck Norris food joke and displays it
function chuckNorrisJokes() {
  fetch('https://api.chucknorris.io/jokes/random?category=food')
  .then(function (response) {
    console.log(response.status);
    if (response.status !== 200) {
      return;
    }
    return response.json();
    
  })
  .then(function (data) {
    console.log(data);
       htmlJokeLine.innerHTML =  data.value ;
      
  });
}

// Gets the URL for the recipe and then redirects to the recipe's webpage
function recipeUrl(ID) {
  fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + ID + "/information", {
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
    console.log(data);
    var recipeRedirect = data.sourceUrl;
    window.location.href = recipeRedirect;
})
.catch(err => {
	console.error(err);
});
}

// Starts up the funtions upon launch of the site
getHistory()
chuckNorrisJokes();

// Adds an event listener to the submit button to add the item to the list of ingredients  
submitButton.addEventListener('click', function(event){
    event.preventDefault();
    ingredientPush(itemList);
    recipeList();
    ingredientInput.value = ""
});
 
// Adds an event listener for the submit button that will start up the process of searching and displaying food recipes
searchRecipeButt.addEventListener('click', function(){
  itemListString = itemList.toString().replaceAll(",", "%2C");
  getIngredient(itemListString)
  searchRecipeButt.disabled = true;

    console.log(itemListString)
   })

   lastSearch.addEventListener("click", function(){
    getIngredient(historySave)
     console.log(historySave)
   })

   document.addEventListener('click', function(e){
    if(e.target && e.target.id== 'recipeUniqeID'){
      var recipeID = e.target.getAttribute('data-recipeID');
      recipeUrl(recipeID);
    }
});