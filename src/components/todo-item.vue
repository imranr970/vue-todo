<template>
    <label :for="item.id" :class="isCompletedClasses(item)">
        <input 
        type="checkbox" 
        name="" 
        :id="item.id" 
        @change="markCompleteTodo({ id: item.id, completed: $event.target.checked })">
        {{ item.title }}
    </label>
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

            const { markCompleteTodo } = useTodo()

            const isCompletedClasses = (item) => [
                {'line-through': item.isCompleted != 0 },
                {'text-gray-400': item.isCompleted != 0 }
            ]
            
            return { markCompleteTodo, isCompletedClasses }

        }
    }

</script>
