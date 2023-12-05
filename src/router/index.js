import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SavedRecipes from '../components/SavedRecipes.vue';
import RecipeDetail from '../components/RecipeDetail.vue';
import NewRecipe from '../components/NewRecipe.vue';
import { getAuth } from 'firebase/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/saved-recipes',
    name: 'SavedRecipes',
    component: SavedRecipes,
    meta: {
      requiresAuth: true, 
    },
    beforeEnter: (to, from, next) => {
      const auth = getAuth();
      if (auth.currentUser) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetail',
    component: RecipeDetail,
  },
  {
    path: '/new-recipe',
    name: 'NewRecipe',
    component: NewRecipe,
    meta: { requiresAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
