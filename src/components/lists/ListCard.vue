<template>
  <cta-card class="list-card" :to="{ name: 'list-details', params: { listId: id } }" :numberOfActivities="listActivities.length">
    <template v-slot:content>
      <h2>{{ id }}</h2>
      <div class="list-card__share" @click.prevent="shareList">
        <img src="@/assets/link.svg" alt />
        compartilhar lista
      </div>
    </template>
  </cta-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'list-card',
  props: {
    id: String
  },
  computed: {
    ...mapGetters({ listById: 'lists/getById', sharingDataById: 'lists/getSharingData' }),
    listActivities() {
      return this.listById(this.id)
    },
    sharingData() {
      return this.sharingDataById(this.id)
    }
  },
  methods: {
    ...mapActions({ createUrl: 'lists/createUrl' }),
    async shareList() {
      if (!this.sharingData.url) {
        await this.createUrl(this.id)
      }

      const el = document.createElement('textarea')
      el.value = this.sharingData.url
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'

      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')

      document.body.removeChild(el)
      this.$toasted.show('Link da lista copiado!')
    }
  }
}
</script>

<style lang="scss">
.list-card {
  h2 {
    margin-bottom: 3rem;
    line-height: 1.25;
    flex-grow: 1;
  }

  &__share {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;
    font: {
      size: 0.9rem;
      weight: 900;
      family: 'Play', sans-serif
    }

    > img {
      height: .8rem;
      margin-right: 6px;
    }
  }
}
</style>
