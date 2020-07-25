<template>
  <list-add-icon class="list-add-button" @click.native="openModal" />
</template>

<script>
import eventBus from '@/js/eventBus'

export default {
  name: 'list-add-button',
  props: {
    id: String
  },
  methods: {
    openModal(evt) {
      eventBus.$emit('open-list-modal', this.id)
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="scss">
.list-add-button {
  cursor: pointer;
}
</style>
