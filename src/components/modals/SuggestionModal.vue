<template>
  <div class="suggestion-modal">
    <vpo-button :dark="!outlined" :outlined="outlined" text="mandar uma ação" @click="isModalOpen = true" />
    <modal v-model="isModalOpen" title="mandar uma ação" action="enviar" :isActionLoading="$store.state.feedback.sending" @confirm="send">
      <div class="modal-content">
        <p>
          <b>Sentiu falta de alguma coisa?</b> Se sabe de algo que vai acontecer, ou se promove alguma ação,
          conteúdo, evento ou produto que pode facilitar a quarentena de outras pessoas, é só mandar aqui que
          colocamos no site! (Todos os campos são obrigatórios)
        </p>
        <p>
          Tipo de ação
          <span>Escolha o tipo que mais se encaixa</span>
        </p>
        <chooser v-model="suggestion.type" :options="chooserOptions" />
        <vpo-input v-model="suggestion.title" placeholder="Título da ação" />
        <vpo-input v-model="suggestion.brand" placeholder="Responsável pela ação" label="Nome da pessoa, grupo, coletivo ou marca promovendo a ação" />
        <vpo-input v-model="suggestion.link" placeholder="Link de acesso" label="Como fazemos para acessar a ação?" />
        <vpo-input v-model="suggestion.description" placeholder="Descrição" />
        <vpo-input v-model="suggestion.validUntil" placeholder="Ação válida até" label="Em caso de festival, colocar o último dia" optional />
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'suggestion-modal',
  props: {
    outlined: Boolean
  },
  data: () => ({
    isModalOpen: false,
    suggestion: {
      type: 'learn',
      title: '',
      brand: '',
      link: '',
      description: '',
      validUntil: ''
    }
  }),
  computed: {
    chooserOptions() {
      return [
        {
          value: 'learn',
          text: 'Aprender',
          label: 'Sugestões de cursos, palestras ou mentorias disponíveis gratuitamente',
          type: 'learn'
        }, {
          value: 'participate',
          text: 'Participar',
          label: 'Lives, congressos, festivais, shows… mas tem que ser online, hein?',
          type: 'participate'
        }, {
          value: 'do',
          text: 'Fazer',
          label: 'Sugestões de atividades e brincadeiras, apps liberados de graça',
          type: 'do'
        }, {
          value: 'share',
          text: 'Compartilhar',
          label: 'Sites informativos, canais do YouTube, perfil do instagram, blogs...',
          type: 'share'
        }
      ]
    }
  },
  methods: {
    ...mapActions({ sendSuggestion: 'feedback/sendSuggestion' }),
    async send() {
      try {
        await this.sendSuggestion(this.suggestion)
      } catch {}

      this.isModalOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.suggestion-modal .modal-content {
  b {
    font-weight: bold;
  }

  & > p:not(:first-child) {
    margin-top: 8px;
    margin-bottom: 2px;
    font-weight: 500;

    & > span {
      display: block;
      font-size: 9px;
      font-weight: normal;
    }
  }

  & > .chooser {
    margin-bottom: 16px;
  }

  @include breakpoint('extra-small') {
    & > p:not(:first-child) {
      margin-top: 10px;

      & > span {
        font-size: 11px;
      }
    }
  }

  @include breakpoint('small') {
    & > p:not(:first-child) {
      margin-bottom: 4px;

      & > span {
        font-size: 12px;
      }
    }
  }
}
</style>
