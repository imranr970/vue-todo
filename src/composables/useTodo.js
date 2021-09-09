
import axios from 'axios'
import { ref, reactive, computed } from 'vue'

const list = ref([])

const editing = reactive({
  item: {},
  state: false
})

const meta = reactive({
    page: 1,
    total: 0,
    perPage: 6
})

export default function useTodo() {

    const item = ref(null)
    const error = ref(null)
    const loading = ref(false)


    const setMeta = (prop, value) => {
        meta[prop] = value
    } 

    const totalPages = computed(() => {
      return Math.ceil(meta.total / meta.perPage)
    }) 


    const addTodo = async () => {

      if(!item.value || item.value == null || item.value === '') return 

      const todoExists = list.value.find(listItem => listItem.title.toLowerCase() === item.value.toLowerCase())

      if(!todoExists) {

        const todo = {
          title: item.value,
          isCompleted: false
        }

        axios.post('todo/create', { ...todo })
        .then(() => {
          list.value.push(todo)
          item.value = ''
        })
        .catch((err) => {
          error.value = err.response.data.errors
        })
      }
      else {
        error.value = 'Item already exists'
      }

    }

    const deleteTodo = (id) => {
        const deleteItem = findItemIndex(id)
        axios.post(`todo/delete/${id}`)
        .then(() => {
          list.value.splice(deleteItem, 1)
        })
        .catch(() => {
          error.value = "Something went wrong in deleting todo"
        })
    }

    const setEditing = ({ item = {}, state = true }) => {
      editing.item = item
      editing.state = state
    }

    const saveEditTodo = () => {
      console.log("I was here")
      const itemIndex = findItemIndex()

      axios.post(`todo/edit/${editing.item.id}`, { ...editing.item })
      .then(() => {
        list.value[itemIndex].title = editing.item.title
        setEditing({ state: false })
      })
      .catch((err) => {
        error.value = err.response.data.errors
      })
      
    }

    const removeError = () => {
      error.value = null
    }

    const markCompleteTodo = ({ id, completed }) => {
      
      const itemIndex = findItemIndex(id)
      const todoItem = list.value[itemIndex]

      axios.post(`todo/edit/${id}`, { 
        title: todoItem.title,
        isCompleted: completed
      })
      .then((data) => {
        console.log(data)
        todoItem.isCompleted = completed
      })
      .catch((err) => {
        error.value = err.response.data.errors
      })

    }

    const getItems = (page = 1) => {
      loading.value = true
      fetchItems(page)
      .then(({ data }) => {
        setTodos(data.data)
        setMeta('total', data.total)
        loading.value = false
      })
      .catch(() => {
        loading.value = false
        error.value = 'Could not fetch Todos'
      })

    }

    const fetchItems = (page) => {
      return axios.post('todos', { page })
    }

    const setTodos = (data) => {
      list.value = data
    }

    const findItemIndex = (id = null) => {
      if(!id) id = editing.item.id
      return list.value.findIndex(listItem => listItem.id === id)
    }

    return {
        item,
        list,
        error,
        editing,
        loading,
        meta,
        getItems,
        addTodo,
        deleteTodo,
        setEditing,
        saveEditTodo,
        markCompleteTodo,
        setMeta,
        totalPages,
        setTodos,
        fetchItems,
        removeError
    }

}