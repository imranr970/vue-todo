<template>
  <div id="nav" class="card text-black mt-4 flex justify-around">
    <template v-if="!isLoggedIn()">
      <router-link :to="{ name: 'Login' }">Login</router-link> 
      <router-link :to="{ name: 'Register' }">Register</router-link> 
    </template>

    <template v-else>
      <router-link :to="{ name: 'Home' }">Home</router-link> 
      <a href="#" @click.prevent="logoutAndRedirect">Logout</a> 
    </template>

  </div>

  <div class="app" style="min-height: 600px">
    <router-view/>
  </div>

</template>

<script>

import { onBeforeMount } from 'vue'
import useAuth from '@/composables/useAuth'
import { useRouter } from 'vue-router'

export default {
  
  setup() {
    
    const { checkAutoLogin, logout, isLoggedIn } = useAuth()
    const router = useRouter()
    
    const logoutAndRedirect = async () => {
      await logout()
      router.push({ name: 'Login' })
    }
    
    onBeforeMount(() => {
      checkAutoLogin()
    })

    return {
      logout,
      isLoggedIn,
      logoutAndRedirect
    }

  }

}
</script>
