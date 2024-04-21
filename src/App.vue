<script setup lang="ts">
  import {type PersenInter,type Persons} from '@/types';


  
  const person1:Array<PersenInter> = [{
    id:"123",
    name:"nihao"
  }]
  const person:Persons = [{
    id:"123",
    name:"nihao"
  }] 
  console.log(person);
  
</script>

<template>
  <div><p>
    123
  </p></div>
</template>


<style scoped lang="less">
div{
  p{
    color: red;
  }
}
</style>
