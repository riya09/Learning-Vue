<template>
    <div class="overlay">
        <div class="image-container">
            <img class="image" :src="images[currIndex]" alt="big image">
        </div>
        <div class="prev" @click="prev"></div>
        <div class="next" @click="next"></div>
        <div class="close" @click="close">
            <span>X</span>
        </div>
        <div class="thumbnail">
            <img v-for="(image,index) in images" :key="index"
                 :src="image"
                 :class="{'active':index===currIndex}"
                 @click="getIndex(index)" alt="this is an image">
        </div>
    </div>
</template>

<script>
    export default {
        name: "ImageLightbox",
        data(){
            return{
                currIndex:0,
                images:['https://images.unsplash.com/photo-1571384192873-ad1703337b32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80.jpg',
                'https://images.unsplash.com/photo-1571445463776-791a64308940?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80.jpg',
                'https://images.unsplash.com/photo-1569302911021-297d2362e3d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80.jpg',
                'https://images.unsplash.com/photo-1569820229114-07aa8a51f47c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80.jpg',
                'https://images.unsplash.com/photo-1571410992963-4951475f7e76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80.jpg']
            }
        },
        methods: {
            prev(){
                this.currIndex-=1;
                if(this.currIndex < 0)this.currIndex = this.images.length - 1;
            },
            next(){
                this.currIndex+=1;
                if(this.currIndex >= this.images.length)this.currIndex = 0;
            },
            close() {
                this.$emit('close');
            },
            getIndex(index){
                this.currIndex = index;
            }
        },
    }
</script>

<style scoped>
    .overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .image-container{
        width:50%;
        height: 500px;
        overflow: hidden;
    }
    .image-container .image{
        width:100%;
        height: 100%;
        object-fit: contain;
    }
    .prev,.next {
        width:0;
        height: 0;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        border-radius: 5px;
        cursor: pointer;
        border-right: 25px solid #fff;
        border-top: 25px solid transparent;
        border-bottom: 25px solid transparent;
    }
    .prev{
        transform: rotate(0deg);
        right:calc(100% - 55px);
    }
    .next{
        transform: rotate(180deg);
        left: calc(100% - 55px);
    }
    .close{
        font-size: 20px;
        position: absolute;
        top:10%;
        color: #fff;
        left: calc(100% - 45px);
        cursor: pointer;
        font-weight: bold;
        font-family: sans-serif;
    }
    .thumbnail{
        position: absolute;
        height: 50px;
        bottom: 0;
    }
    .thumbnail img{
        max-height: 50px;
        max-width: 50px;
        width:100%;
        height: 100%;
        cursor: pointer;
        object-fit: cover;
        opacity: 0.5;
    }
    .thumbnail img.active{
        opacity: 1;
        border:2px solid #fff;
    }
</style>
