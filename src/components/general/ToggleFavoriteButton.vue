<template>
  <heart-icon
    :class="`toggle-favorite-button ${isFavorite ? `toggle-favorite-button--active ${type ? `toggle-favorite-button--active--${type}` : ''}` : ''}`"
    @click.native="toggleFavorite"
  />
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'toggle-favorite-button',
  props: {
    id: String,
    type: String
  },
  computed: {
    isFavorite() {
      return this.$store.getters['favorites/isFavorite'](this.id)
    }
  },
  methods: {
    ...mapMutations({
      addFavorite: 'favorites/addFavorite',
      removeFavorite: 'favorites/removeFavorite'
    }),
    toggleFavorite(evt) {
      evt.preventDefault()

      if (this.isFavorite) {
        this.removeFavorite(this.id)
      } else {
        this.addFavorite(this.id)
      }
    }
  }
}
</script>

<style lang="scss">
@mixin favorite-active($color) {
  fill: map-get($colors-util, $color);
  stroke: map-get($colors-util, $color);
}

.heart-icon.toggle-favorite-button {
  fill: transparent;
  stroke-width: 50px;
  stroke: white;
  overflow: visible;
  cursor: pointer;
  transition: stroke 0.2s, fill 0.2s;

  &--active {
    @include favorite-active('white');

    &--learn {
      @include favorite-active('yellow');
    }

    &--participate {
      @include favorite-active('pink');
    }

    &--do {
      @include favorite-active('teal');
    }

    &--share {
      @include favorite-active('red');
    }
  }
}
</style>
