<template>
  <div
    class="activity"
    @click="() => $router.push({ name: 'activity-details', params: { id }})"
  >
    <img :src="image" alt :class="`type-background type-background--${type}`" />
    <type-badge class="activity__type" :type="type" />
    <div :class="`activity__content type-background type-background--${type}`">
      <h1>{{ title }}</h1>
      <p>{{ brand }}</p>
    </div>
    <div :class="`activity__date type-background type-background--${type}`">
      <div>até 25.05</div>
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
    type: String,
    image: String
  }
}
</script>

<style lang="scss" scoped>
.activity {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 20px;
  color: white;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out, border-color 0.2s ease-in-out;
  border: 6px solid transparent;

  &:hover {
    border-color: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-8px);
  }

  img {
    display: block;
    width: 100%;
    height: 125px;
    object-fit: cover;
  }

  &__type {
    position: absolute;
    top: 0;
    right: 0;
    background-color: white;
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
      margin: 12px 0 0 0;
      font: {
        size: 0.9em;
        weight: 500;
      }
    }
  }

  &__date {
    width: 100%;
    font: {
      family: 'Play';
      size: 16px;
    }

    & > div {
      background-color: rgba(white, 0.3);
      padding: 5px;
      width: min-content;
      white-space: nowrap;
      margin-left: auto;
    }
  }

  @media screen and (max-width: 968px) {
    img {
      height: 110px;
    }
  }

  @media screen and (max-width: 576px) {
    font-size: 14px;

    img {
      height: 80px;
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
      height: 100px;
    }
  }
}
</style>
