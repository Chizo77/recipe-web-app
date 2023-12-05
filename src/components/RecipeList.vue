<template>
  <div class="recipe-section">
    <div class="filter-container">
      <label class="ingredient-filter" for="ingredientFilter">Filter by Ingredient:</label>
      <input class="filter-input" v-model="ingredientFilter" type="text" id="ingredientFilter" />
    </div>
    <RecipeDetail :recipeId="$route.params.id" v-if="$route.name === 'RecipeDetail'" @close="closeRecipeDetail" />
    <div class="recipes-grid">
      <router-link
        v-for="recipe in filteredRecipes"
        :to="{ name: 'RecipeDetail', params: { id: recipe.id } }"
        :key="recipe.id"
        class="recipe-card"
      >
        <div class="recipe-details">
          <img :src="require(`@/assets/${recipe.imageURL}`)" alt="Recipe Image" class="recipe-image" />
          <div class="text-overlay">
            <h3>{{ recipe.name }}</h3>
            <p>{{ recipe.description }}</p>
          </div>
        </div>
        <button @click.prevent="saveRecipe(recipe)"
          :class="{ 'save-button': true, 'saved': recipe.isSaved, 'unsaved': !recipe.isSaved }"
        >
          {{ recipe.isSaved ? 'Saved' : 'Save' }}
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { db, auth } from '@/firebase';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import RecipeDetail from '../components/RecipeDetail.vue';

export default {
  props: {
    recipes: Array,
  },
  data() {
    return {
      ingredientFilter: '',
      modalOpen: false,
      selectedRecipe: null,
    };
  },
  computed: {
    filteredRecipes() {
      return this.recipes.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(this.ingredientFilter.toLowerCase())
        )
      );
    },
  },
  methods: {
    async saveRecipe(recipe) {
      if (auth.currentUser) {
        const userDocRef = doc(
          db,
          `users/${auth.currentUser.uid}/savedRecipes`,
          recipe.id
        );
        const userRecipeDoc = await getDoc(userDocRef);

        if (userRecipeDoc.exists()) {
          // Unsave
          await deleteDoc(userDocRef);
          console.log('Recipe unsaved successfully!');
        } else {
          // Save
          await setDoc(userDocRef, recipe);
          console.log('Recipe saved successfully!');
        }

        recipe.isSaved = !userRecipeDoc.exists();
      } else {
        console.error('User not authenticated');
      }
    },
  },
  components: {
    RecipeDetail,
  },
};
</script>

<style scoped>

.recipe-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .filter-container {
    margin-bottom: 20px;
  }

  .recipes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .recipe-card {
    position: relative;
    border: 1px solid #ddd;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
  }

  .recipe-card:hover {
    transform: scale(1.05);
  }

  .recipe-details {
    position: relative;
    height: 0;
    overflow: hidden;
    padding-bottom: 75%;
  }

  .recipe-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .text-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    transition: 0.3s ease-in-out;
  }

  .text-overlay:hover {
    background: rgba(255, 255, 255, 0.95);
  }

  .text-overlay h3 {
    margin: 0;
    font-size: 16px;
  }

  .text-overlay p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
  }

  .ingredient-filter {
    font-size: 16px;
    font-weight: bold;
    margin-right: 8px;
  }

  .filter-input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .save-button {
    position: absolute;
    top: 10px; 
    right: 10px; 
    background-color: #e13636;
    color: white;
    border: none;
    border-radius: 15cm;
    padding: 8px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
  }
  .saved {
    background-color: #45a049;
  }

  .unsaved {
    background-color: #e13636;
  }
  .unsaved:hover {
    background-color: #e20606; 
  }
  .saved:hover {
    background-color: #45a049; 
  }
</style>
