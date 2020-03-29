<template>
  <div class="open-dropdown-icon">
    <svg class="open-dropdown-icon__desktop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.598 4.837">
      <path d="M392.6,640.537a.516.516,0,0,1-.16.378l-3.762,3.762a.527.527,0,0,1-.756,0l-3.762-3.762a.537.537,0,0,1,.378-.915h7.524a.545.545,0,0,1,.537.537Z" transform="translate(-384 -640)"/>
    </svg>
    <svg class="open-dropdown-icon__mobile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.4 12">
      <g transform="translate(49.9 -11)">
        <g transform="translate(-260 -90)">
          <g transform="translate(260.5 90)">
            <path d="M1,0-.4,1.4,4.2,6-.4,10.6,1,12,7,6Z" transform="translate(-50 11)" fill-rule="evenodd" />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'open-dropdown-icon'
}
</script>

<style lang="scss" scoped>
.open-dropdown-icon {
  & > svg {
    width: inherit;
    height: inherit;
  }

  &__desktop {
    display: block;
  }

  &__mobile {
    display: none;
  }

  @media screen and (max-width: 654px) {
    &__desktop {
      display: none;
    }

    &__mobile {
      display: block;
    }
  }
}
</style>
