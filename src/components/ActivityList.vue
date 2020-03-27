<template>
  <div class="activity-list">
    <activity
      :key="i"
      v-for="(activity, i) in activities"
      :id="i"
      :title="activity.title"
      :brand="activity.brand"
      :type="activity.type"
    />
  </div>
</template>

<script>
export default {
  name: 'activity-list',
  props: {
    activities: Array
  }
}
</script>

<style lang="scss" scoped>
.activity-list {
  @extend %side-padding;
  margin: 32px 0;
  display: grid;
  grid-template-columns: repeat(4, 270px);
  gap: 40px;

  @media screen and (max-width: 1264px) {
    grid-template-columns: repeat(3, 260px);
  }

  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 235px);
  }

  @media screen and (max-width: 576px) {
    gap: 16px 8px;
    grid-template-columns: repeat(2, 165px);
  }

  @media screen and (max-width: 374px) {
    grid-template-columns: repeat(1, 220px);
  }
}
</style>
