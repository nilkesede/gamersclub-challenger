<template>
  <Popper placement="top">
    <div class="gcc-kdr" :class="{
      'gcc-kdr--god': 1.5 <= value,
      'gcc-kdr--above': 1.2 <= value && value < 1.5,
      'gcc-kdr--below': value < 1
    }">{{value}}</div>
    <template #content>
      <div>This is the Popper content</div>
    </template>
  </Popper>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Popper from "vue3-popper";

@Options({
  components: {
    Popper,
  },
  props: {
    value: Number
  }
})
export default class KDR extends Vue {
  value!: number
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @use "sass:color";
  $backgroundOpacity: 0.5;
  $popperBg: #23394d;

  :deep(.popper) {
    background: $popperBg;
    padding: 20px;
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
  }

  :deep(.popper #arrow::before) {
    background: $popperBg;
  }

  :deep(.popper:hover),
  :deep(.popper:hover > #arrow::before) {
    background: $popperBg;
  }

  .gcc-kdr {
    background-color: rgba(#0000FF, 0.3);
    color: white;
    padding: 2px 5px;
    font-size: 10px;
    width: 100%;
    text-align: center;

    &--god {
      background: rgb(164, 170, 4);
      background: linear-gradient(90deg, rgb(164, 170, 4) 0%, rgba(121,14,9,1) 35%, rgba(0,74,255,1) 100%);
    }

    &--above {
      background-color: rgba(#FF0000, 0.5)
    }

    &--below {
      background-color: rgba(#000000, 0.2)
    }
  }
</style>
