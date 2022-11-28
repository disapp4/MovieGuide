<script >
import router from "../router";
export default {

data() {
    return {
        movie: { }

    };
},

methods: {
    
   
    backToMainPage(){
        router.push({name:'mainPage'})

    }
}

};
</script>



<template>
<h1> Список любимых фильмов </h1>

<button v-on:click="backToMainPage"> Назад </button>

</template>