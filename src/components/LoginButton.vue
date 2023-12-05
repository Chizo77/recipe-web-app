<template>
  <div>
    <div class="auth-container">
      <button v-if="!user" @click="loginWithFacebook" class="login-button">Login with Facebook</button>
      <div v-if="user">
        <p class="display-name">Welcome, {{ user.displayName }}!</p>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, facebookProvider } from '@/firebase';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';

export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
  methods: {
    async loginWithFacebook() {
      try {
        const result = await signInWithPopup(auth, facebookProvider);
        this.user = result.user;
      } catch (error) {
        if (error.code === 'auth/popup-closed-by-user') {
          console.warn('User closed the Facebook popup.');
        } else {
          console.error('Error logging in with Facebook:', error.message);
        }
      }
    },
    logout() {
      auth.signOut();
      this.user = null;
    },
  },
};
</script>

<style scoped>
.auth-container {
  position: fixed;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
}

.login-button {
  background-color: #4267B2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button {
  background-color: #dc3545; 
  color: white;
  padding: 10px 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 10px; 
}

.display-name {
  margin: 0;
  margin-left: 10px;
  color: #555;
}
</style>
