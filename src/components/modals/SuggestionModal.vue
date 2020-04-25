<template>
  <div class="suggestion-modal">
    <vpo-button :dark="!outlined" :outlined="outlined" text="mandar uma ação" @click="isModalOpen = true" />
    <modal v-model="isModalOpen" title="mandar uma ação" action="enviar">
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
        <chooser v-model="type" :options="chooserOptions" />
        <vpo-input placeholder="Título da ação" />
        <vpo-input placeholder="Responsável pela ação" label="Nome da pessoa, grupo, coletivo ou marca promovendo a ação" />
        <vpo-input placeholder="Link de acesso" label="Como fazemos para acessar a ação?" />
        <vpo-input placeholder="Descrição" />
        <vpo-input placeholder="Ação válida até" label="Em caso de festival, colocar o último dia" optional />
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'suggestion-modal',
  props: {
    outlined: Boolean
  },
  data: () => ({
    isModalOpen: false,
    type: 'learn'
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
