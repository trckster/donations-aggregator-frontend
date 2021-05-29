<template>
  <div class="card-with-comment">
    <div v-show="donation.admin_comment || false" class="admin-comment">
      {{ donation.admin_comment }}
    </div>
    <div class="donates-container">
      <div class="donates__title">
        <span class="donates__author"> {{ donation.from }} </span>
        <div class="donates__time">{{ donation.paid_at }}</div>
        <!-- TODO change paid_at to time passed since this second -->
      </div>
      <PriceBadge :value="donation.amount" />
      <div class="donates__text">
        <p>
          {{ donation.text }}
        </p>
      </div>
      <div class="move-to-hide-show">
        <span :class="isHiddenClass">
          {{ donation.is_hidden ? 'Не скрывать' : 'Скрыть' }}
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
  computed: {
    isHiddenClass() {
      return {
        'to-show': this.donation.is_hidden,
        'to-hide': !this.donation.is_hidden,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card-with-comment {
  margin: 2em;
}
.admin-comment {
  text-align: center;
}

.donates-container .move-to-hide-show {
  position: absolute;
  top: 5px;
  right: 5px;
  display: inline-block;
  padding: 16px;
  background-color: white;
  opacity: 0;
  -webkit-transition: opacity 100ms;
  -o-transition: opacity 100ms;
  transition: opacity 100ms;
}

.donates-container:hover .move-to-hide-show {
  opacity: 1;
}

.move-to-hide-show span {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #b73f3f;
  width: 100%;
  display: inline-block;
  padding-left: 22px;
  cursor: pointer;
  box-sizing: border-box;
}

.move-to-hide-show:hover span {
  color: #ff1f1f;
}

.to-hide {
  background: url('@/assets/images/archive.svg') no-repeat center left
    transparent;
}

.move-to-hide-show:hover .to-hide {
  background: url('@/assets/images/archive-highlight.svg') no-repeat center left
    transparent;
}

.to-show {
  background: url('@/assets/images/unarchive.svg') no-repeat center left
    transparent;
}

.move-to-hide-show:hover .to-show {
  background: url('@/assets/images/unarchive-highlight.svg') no-repeat center
    left transparent;
}
</style>
