<script>

export default {
    props: {
        movie: Object
    },
    emits: ['deleteMovie','editMovie','addMovieToFavouriteList','informationAboutMovie'],
    methods:{
        
        }
    }
    

</script>

<template>
    <p v-on:click="()=>this.$emit('informationAboutMovie',movie)"> {{movie.title}}  </p>

    <button v-on:click="() => this.$emit('deleteMovie', movie)"> Удалить </button>
    <button v-on:click="() => this.$emit('editMovie', movie)"> Редактировать </button>
    <button v-on:click="() => this.$emit('addMovieToFavouriteList', movie)">  Добавить в любимые </button>
</template>