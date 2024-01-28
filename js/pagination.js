export default {
    props: ["pages", "getProductsList"], //取得Vue data跟method里預定義的變數(方法)

    template:
    `<nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" :class="{
                'disabled':!pages.has_pre
            }"
            >
                <a class="page-link" href="#" aria-label="Previous" @click="getProductsList(pages.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item"
                :class="{
                    'active': page === pages.current_page
                }"
            v-for="page in pages.total_pages" :key="page + 'pagination'"><a class="page-link" @click="getProductsList(page)" href="#">{{ page }}</a></li>
            <li class="page-item" :class="{
                'disabled':!pages.has_next
            }">
                <a class="page-link" href="#" aria-label="Next"  @click="getProductsList(pages.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>`,
}

// 如果分頁資料裡has_pre = false，則使用disabled class
// 如果分頁資料裡has_next = false，則使用disabled class
