<template>
  <div class="recipe-details">
    <img :src="require(`@/assets/${recipe.imageURL}`)" alt="Recipe Image" class="recipe-image" />
    <div class="text-overlay">
      <h3>{{ recipe.name }}</h3>
      <p>{{ recipe.description }}</p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    recipeId: Array,
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.fetchRecipes();
  },
  methods: {
    async fetchRecipes() {
      try {
        const querySnapshot = await this.$firestore.collection('recipes').get();
        this.recipes = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    },
  },
};
</script>

<style scoped>
.recipe-detail-modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
