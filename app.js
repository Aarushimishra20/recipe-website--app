function searchRecipes() {
  const searchInput = document.getElementById('searchInput').value.trim();
  const recipeDiv = document.getElementById('recipes');
  const notFoundDiv = document.getElementById('notFound');

  recipeDiv.innerHTML = '';
  notFoundDiv.style.display = 'none';

  if (searchInput === '') {
    notFoundDiv.innerHTML = '⚠ Please enter a recipe name!';
    notFoundDiv.style.display = 'block';
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response => response.json())
    .then(data => {
      if (!data.meals) {
        notFoundDiv.innerHTML = '❌ No recipe found, try another!';
        notFoundDiv.style.display = 'block';
      } else {
        data.meals.forEach(meal => {
          const card = document.createElement('div');
          card.classList.add('recipe-card');
          card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strCategory} • ${meal.strArea}</p>
            <button onclick="viewRecipes('${meal.idMeal}')">View Recipe</button>
          `;
          recipeDiv.appendChild(card);
        });
      }
    })
    .catch(() => {
      notFoundDiv.innerHTML = '⚠ Error fetching recipes!';
      notFoundDiv.style.display = 'block';
    });
}

function viewRecipes(mealId) {
  const popupCard = document.getElementById('popupCard');
  const recipeTitle = document.getElementById('recipeTitle');
  const recipeDetails = document.getElementById('recipeDetails');
  const recipeCategory = document.getElementById('recipeCategory');
  const recipeArea = document.getElementById('recipeArea');
  const recipeImg = document.getElementById('recipeImg');
  const recipeVideo = document.getElementById('recipeVideo');

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      recipeTitle.innerText = meal.strMeal;
      recipeDetails.innerText = meal.strInstructions;
      recipeCategory.innerText = meal.strCategory;
      recipeArea.innerText = meal.strArea;
      recipeImg.src = meal.strMealThumb;
      recipeVideo.href = meal.strYoutube ? meal.strYoutube : '#';
      popupCard.style.display = 'block';
    });
}

function closeRecipe() {
  document.getElementById('popupCard').style.display = 'none';
}
