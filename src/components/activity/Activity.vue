<template>
  <div
    :class="`activity type-background type-background--${type}`"
    @click="() => $router.push({ name: 'activity-details', params: { id }})"
  >
    <img :src="image" alt />
    <type-badge class="activity__type" :type="type" />
    <div class="activity__content">
      <h1>{{ title }}</h1>
      <p>{{ brand }}</p>
    </div>
    <div class="activity__date">
      até 25.05
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
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  margin-top: 12px;
  margin-bottom: -12px;

  &:hover {
    border: 6px solid white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    width: calc(100% + 12px);
    height: calc(100% + 12px);
    transform: translateY(-6px);
    margin-left: -6px;
    margin-top: 0;
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
        size: 1em;
        weight: 500;
      }
    }
  }

  &__date {
    background-color: rgba(white, 0.3);
    margin: 0 0 0 auto;
    padding: 5px;
    font: {
      family: 'Play';
      size: 16px;
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
