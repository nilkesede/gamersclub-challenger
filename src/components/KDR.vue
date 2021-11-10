<template>
  <div class="gcc-kdr-wrapper">
    <div class="gcc-stats-trigger">Ver mais</div>
    <div class="gcc-kdr" :class="{
      'gcc-kdr--god': 1.5 <= value,
      'gcc-kdr--above': 1.2 <= value && value < 1.5,
      'gcc-kdr--below': value < 1
    }">{{value}}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    value: Number,
  }
})
export default class KDR extends Vue {
  value!: number

  data(): any {
    return {

    }
  }

  onOpenPopper(){
    fetch('https://gamersclub.com.br/api/box/history/340558')
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch((err) => { console.log('errooou', err) })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @use "sass:color";
  $backgroundOpacity: 0.5;
  $popperBg: #23394d;

  .gcc-kdr-wrapper {
    position: relative;

    &:hover {
      .gcc-stats-trigger {
        display: block;
      }
    }
  }

  .gcc-stats-trigger {
    text-align: center;
    // display: none;
    display: block;
    height: 10px;
    color: white;
    width: 100%;
    position: absolute;
    top: -10px;
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
