<template>
    <div class="modal-container">
        <div class="modal">
            <slot name="header">I am default header</slot>
            <slot name="body">I am default body</slot>
            <slot name="footer">I am default footer
                <button type="button" class="btn-green" @click="close">Close</button>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'modal',
        methods: {
            close() {
                this.$emit('close');
            },
        },
    };
</script>


<style scoped>
    .modal-container {
        width:100%;
        position: fixed;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background: #fff;
        display: flex;
        flex-direction: column;
    }
</style>
