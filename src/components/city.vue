<template>
    <div class="single-city">
        <p>{{data.name}}</p>
    </div>
</template>

<script>
export default {
props:["data"]
}
</script>

<style lang="scss" scoped>
    .single-city{
        width: 40%;
        background-color: #70a1ff;
        margin: 10px 3px;
        border-radius: 5px;
        color: #fff;
        font-weight: 600;
    }
</style>