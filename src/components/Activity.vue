<template>
  <div :class="`activity activity--${type}`" @click="() => $router.push({ name: 'activity-details', params: { id }})">
    <img src="@/assets/activity.png" />
    <div class="activity__content">
      <h1>{{ title }}</h1>
      <p>{{ brand }}</p>
      <div class="activity__content__info">
        <span>{{ typeBadge }}</span>
        <div class="share"></div>
      </div>
    </div>
  </div>
</template>

<script>
import typeName from '@/js/typeName'

export default {
  name: 'activity',
  props: {
    id: Number,
    title: String,
    brand: String,
    type: {
      type: String,
      validator: s => ['course', 'event', 'product', 'content'].includes(s)
    }
  },
  computed: {
    typeBadge() {
      return typeName[this.type]
    }
  }
}
</script>

<style lang="scss" scoped>
.activity {
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &--course {
    background-color: map-get($colors-util, 'yellow');

    .activity__content__info > span {
      color: map-get($colors-util, 'yellow');
    }
  }

  &--event {
    background-color: map-get($colors-util, 'pink');

    .activity__content__info > span {
      color: map-get($colors-util, 'pink');
    }
  }

  &--product {
    background-color: map-get($colors-util, 'teal');

    .activity__content__info > span {
      color: map-get($colors-util, 'teal');
    }
  }

  &--content {
    background-color: map-get($colors-util, 'red');

    .activity__content__info > span {
      color: map-get($colors-util, 'red');
    }
  }

  img {
    display: block;
    width: 100%;
    height: 140px;
    object-fit: cover;
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 12px 16px 20px 16px;

    & > h1 {
      word-wrap: break-word;
      text-transform: uppercase;
      font: {
        size: 36px;
        weight: bold;
      }
    }

    & > p {
      line-height: 1.2;
      font-size: 20px;
      margin: 12px 0;
      flex-grow: 1;
    }

    &__info {
      & > span {
        display: block;
        padding: 6px;
        background-color: white;
        text-transform: uppercase;
        font: {
          size: 16px;
          weight: bold;
        }
        width: min-content;
      }
    }
  }
}
</style>
