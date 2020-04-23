<template>
  <div class="suggestion-modal">
    <vpo-button dark text="mandar uma ação" @click="isModalOpen = true" />
    <modal v-model="isModalOpen" title="mandar uma ação" />
  </div>
</template>

<script>
export default {
  name: 'suggestion-modal',
  data: () => ({
    isModalOpen: false
  })
}
</script>

<style lang="scss" scoped>
</style>
