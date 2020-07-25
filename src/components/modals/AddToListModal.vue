<template>
  <div class="add-to-list-modal">
    <modal
      v-model="isModalOpen"
      title="adicionar à lista"
      action="adicionar"
      :isActionLoading="$store.state.feedback.sending"
      @confirm="send"
    >
      <div class="modal-content" @click.stop>
        <p>
          <b>Adicione essa ação a uma lista para mais tarde?</b> As listas ficam
          salvas e podem ser compartilhadas com outras pessoas!
        </p>
        <label>Selecionar lista</label>
        <div>
          <chooser v-model="selectedList" v-if="chooserOptions.length > 0" :options="chooserOptions" />
          <p v-else>Você não tem nenhuma lista! Deseja criar uma?</p>
          <vpo-input
            v-model="newListTitle"
            placeholder="Nome da nova lista"
            :action="newListTitle.length !== 0 ? 'criar' : null"
            :label="`${newListTitle.length}/30`"
            :maxLength="30"
            @actionClick="confirmListCreation"
          />
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import eventBus from '@/js/eventBus'

export default {
  name: 'add-to-list-modal',
  data: () => ({
    isModalOpen: false,
    activityId: null,
    selectedList: '',
    newListTitle: ''
  }),
  computed: {
    ...mapGetters({ lists: 'lists/getAll', getActivities: 'lists/getById' }),
    chooserOptions() {
      return this.lists.map(it => ({
        value: it,
        text: it,
        disabled: this.getActivities(it).includes(this.activityId)
      }))
    }
  },
  methods: {
    ...mapMutations({
      createList: 'lists/createList',
      addToList: 'lists/addToList'
    }),
    confirmListCreation() {
      this.createList(this.newListTitle)
    },
    async send() {
      this.addToList({ listId: this.selectedList, activityId: this.activityId })
      this.isModalOpen = false
    }
  },
  mounted() {
    eventBus.$on('open-list-modal', id => {
      this.isModalOpen = true
      this.activityId = id
    })
  }
}
</script>

<style lang="scss">
.add-to-list-modal {
  b {
    font-weight: bold;
  }

  .modal-content {
    > p {
      margin-bottom: 12px;
    }

    > label {
      display: block;
      font-weight: 500;
      margin-bottom: 8px;
    }

    > div {
      margin: 0 auto;
      max-width: 400px;
    }

    .vpo-input input {
      font-size: 0.9rem;
    }
  }
}
</style>
