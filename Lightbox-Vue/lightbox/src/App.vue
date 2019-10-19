<template>
  <div id="app">
    <button type="button" @click="showModal">Open Modal</button>
    <lightbox v-show="isModalOpen" @close="closeModal"/>
  </div>
</template>

<script>
import ImageLightbox from "@/components/ImageLightbox"
export default {
  name: 'app',
  components: {
    'lightbox':ImageLightbox
  },
  data(){
    return{
      isModalOpen:false
    }
  },
  methods:{
    showModal() {
      this.isModalOpen = true
    },
    closeModal(){
      this.isModalOpen=false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
