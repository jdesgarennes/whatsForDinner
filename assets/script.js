
var ingredientInput = document.querySelector(".ingredientInput");
var ingredientsList = document.querySelector(".ingredientsList");
var searchIngredient= document.querySelector('#searchIngredient');
var submitButton = document.getElementById("submitIngredient");
var listContainer = document.querySelector(".itemListContainer");
var searchRecipeButt = document.querySelector("#searchRecipes");
var recipeCardContainer = document.querySelector(".recipeCardContainer");
var recipeIDData = document.querySelector("#recipeUniqeID");
var htmlJokeLine = document.querySelector("#norrisJokes");
var testData =''
var itemListString=""
var itemList =[]
var recipetitle = ""
var recipeImg = ""


// function to get ingredients
function getIngredient() {

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
    
   for (i=0; i<5; i++){

    var  recipeHtml = document.getElementById('recipe'+i);

    var recipeImage =document.createElement('img');
    recipeImage.setAttribute("src", `https://spoonacular.com/recipeImages/${data[i].id}-312x231.jpg`);
    recipeImage.setAttribute('id', "recipeUniqeID");
    recipeImage.setAttribute("data-recipeID", data[i].id);
    testData = recipeImage.getAttribute('data-recipeID');
    console.log(testData);
    recipeHtml.appendChild(recipeImage);

    var recipeTitleCard = document.createElement('h3');
    recipeTitleCard.setAttribute('class','uk-card-title recipeTitle');
    recipeTitleCard.textContent=data[i].title;
    recipeHtml.appendChild(recipeTitleCard);  
    
    var recipeLikes = document.createElement('p');
    recipeLikes.textContent='LIKES: '+data[i].likes;
    recipeHtml.appendChild(recipeLikes);  





        };
       
    
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

function chuckNorrisJokes() {
  fetch('https://api.chucknorris.io/jokes/random')
  .then(function (response) {
    console.log(response.status);
    if (response.status !== 200) {
      return;
    }
    return response.json();
    
  })
  .then(function (data) {
    console.log(data);
      htmlJokeLine.innerHTML = data.value;
  });
}

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

  chuckNorrisJokes();

  submitButton.addEventListener('click', function(event){
    event.preventDefault();
    ingredientPush(itemList);
    recipeList();
    ingredientInput.value = ""
  });
 

searchRecipeButt.addEventListener('click', function(){
  itemListString = itemList.toString().replaceAll(",", "%2C");
  getIngredient()
  searchRecipeButt.disabled = true;

    console.log(itemListString)
   })

   document.addEventListener('click', function(e){
    if(e.target && e.target.id== 'recipeUniqeID'){
      var recipeID = e.target.getAttribute('data-recipeID');
      recipeUrl(recipeID);
    }
  });

