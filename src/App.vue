<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/saved-recipes">Saved Recipes</router-link>
    </nav>
    <LoginButton />
    <router-view/>
  </div>
</template>

<script>
import LoginButton from './components/LoginButton.vue';

export default {
  components: {
    LoginButton
},
};
</script>

<style>

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #e0f1f8;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
