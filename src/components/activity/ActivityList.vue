<template>
  <div class="activity-list" v-if="activities.length > 0">
    <activity
      :key="activity.id"
      v-for="activity in activities"
      :id="activity.id"
      :title="activity.title"
      :brand="activity.brand"
      :type="activity.type"
      :image="activity.image"
    />
  </div>
  <div class="activity-list activity-list--not-found" v-else>
    <not-found-card>Nenhum resultado correspondente com sua pesquisa</not-found-card>
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
  margin: 20px 0 44px 0;
  display: grid;
  grid-template-columns: repeat(4, 270px);
  gap: 40px;

  &--not-found {
    display: flex;
    margin-top: 64px;
  }

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
