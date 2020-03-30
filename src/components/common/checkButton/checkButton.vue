<template>
    <div class="check-button">
        
            <img src="~assets/img/cart/tick.svg" :class="{ischeck:isChecked}" alt="" >
        
        
    </div>
</template>

<script>
export default {
     name:"checkButton",
     props:{
         isChecked:{
             type:Boolean,
             default(){
                 return false
             }
         }
     },
    data() {
        return {

        };
    },
    components:{

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
.check-button{
    display: flex;
    /* 图片居中 */
    align-items: center;
    /* height: 100%; */
    justify-content: center;
    
    
    
}

.check-button img{
    /* width:30%;
    height: 30%; */
    /* background-color: red; */
    border:1px solid #ccc;
    border-radius: 50%;
}
.ischeck{
    background-color: red;
    /* border:1px solid blue; */
}
</style>
