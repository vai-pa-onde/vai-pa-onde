<template>
  <div
    :class="`activity type-background type-background--${type}`"
    @click="() => $router.push({ name: 'activity-details', params: { id }})"
  >
    <img src="@/assets/activity.png" />
    <div class="activity__content">
      <h1>{{ title }}</h1>
      <p>{{ brand }}</p>
      <div class="activity__content__info">
        <type-badge :type="type" />
        <div class="share"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'activity',
  props: {
    id: Number,
    title: String,
    brand: String,
    type: String
  }
}
</script>

<style lang="scss" scoped>
.activity {
  display: flex;
  flex-direction: column;
  cursor: pointer;

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
      line-height: 26px;
      flex-grow: 1;
      font: {
        size: 22px;
        weight: bold;
      }
    }

    & > p {
      line-height: 1.2;
      font-size: 20px;
      margin: 12px 0;
    }

    &__info {
      & > .type-badge {
        background-color: white;
      }
    }
  }
}
</style>
