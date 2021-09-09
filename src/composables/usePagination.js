import { reactive, computed } from 'vue'
export default function usePagination() {

    const meta = reactive({
        page: 1,
        total: 0,
        perPage: 6
    })  

    const setMeta = ({ page = 1, total, perPage = 6 }) => {
        meta.page = page
        meta.total = total
        meta.perPage = perPage
    } 

    const totalPages = computed(() => {
        return Math.ceil(meta.total / meta.perPage)
    }) 

    return {
        meta,
        setMeta,
        totalPages
    }

}