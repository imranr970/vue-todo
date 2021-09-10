<template>

    <todo-item-edit v-if="isEditing(item.id)" />
    <todo-item-view :item="item" v-else />

</template>

<script>

    import useTodo from '@/composables/useTodo'
    import todoItemEdit from './todo-item-edit'
    import todoItemView from './todo-item-view'
    
    export default {

        components: {
            todoItemEdit,
            todoItemView
        },

        props: {
            item: {
                required: true,
                type: Object
            }
        },

        setup() {

            const { editing } = useTodo()

            const isEditing = (id) => {
                return editing.state && editing.item.id === id
            }

            return { 
                isEditing
            }

        }
    }

</script>
