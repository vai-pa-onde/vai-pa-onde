<template>
  <div class="drawer-content">
    <h1 v-if="typeName" @click="resetNavigation">
      <navigation-icon />
      {{ typeName }}
    </h1>
    <h1 v-else>Categorias</h1>
    <div class="drawer-content__pagination">
      <transition :name="transitionName">
        <div key="main"  class="drawer-content__pagination__page drawer-content__pagination__page--main" v-if="!currentType">
          <vpo-button @click="view('about')" dark outlined text="sobre" />
          <favorites-button @click.native="$emit('closeDrawer')"/>
          <div class="drawer-content__pagination__page__navigators">
            <navigation-button v-for="{ id, name } in types" :key="id" :type="id" :text="name" @click="changeTypeNavigation(id)" />
            <navigation-button text="Tudo" @click="viewAll" />
          </div>
          <suggestion-modal drawer />
        </div>
        <div :key="currentType" class="drawer-content__pagination__page" v-else>
          <div class="drawer-content__pagination__page__navigators">
            <navigation-button
              :key="id"
              v-for="{ id, name } in subtypes"
              :type="currentType"
              :text="name"
              @click="changeSubtypeNavigation(id)"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import subtypes from '@/js/subtypes'
import subtypeName from '@/js/subtypeName'
import typeName from '@/js/typeName'

export default {
  name: 'drawer-content',
  props: {
    isDrawerOpen: Boolean
  },
  data: () => ({
    currentType: null,
    transitionName: 'slide-right'
  }),
  watch: {
    isDrawerOpen: 'waitToClose'
  },
  computed: {
    types() {
      return Object.entries(typeName).map(it => ({ id: it[0], name: it[1] }))
    },
    subtypes() {
      return subtypes.map(subtype => ({ id: subtype, name: subtypeName[subtype] }))
    },
    typeName() {
      return typeName[this.currentType]
    }
  },
  methods: {
    viewAll() {
      this.$router.push({ name: 'all-activities' })
      this.$emit('closeDrawer')
    },
    view(name) {
      this.$router.push({ name })
      this.$emit('closeDrawer')
    },
    changeTypeNavigation(type) {
      this.transitionName = 'slide-right'
      this.currentType = type
    },
    changeSubtypeNavigation(subtype) {
      if (subtype === 'all') {
        this.$router.push({ name: 'type-filter', params: { type: this.currentType } })
      } else {
        this.$router.push({ name: 'subtype-filter', params: { type: this.currentType, subtype } })
      }

      this.$emit('closeDrawer')
    },
    resetNavigation() {
      this.transitionName = 'slide-left'
      this.currentType = null
    },
    waitToClose() {
      setTimeout(this.resetNavigation, 50)
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-content {
  display: flex;
  flex-direction: column;
  min-width: 225px;
  max-width: 225px;
  overflow: hidden;

  & > h1 {
    position: relative;
    background-color: black;
    color: white;
    width: 100%;
    padding: 16px 24px;
    text-align: center;
    text-transform: uppercase;
    font: {
      family: 'Play';
      size: 18px;
      weight: bold;
    }

    & > .navigation-icon {
      position: absolute;
      left: 12px;
      top: 0;
      height: 100%;
      fill: white;
      transform: scaleX(-1);
      margin: 0;
    }
  }

  &__pagination {
    display: flex;

    &__page {
      display: flex;
      flex-direction: column;
      transition: opacity .3s ease-in-out, margin .3s ease-in-out;
      min-width: 100%;
      max-width: 100%;
      order: 2;

      &.slide-right-leave-to, &.slide-left-enter {
        margin-left: -100%;
        opacity: 0;
      }

      &.slide-left-leave-to, &.slide-right-enter {
        opacity: 0;
      }

      .navigation-button {
        -webkit-tap-highlight-color: transparent;
        padding: 10px 14px;
      }

      &--main {
        order: 1;

        & > .button, & > .suggestion-modal {
          margin: 16px 28px;

          &:first-child:not(:last-child) {
            margin-bottom: 0;
          }
        }

        .navigation-button {
          padding: 6px 14px;
          margin: 8px 0;
        }
      }
    }
  }
}
</style>
