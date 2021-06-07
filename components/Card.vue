<template>
  <div class="card-with-comment">
    <div
      class="donates-between-container"
      :class="{
        'with-text': currentComment,
        'active-input': isActiveComment,
      }"
      @click="toggleActive"
    >
      <div v-if="isActiveComment">
        <textarea-autosize
          ref="inputComment"
          :value="currentComment"
          class="input-box"
          maxlength="1000"
          min-height="24"
          rows="1"
          aria-multiline="true"
          @blur.native="changeAdminComment"
          @keyup.enter.native="changeAdminComment"
          @keydown.enter.native="preventDefault"
        />
      </div>
      <div v-else class="text-wrap">
        {{ currentComment }}
      </div>
    </div>
    <div class="donates-container">
      <div class="donates__title">
        <span class="donates__author"> {{ donation.from }} </span>
        <div class="donates__time">{{ donation.paidAt.fromNow() }}</div>
      </div>
      <PriceBadge :value="donation.amount" />
      <div class="donates__text">
        <p>
          {{ donation.text }}
        </p>
      </div>
      <div
        class="move-to-hide-show"
        :class="{
          'move-to-hide-show-mobile': $device.isMobileOrTablet,
        }"
        @click="changeIsHidden"
      >
        <span :class="isHiddenClass">
          {{ donation.isHidden ? 'Не скрывать' : 'Скрыть' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    donation: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isActiveComment: false,
      // TODO: Ask whether comment in data is better than donation state
      currentComment: this.donation.adminComment,
    }
  },
  computed: {
    isHiddenClass() {
      return {
        'to-show': this.donation.isHidden,
        'to-hide': !this.donation.isHidden,
      }
    },
  },
  methods: {
    changeIsHidden() {
      this.$store.dispatch('updateHidden', {
        id: this.donation.id,
        isHidden: !this.donation.isHidden,
      })
    },
    changeAdminComment(event) {
      if (this.currentComment !== event.target.value) {
        this.currentComment = event.target.value
        this.$store.dispatch('updateComment', {
          id: this.donation.id,
          adminComment: this.currentComment,
        })
      }
      this.isActiveComment = false
    },
    toggleActive() {
      this.isActiveComment = true
      this.$nextTick(() => {
        if (this.$refs.inputComment) {
          this.$refs.inputComment.$el.focus()
        }
      })
    },
    preventDefault(event) {
      event.preventDefault()
    },
  },
}
</script>
