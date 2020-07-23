<template>
  <div class="add-to-list-modal">
    <list-add-button @click.prevent="isModalOpen = true" :id="activityId" />
    <modal
      v-model="isModalOpen"
      title="adicionar à lista"
      action="adicionar"
      :isActionLoading="$store.state.feedback.sending"
      @confirm="send"
      @click.prevent
    >
      <div class="modal-content">
        <p>
          <b>Adicione essa ação a uma lista para mais tarde?</b> As listas ficam
          salvas e podem ser compartilhadas com outras pessoas!
        </p>
        <label>Selecionar lista</label>
        <div>
          <chooser v-model="selectedList" v-if="chooserOptions.length > 0" :options="chooserOptions" />
          <p v-else>Você não tem nenhuma lista! Deseja criar uma?</p>
          <vpo-input v-model="newListTitle" placeholder="Nome da nova lista" />
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'add-to-list-modal',
  props: {
    activityId: String
  },
  data: () => ({
    isModalOpen: false,
    selectedList: '',
    newListTitle: ''
  }),
  computed: {
    ...mapGetters({ lists: 'lists/getAll' }),
    chooserOptions() {
      return this.lists.map(it => ({ value: it, text: it }))
    }
  },
  methods: {
    async send() {
      this.isModalOpen = false
    }
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
      margin-bottom: 4px;
    }

    > div {
      margin: 0 auto;
      max-width: 400px;
    }
  }
}
</style>
