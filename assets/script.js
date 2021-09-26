
var ingredientInput = document.querySelector(".ingredientInput")
var ingredientsList = document.querySelector(".ingredientsList")
var searchIngredient= document.querySelector('#searchIngredient');
var submitButton = document.getElementById("submitIngredient");
var listContainer = document.querySelector(".itemListContainer")
var searchRecipeButt = document.querySelector("#searchRecipes")
var recipeCardContainer = document.querySelector(".recipeCardContainer")
var recipeIDData = document.querySelector("recipeUniqeID")
var someClickdata = ''
//var newdatat = document.getAttribute('data-recipeID');
var testData =''
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
   //var recipeData = data

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




        //  $('<img>').attr( {src:`https://spoonacular.com/recipeImages/${data[i].id}-312x231.jpg`,class:'uk-card-media-top'   } ).appendTo('#recipe'+i).text(data[i].title);
          // 'class','uk-card-media-top'
        //  $('<h3>').attr( 'class','uk-card-title recipeTitle'+i ).appendTo('#recipe'+i).text(data[i].title);
         // $('<h4>').attr( 'class','uk-card-title recipeLikes'+i ).appendTo('.recipeTitle'+i).text('Likes: '+ data[i].likes);


        };
       
    //recipeData.forEach((info) => {
    // console.log(info)
    // var recipe card below is creating a div element for our card
    //var recipeCard = document.createElement("div")
    //var titleH1 = document.createElement("h3")
    //titleH1.innerText = info.title
    //recipeCard.append(titleH1)
    //console.log(recipetitle)

    // begin for loop to create recipe cards
    



   // recipeImageUrl = `https://spoonacular.com/recipeImages/${info.id}-312.231.jpg`
    //var recipeImg = document.createElement("img")
    //recipeImg.src = recipeImageUrl
    //recipeCard.append(recipeImg)

    //recipeCardContainer.append(recipeCard)
 // });
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
  searchRecipeButt.disabled = true;

    console.log(itemListString)
   })

   document.addEventListener('click', function(e){
    if(e.target && e.target.id== 'recipeUniqeID'){
      //newdatat = document.getAttribute('data-recipeID');
       newdatat = e.target.getAttribute('data-recipeID');
      console.log(newdatat);

      console.log();
    }
  });
