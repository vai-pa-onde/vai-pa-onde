<template>
  <span class="tag" @click="evt => $emit('click', evt)">
    <div class="tag__text" :title="text">{{ text }}</div>
    <div v-if="dismissable" class="tag__dismiss" @click.stop="$emit('dismiss')" />
  </span>
</template>

<script>
export default {
  name: 'tag',
  props: {
    text: String,
    dismissable: Boolean
  }
}
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-decoration: none;
  color: map-get($colors-util, 'blue');
  background-color: rgba(map-get($colors-util, 'blue'), 0.15);
  border-radius: 4px;
  padding: 3px 5px;
  margin-left: 4px;
  margin-bottom: 6px;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: white;
    background-color: map-get($colors-util, 'blue');
  }

  &__text {
    &::after {
      display: block;
      content: attr(title);
      font-weight: bold;
      height: 1px;
      color: transparent;
      overflow: hidden;
      visibility: hidden;
    }
  }

  &__dismiss {
    border-radius: 20px;
    width: 14px;
    height: 14px;
    margin-left: 3px;
    background: {
      image: url('~@/assets/close.svg');
      size: 6px;
      repeat: no-repeat;
      color: rgba(white, 0.5);
      position: center;
    }
  }
}
</style>
