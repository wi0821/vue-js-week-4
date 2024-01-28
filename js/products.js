import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { api_path,baseURL,checkLogin} from "./login.js";
import PaginationComponent from './pagination.js'
import ProductModalComponent from './productModal.js'
import DelProductModalComponent from './delProductModal.js'

const productsAPP = {
  data() {
    return {
      currentID:"",
      productsList:[],
      temp: {is_enabled:0},
      isFieldError: false,
      pages:{}, //定義分頁資料
    }
  },

  methods: {
    getProductsList(page = 1) { //page參數預設為1
      axios.get(`${baseURL}/api/${api_path}/admin/products?page=${page}`)
      .then((res) => {
        this.productsList = res.data.products;
        this.pages = res.data.pagination;
      })
      .catch((err) =>{
        alert(err.response.data.message);
      })
    },

    getProductID(product) {
      this.temp = {...product};
      this.currentID = this.temp.id;
      this.isFieldError = false;
    },

    //初始化imagesUrl為陣列
    createImages() {
      this.temp.imagesUrl = [];
      this.temp.imagesUrl.push('');
    },

    addProduct() {
        axios.post(`${baseURL}/api/${api_path}/admin/product/`,{data:this.temp})
        .then((res) => {
          console.log(res);
          this.getProductsList();
          this.$refs.pModal.closeModal();
        })
        .catch((err) =>{
          console.log(err)
          this.isFieldError = true;
        })
    },

    editProduct() {
      axios.put(`${baseURL}/api/${api_path}/admin/product/${this.currentID}`,{data:this.temp})
      .then((res) => {
        console.log(res);
        this.getProductsList();
        this.$refs.pModal.closeModal()
      })
      .catch((err) =>{
        console.log(err)
        alert(err.response.data.message);
      })
    },

    deleteProduct() {
      axios.delete(`${baseURL}/api/${api_path}/admin/product/${this.currentID}`)
      .then((res) => {
        console.log(res);
        this.getProductsList();
        alert("刪除成功");
        this.$refs.dModal.closeModal();
        this.temp = {};
      })
      .catch((err) =>{
        console.log(err)
        alert(err.response.data.message);
      })
    }
  },

  mounted() {
    this.getProductsList();
  },

  components: {
    PaginationComponent,
    ProductModalComponent,
    DelProductModalComponent
  },

  created() {
    checkLogin();
  },
}

createApp(productsAPP).mount("#products");