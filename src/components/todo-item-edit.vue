<template>

    <form action="#" @submit.prevent="saveEditTodo">
        
        <div class="flex items-center box-border">
            
            <input 
            type="text" 
            v-model="editing.item.title" 
            class="border block w-full focus:outline-none p-1 flex-grow ">
            
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

<script>

import useTodo from '@/composables/useTodo'

export default {

    setup() {
        const { editing, setEditing, saveEditTodo } = useTodo()
        return { editing, setEditing, saveEditTodo }
    }
}

</script>
