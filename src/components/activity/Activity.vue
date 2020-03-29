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
        <share-button />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'activity',
  props: {
    id: String,
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
  font-size: 20px;
  color: white;

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
      line-height: 1.2;
      flex-grow: 1;
      font: {
        size: 1em;
        weight: bold;
      }
    }

    & > p {
      line-height: 1.2;
      font-size: 1em;
      margin: 12px 0;
    }

    &__info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > .type-badge {
        background-color: white;
      }
    }
  }

  @media screen and (max-width: 576px) {
    font-size: 14px;

    img {
      height: 90px;
    }

    &__content {
      padding: 8px 12px 14px 12px;

      & > h1 {
        font-size: 1em;
      }
    }
  }

  @media screen and (max-width: 374px) {
    font-size: 16px;

    img {
      height: 110px;
    }
  }
}
</style>
