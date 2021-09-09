<template>
    
    <main class="login-page flex justify-center items-center h-screen">

      <div class="w-1/3 rounded shadow-card">
        
        <div class="p-8 text-left">
          
          <div class="mb-8">
            <h4 class="text-2xl font-bold">Create a Free Account</h4>
            <p class="mt-2 text-dark-gray">It will take hardly one minute to create a Free account.</p>
          </div>

          <form 
          action="#" 
          @submit.prevent="submit"
          @keyup="removeError($event.target.name)"
          @change="removeError($event.target.name)">

            <div class="form-group pb-3">

              <input
              type="text" 
              name="name"
              placeholder="Please enter your name"
              class="block border-0 border-b-half w-full focus:outline-none"
              :class="[!!errors.name ? ['border-red-900 placeholder-red-900'] : ['border-light-green placeholder-gray-500'] ]"
              v-model="user.name"
              />

              <label 
              for="name" 
              class="text-xs text-gray-500"
              :class="!!errors.name ? 'text-red-900' : 'text-gray-500'"
              >
                 {{ !!errors.name ? errors.name[0] : 'Name' }} 
              </label>

            </div>
            
            <div class="form-group pb-3">

              <input
              type="email" 
              name="email"
              placeholder="Please enter your email"
              class="block border-0 border-b-half w-full focus:outline-none"
              :class="[!!errors.email ? ['border-red-900 placeholder-red-900'] : ['border-light-green placeholder-gray-500'] ]"
              v-model="user.email"
              />

              <label 
              for="email" 
              class="text-xs text-gray-500"
              :class="!!errors.email ? 'text-red-900' : 'text-gray-500'"
              >
                 {{ !!errors.email ? errors.email[0] : 'Email' }} 
              </label>

            </div>

            <div class="form-group pb-3">

              <input 
                type="password"
                name="password"
                placeholder="password"
                class="block border-0 border-b-half w-full focus:outline-none"
                :class="[!!errors.password ? ['border-red-900 placeholder-red-900'] : ['border-light-green placeholder-gray-500'] ]"
                v-model="user.password"
              />

              <label 
              for="name" 
              class="text-xs text-gray-500"
              :class="!!errors.password ? 'text-red-900' : 'text-gray-500'"
              >
                 {{ !!errors.password ? errors.password[0] : 'Enter Password' }} 
              </label>
            
            </div>

          
            <div class="flex justify-between mt-10">

              <router-link 
              class="bg-white text-dark-green border border-dark-green hover:bg-dark-green hover:text-white p-1 px-10 text-center transition ease-in duration-150" 
              :to="{ name: 'Login' }">
                Login
              </router-link>

              <button 
              :disabled="loading || hasErrors"
              :title="hasErrors ? 'Please resolve the errors first' : ''"
              type="submit"
              class="bg-dark-green text-gray-200 p-1 px-10 text-center transition ease-in duration-100 hover:opacity-90"
              :class="{ 'cursor-not-allowed': loading|| hasErrors }"
               >
                Register
                
                <font-awesome-icon icon="spinner" class="fa-spin" v-show="loading" />

              </button>

            </div>


          </form>

        </div>

      </div>

    </main>


</template>

<script>

import useAuth from '@/composables/useAuth'

export default {

    setup () {
        
        const { 
            register,
            user,
            errors,
            hasErrors,
            loading,
            removeError
        } = useAuth()

        const submit = () => {
            register()
            .then(() => {
                alert('Account Created successfully, You can now login')
            })
        }

        return {
            user,
            errors,
            hasErrors,
            submit,
            removeError,
            loading
        }

    }
}
</script>
