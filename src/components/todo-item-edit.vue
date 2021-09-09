<template>
        
    <input 
    type="text" 
    v-model="editing.item.title" 
    class="border block w-full focus:outline-none p-1">

</template>

<script>

import useTodo from '@/composables/useTodo'

export default {

    setup() {
        const { editing, setEditing } = useTodo()
        return { editing, setEditing }
    }
}

</script>
