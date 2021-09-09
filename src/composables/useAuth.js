
import { ref, reactive, computed } from 'vue'
import axios from '../services/axios'

const token = ref('')
const auth = ref('')

export default function useAuth() {

    const user = reactive({
        name: null,
        email: null,
        password: null
    })

    const errors = ref({})
    const loading = ref(false)

    const login = () => {
        
        loading.value = true
        
        return axios.post('login', { ...user })
        .then(({ data }) => {
            return setAuth(data)
        })
        .then(() => {
            resetUser()
            loading.value = false
            return Promise.resolve()
        })
        .catch((err) => {
            loading.value = false
            console.log(err.response.status)
            if(err.response.status == 401 || err.response.status == 500) {
                errors.value = {
                    email: ['Email or password is wrong']
                }
                return
            }
            errors.value = err.response.data.errors
            return Promise.reject()
        })
        
    }

    const register = () => {
        
        loading.value = true
        
        return axios.post('register', { ...user })
        .then(() => {
            resetUser()
            loading.value = false
            return Promise.resolve()
        })
        .catch((err) => {
            loading.value = false
            errors.value = err.response.data.errors
            return Promise.reject()
        })
        
    }
    
    const setAuth = (data) => {
        localStorage.setItem('auth', JSON.stringify(data.user))
        localStorage.setItem('token', JSON.stringify(data.meta))
        axios.defaults.headers.common = {'Authorization': `bearer ${data.meta}`}
        token.value = data.meta
        auth.value = data.user
        return Promise.resolve()
    }

    const logout = () => {
        localStorage.setItem('auth', null)
        localStorage.setItem('token', null)
        auth.value = null
        token.value = null
        return Promise.resolve()
    }

    const isLoggedIn = () => {
        return auth.value != null && auth.value != 'null'
    }

    const checkAutoLogin = () => {
        let authUser = localStorage.getItem('auth')
        if(authUser) {
            authUser = JSON.parse(authUser)
            auth.value = authUser
            const savedToken = JSON.parse(localStorage.getItem('token'))
            token.value = savedToken
            axios.defaults.headers.common = {'Authorization': `bearer ${savedToken}`}
        }
    }
    
    const resetUser = () => {
        user.name = null
        user.email = null,
        user.password = null
    }

    const hasErrors = computed(() => {
        return Object.entries(errors.value).length > 1
    })

    const removeError = (name) => {
        let filteredErrors = errors.value
        delete filteredErrors[name]
        Object.assign(errors.value, filteredErrors)
    }

    const clearErrors = () => {
        errors.value = {}
    }

    return {
        token,
        login,
        user,
        errors,
        hasErrors,
        loading,
        auth,
        removeError,
        clearErrors,
        isLoggedIn,
        register,
        checkAutoLogin,
        logout
    }

}