<template>
  <div class="share-button" v-if="canShare" @click.stop="share" />
</template>

<script>
export default {
  name: 'share-button',
  props: {
    activityId: String,
    activityTitle: String
  },
  computed: {
    canShare() {
      return !!window.navigator.share
    }
  },
  methods: {
    share(event) {
      window.navigator.share({
        text: `Olha o que eu achei! - ${this.activityTitle}`,
        url: `https://www.vaipaonde.com.br/acao/${this.activityId}`
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
