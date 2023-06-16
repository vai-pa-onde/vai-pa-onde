<template>
  <div class="lists">
    <current-section-indicator />
    <div>
      <list-layout :isSkeleton="false" :items="allLists" showOptions>
        <template v-slot:options>
          <h1 class="lists__header">CONFIRA AS LISTAS CRIADAS NESSE NAVEGADOR</h1>
        </template>
        <template v-slot:skeleton="{ }">
        </template>
        <template v-slot:item="{ item }">
          <list-card :id="item" />
        </template>
      </list-layout>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '@/config'

export default {
  name: 'lists',
  computed: {
    ...mapGetters({ allLists: 'lists/getAll' })
  },
  metaInfo() {
    return {
      title: 'Vai pa onde? | Minhas listas',
      meta: [
        { vmid: 'description', name: 'description', content: config.defaultDescription },
        { vmid: 'og:description', name: 'og:description', content: config.defaultDescription }
      ],
      link: [
        { rel: 'canonical', href: 'https://vaipaonde.netlify.app/listas' }
      ]
    }
  }
}
</script>

<style lang="scss">
.lists {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  background-color: map-get($colors-util, 'light-gray');
  margin-top: 16px;

  &__header {
    text-transform: uppercase;
    margin-top: 28px;
    font-family: "Play";
    // font-size: 14px;
    font-weight: bold;
  }

  & > .separator-bar {
    margin-top: 0;
  }

  @include breakpoint('large') {
    margin-top: 32px;;
  }
}
</style>
