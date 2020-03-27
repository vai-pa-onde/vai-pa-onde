<template>
  <div class="share-button" v-if="canShare" @click.stop="share" />
</template>

<script>
export default {
  name: 'share-button',
  computed: {
    canShare() {
      return !window.navigator.share
    }
  },
  methods: {
    share(event) {
      window.navigator.share({
        title: 'Aooba',
        text: 'Eaeee',
        url: 'https://www.vaipaonde.com.br/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.share-button {
  width: 20px;
  height: 20px;
  background: {
    repeat: no-repeat;
    image: url('~@/assets/share.svg');
    size: contain;
  }
}
</style>
