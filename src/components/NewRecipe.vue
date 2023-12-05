<template>
  <div class="new-recipe-form">
    <h2>Create New Recipe</h2>
    <form @submit.prevent="saveNewRecipe">
      <label for="name">Name:</label>
      <input v-model="newRecipe.name" type="text" id="name" required />
      <input v-model="newRecipe.description" type="text" id="description" required />

      <label for="ingredients">Ingredients:</label>
      <input v-model="ingredientsInput" type="text" id="ingredients" required />
      <p>Separate ingredients with commas (e.g., "Ingredient1, Ingredient2, Ingredient3")</p>

      <label for="instructions">Instructions:</label>
      <textarea v-model="newRecipe.instructions" id="instructions" required></textarea>

      <!-- <label for="imageURL">Image URL:</label>
      <input type="file" @change="handleImageUpload" accept="image/*" id="imageURL" />
      <img v-if="newRecipe.imageURL" :src="newRecipe.imageURL" alt="Preview" /> -->

      <button type="submit">Save Recipe</button>
    </form>
  </div>
</template>

<script>
import { auth, db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default {
  data() {
    return {
      newRecipe: {
        name: '',
        ingredients: [],
        description: '',
        instructions: '',
        imageURL: 'pumpkin-soup-square.jpg',
        isSaved: false,
      },
      ingredientsInput: '',
    };
  },
  methods: {
    async saveNewRecipe() {

      this.newRecipe.ingredients = this.ingredientsInput.split(',').map(item => item.trim());

      try {
        const recipesCollection = collection(db, 'recipes');
        await addDoc(recipesCollection, this.newRecipe);
        console.log('Recipe added successfully!');
      } catch (error) {
        console.error('Error adding recipe:', error.message);
      }
    },
    // handleImageUpload(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     // Convert the file to a data URL for preview
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       this.newRecipe.imageURL = reader.result;
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push('/');
      }
    });
  },
};
</script>

<style scoped>
.new-recipe-form {
  max-width: 400px;
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input,
textarea {
  padding: 8px;
  margin-bottom: 10px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

img {
  max-width: 100%;
  margin-top: 10px;
}
</style>
