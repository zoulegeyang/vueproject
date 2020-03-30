<template>
    <div class="shop-list">
        <list-item v-for="(item,index) in products" :key="index" :product="item"></list-item>
    </div>
</template>

<script>
import listItem from "./listItem"
import { mapGetters } from 'vuex';
export default {
     name:"shopList",
    data() {
        return {

        };
    },
    computed:{
        ...mapGetters({
            products:'list'
        })
    },
    components:{
        listItem,
     },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped >

</style>
