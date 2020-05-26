<template>
  <div class="report-modal">
    <vpo-button text="reportar" outlined error @click="isModalOpen = true" />
    <modal v-model="isModalOpen" error title="reportar ação" action="reportar" :isActionLoading="$store.state.feedback.sending" @confirm="send">
      <div class="modal-content">
        <p>
          <b>Tem algo errado com essa ação?</b> O link tá quebrado, a ação vencida, não
          está gratuito de verdade ou viu algum outro problema? Ajuda a gente a identificar!
        </p>
        <div>
          <p>O que está errado?</p>
          <chooser v-model="report.type" :options="chooserOptions" />
        </div>
        <vpo-input
          v-model="report.description"
          :class="report.type === 'other' ? 'open' : ''"
          placeholder="Descreva o problema para nós :)"
        />
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'report-modal',
  data: () => ({
    isModalOpen: false,
    report: {
      type: '',
      description: ''
    }
  }),
  computed: {
    chooserOptions() {
      return [
        {
          value: 'broken_link',
          text: 'Link quebrado',
          type: 'share'
        }, {
          value: 'expired',
          text: 'Ação vencida',
          type: 'share'
        }, {
          value: 'there_is_no_free_lunch',
          text: 'Ação não gratuita',
          type: 'share'
        }, {
          value: 'other',
          text: 'Outro motivo',
          type: 'share'
        }
      ]
    }
  },
  methods: {
    ...mapActions({ sendReport: 'feedback/sendReport' }),
    async send() {
      try {
        if (this.report.type !== 'other') {
          this.report.description = ''
        }

        await this.sendReport({ id: this.$route.params.id, ...this.report })
      } catch {}

      this.isModalOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.report-modal {
  & > button {
    width: 100%;
  }

  .modal-content {
    font-size: 18px;

    b {
      font-weight: bold;
    }

    & > .chooser {
      margin-bottom: 16px;
    }

    & > div {
      width: min-content;
      margin: 16px auto 0 auto;

      & > p {
        margin-bottom: 6px;
      }
    }

    & > .vpo-input {
      width: 100%;
      height: 0;
      transition: height .2s;
      overflow: hidden;

      &.open {
        height: 50px;
      }
    }
  }
}
</style>
