<template>
  <div class="home">
    <button v-if="isAuthenticated" @click="goToAddRecipe" class="add-recipe-button">
      Add Recipe
    </button>
    <RecipeList :recipes="recipes" />
  </div>
</template>

<script>

import RecipeList from '@/components/RecipeList.vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { auth } from '@/firebase';

export default {
  name: 'HomeView',
  components: {
    RecipeList
},
data() {
  return {
      isAuthenticated: false,
      recipes: [],
    };
},
methods: {
    goToAddRecipe() {
      this.$router.push('/new-recipe');
    },
    async fetchRecipes() {
      const querySnapshot = await getDocs(collection(db, 'recipes'));
      this.recipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.isAuthenticated = !!user;
    });
  },
  mounted() {
    this.fetchRecipes();
  },
};
</script>

<style scoped>
.home {
  background: #ddecf1;
  padding: 20px;
}

.add-recipe-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  height: 50px;
  border-radius: 15px; /* Adjust the percentage for the bottom-right corner */
  background-color: #4caf50; /* Green color, change as needed */
  color: white;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.add-recipe-button:hover {
  transform: scale(1.05);
  transition: 0.3s ease-in-out;
}


</style>
