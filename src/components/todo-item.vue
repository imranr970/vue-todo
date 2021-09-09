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
                {'line-through': item.isCompleted },
                {'text-gray-400': item.isCompleted }
            ]
            
            return { markCompleteTodo, isCompletedClasses }

        }
    }

</script>
