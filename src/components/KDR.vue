<template>
  <div class="gcc-kdr" :class="{
    'gcc-kdr--god': value > 1.5,
    'gcc-kdr--above': value > 1.2 && value < 1.5,
    'gcc-kdr--below': value < 1
  }">{{value}}</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
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
