<template>
  <div class="activity">
    <img src="" alt />
    <div class="activity__type">lorem</div>
    <div class="activity__content">
      <h1>Lorem</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
    <div class="activity__date">
      <div>88/88</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'activity-skeleton'
}
</script>

<style lang="scss" scoped>
.activity {
  cursor: default;

  &:hover {
    transform: none;
    box-shadow: none;
    border-color: transparent;
  }

  & > img {
    filter: saturate(0);
    background-color: rgba(0, 0, 0, 0.08);
  }

  h1, p, &__date > div {
    color: transparent;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  &__date > div {
    border-radius: 0;
    border-top-left-radius: 5px;
  }

  &__content, &__date {
    background-color: rgba(0, 0, 0, 0.15);
  }
}
</style>
