<template>
 
  <ul class="m-0 p-0" v-if="todoList.length" ref="infiniteScroll" id="infiniteScroll">

    <li 
    v-for="item in todoList"
    :key="item.id"
    class="w-1/3 mx-auto bg-white shadow-card p-4 text-black my-4">
        
      <todo-item :item="item" />

    </li>

  </ul>
  
  <p v-else 
  class="w-1/3 mx-auto bg-white shadow-card p-4 text-black my-4">
    No todo items found.
  </p>

  <div class="w-1/3 mx-auto bg-white shadow-card p-4 text-black my-4" v-if="loading">
    <font-awesome-icon icon="spinner" class="fa-spin" />
  </div>

</template>

<script>
  import { onMounted, onUnmounted, ref, watch } from 'vue'

  import todoItem from './todo-item'
  import useTodo from '@/composables/useTodo'

  export default {

    components: {
      todoItem,
    },

    props: {
      
      todoList: {
        required: true,
        type: Array
      }

    },

    setup() {

    
      const { deleteTodo, editing, setEditing, saveEditTodo, meta, setMeta, totalPages, fetchItems, setTodos, list } = useTodo()
      const loading = ref(false)

      watch(() => meta.page, (page) => {
        if(page <= totalPages.value) {
          loading.value = true
          fetchItems(page)
          .then(({data}) => {
            data = [ ...list.value, ...data.data ]
            setTodos(data)
            loading.value = false
          })
          .catch(() => {
            loading.value = false
          })
        }
      })

      const loadMoreTodos = () => {
        let elem = document.querySelector('#infiniteScroll')
        if(elem.getBoundingClientRect().bottom <= window.innerHeight) {
          setMeta('page',  Number(meta.page) + 1)
        }
      }

      onMounted(() => {
        window.addEventListener('scroll', loadMoreTodos) 
      })

      onUnmounted(() => {
        window.removeEventListener('scroll', loadMoreTodos)
      })



      return { 
        deleteTodo,
        editing,
        setEditing,
        saveEditTodo,
        loading,
        meta,
        totalPages
      }

    }

  }

</script>
