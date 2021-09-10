<template>
 
  <ul class="m-0 p-0" v-if="todoList.length" ref="infiniteScroll" id="infiniteScroll">

    <li 
    v-for="item in todoList"
    :key="item.id"
    class="w-1/3 mx-auto bg-white shadow-card p-4 text-black my-4">

      <template v-if="isEditing(item.id)">
          
          <form action="#" @submit.prevent="saveEditTodo">
            
            <div class="flex items-center box-border">
              
              <todo-item-edit />
              
              <span class="flex text-sm">
                  
                  <button type="submit" class="bg-dark-green text-white border border-dark-green hover:opacity-95 p-1 text-center transition ease-in duration-150 mx-0.5">
                    Edit
                  </button>

                  <button class="bg-white text-dark-green border hover:opacity-95 p-1 text-center transition ease-in duration-150" @click.prevent="setEditing({ state: false })">
                    Cancel  
                  </button>
              
              </span>
              
            </div>

          </form>


      </template>  

      <template v-else>

        <div class="flex items-center">
          
          <todo-item 
          :item="item"
          class="flex-grow"
          />

          <span>
            
            <font-awesome-icon 
            icon="pen" 
            class="text-dark-green text-sm cursor-pointer" 
            title="Edit item" 
            @click.prevent="setEditing({ item })"
            />
            
            <font-awesome-icon 
            icon="trash" 
            class="text-red-800 text-sm cursor-pointer mx-2" 
            title="Delete item" 
            @click.prevent="deleteTodo(item.id)" />
          
          </span>

        </div>
      
      </template>
      

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
  /* eslint-disable */
  import { onMounted, onUnmounted, ref, watch } from 'vue'

  import todoItem from './todo-item'
  import todoItemEdit from './todo-item-edit'
  import useTodo from '@/composables/useTodo'

  export default {

    components: {
      todoItem,
      todoItemEdit
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

      const isEditing = (id) => {
        console.log(editing.state && editing.item.id === id)
        return editing.state && editing.item.id === id
      }

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
        isEditing,
        saveEditTodo,
        loading,
        meta,
        totalPages
      }

    }

  }

</script>
