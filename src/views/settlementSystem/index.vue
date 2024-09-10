<template>
  <div class="container">
    <!-- 查询条件-->
    <div>vue3+js</div>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-image: url(@/assets/images/settle_account/background.png);
  background-position: center 16%;
  background-repeat: no-repeat;
  background-size: cover;
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;
    background: linear-gradient(to right, rgb(227, 84, 187), rgb(219, 140, 5));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
