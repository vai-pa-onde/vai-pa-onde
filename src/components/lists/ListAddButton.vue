<template>
  <list-add-icon class="list-add-button" @click.native="evt => $emit('click', evt)" />
</template>

<script>
export default {
  name: 'list-add-button',
  props: {
    id: String
  }
}
</script>
