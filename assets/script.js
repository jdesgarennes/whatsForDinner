$(function(){
    $(".searchButton").click(function(){
        getRequest($(".searchInput").val(), $(".cardContainer").val())
    })
})
function getRequest(apiSearch, format){
    var requestUrl = "https://api.spoonacular.com/recipes/findByIngredients"
console.log("user Request" + requestUrl);
fetch (requestUrl)
.then(function(res){
    console.log("STATUS " + res.status);
    return res.json()

})
    .then(function(data){
        console.log("output" + data)
    })
}
getRequest()