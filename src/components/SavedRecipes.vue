<template>
  <div class="saved-recipes-section">
    <h2>Saved Recipes</h2>
    <div v-if="savedRecipes.length > 0" class="saved-recipes-grid">
      <div v-for="recipe in savedRecipes" :key="recipe.id" class="saved-recipe-card">
        <!-- saved recipe information -->
        <div class="recipe-details">
          <img :src="require(`@/assets/${recipe.imageURL}`)" alt="Recipe Image" class="recipe-image" />
          <div class="text-overlay">
            <h3>{{ recipe.name }}</h3>
            <p>{{ recipe.description }}</p>
          </div>
          <button @click="toggleSaveStatus(recipe)" class="save-button">
            {{ recipe.isSaved ? 'Unsave' : 'Save' }}
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No saved recipes yet.</p>
    </div>
  </div>
</template>

<script>
import { db, auth } from '@/firebase';
import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      savedRecipes: [],
    };
  },
  methods: {
    async fetchSavedRecipes() {
      if (auth.currentUser) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const savedRecipesCollectionRef = collection(userDocRef, 'savedRecipes');
        const savedRecipesSnapshot = await getDocs(savedRecipesCollectionRef);

        this.savedRecipes = savedRecipesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          isSaved: true,
        }));
      }
    },
    async toggleSaveStatus(recipe) {
      if (auth.currentUser) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const savedRecipesCollectionRef = collection(userDocRef, 'savedRecipes');
        const recipeDocRef = doc(savedRecipesCollectionRef, recipe.id);

        if (recipe.isSaved) {
          // unsave
          await deleteDoc(recipeDocRef);
          // remove from local
          this.savedRecipes = this.savedRecipes.filter(r => r.id !== recipe.id);
        } else {
          // save
        }
        // update local
        recipe.isSaved = !recipe.isSaved;
      }
    },
  },
  mounted() {
    this.fetchSavedRecipes();
  },
};
</script>

<style scoped>

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
.saved-recipes-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.saved-recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.saved-recipe-card {
  position: relative;
  border: 1px solid #ddd;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}


.saved-recipe-card:hover {
  transform: scale(1.05);
}

.save-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 8px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #45a049;
}
</style>
