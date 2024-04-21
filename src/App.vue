<script setup lang="ts">
import {login} from '@/api/user'
login({username:"1234",password:"21345"});
</script>

<template>
  <div><p>
    123
  </p></div>
  <svg-icon name="jh" color="red"></svg-icon>
</template>


<style scoped lang="less">
div{
  p{
    color: red;
  }
}
</style>
