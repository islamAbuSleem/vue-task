<template>
  <div class="new">
    <form action="">
      <span class="close" @click="close">×</span>
      <input type="text" :placeholder="placeholder" v-model="newCountry" />
      <button class="add-country" @click.prevent="addCountry">
        {{buttonText}}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props:["placeholder","buttonText"],
    data(){
        return{
            newCountry:''
        }
    },
  methods: {
    close() {
      this.$emit("close");
    },
    addCountry(){
        this.$emit('addCountry',this.newCountry)
    }
  },
};
</script>

<style lang="scss" scoped>
.new {
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.7);
  animation: fadeIn 0.3s linear forwards;
z-index: 99;
  form {
    position: relative;
    width: 50vw;
    margin: 20vh auto;
    background-color: #eee;
    padding: 20px;
    border-radius: 5px;
    padding: 10vh 0;
    animation: moveUp .5s linear forwards;
    .close {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 2rem;
      cursor: pointer;
    }
    input {
      padding: 7px;
      width: 20vw;
      margin: 10px 0;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    .add-country {
      display: block;
      padding: 7px;
      cursor: pointer;
      margin: auto;
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@keyframes moveUp {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>