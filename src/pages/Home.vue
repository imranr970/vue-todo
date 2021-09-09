<template>

  <div>

      <h1 class="text-5xl text-center font-bold py-3 pb-6">Vue Todo App</h1>    

      <div class="w-1/3 mx-auto bg-white shadow-card p-4 text-red my-4" v-if="error">
        {{ error }}
      </div>

      <form action="#" @submit.prevent="addTodo">

        <div class="bg-white shadow-card p-4 text-black m-4 mx-auto w-1/3 flex">
          
          <input 
          type="text" 
          v-model.trim="item" 
          class="border block w-full focus:outline-none p-2" 
          placeholder="Add new Todo"
          @keyup="removeError"
          >
            
          <button 
          type="submit"
          class="bg-dark-green text-white border border-dark-green hover:opacity-95 p-1 px-10 text-center transition ease-in duration-150 ml-1">
            Add
          </button>

        </div>

      </form>

      <template v-if="loading">
        <div class="w-1/3 mx-auto bg-white shadow-card p-4 text-black my-4">
          <font-awesome-icon icon="spinner" class="fa-spin" />
        </div>
      </template>

      <template v-else>
        <todo-list :todoList="list" />
      </template>


  </div>

</template>

<script>


import { onMounted } from 'vue'

import todoList from '@/components/todo-list.vue'
import useTodo from '@/composables/useTodo'

export default {
  name: 'Home',
  components: {
    todoList
  },
  
  setup() {
    
    const { item, list, error, addTodo, getItems, loading, removeError } = useTodo()  
    
    onMounted(() => {
      getItems()
    })

    return {
      item,
      list,
      addTodo,
      error,
      loading,
      removeError
    }

  }

}
</script>
