<template>

    <div class="flex">

        <label :for="item.id" :class="isCompletedClasses(item)" class="flex-grow">
            <input 
            type="checkbox" 
            name="" 
            :id="item.id" 
            :checked="item.isCompleted != 0"
            @change="markCompleteTodo({ id: item.id, completed: $event.target.checked })">
            {{ item.title }}
        </label>

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

<script>
    import useTodo from '@/composables/useTodo'
    export default {
        
        props: {
            item: {
                required: true,
                type: Object
            }
        },

        setup() {
            
            const { markCompleteTodo, setEditing, deleteTodo } = useTodo()

            const isCompletedClasses = (item) => [
                {'line-through': item.isCompleted != 0 },
                {'text-gray-400': item.isCompleted != 0 }
            ]

            return {
                isCompletedClasses,
                markCompleteTodo,
                setEditing,
                deleteTodo
            }

        }

    }
</script>

<style lang="scss" scoped>

</style>