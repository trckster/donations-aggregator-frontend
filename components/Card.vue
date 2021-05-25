<template>
  <div class="donates-container">
    <div class="donates__title">
      <span class="donates__author"> {{ donation.from }} </span>
      <div class="donates__time">{{ donation.paid_at }}</div>
      <!-- TODO change paid_at to time passed since this second -->
    </div>
    <PriceBadge :value="donation.amount" />
    <div class="donates__text">
      <p>
        {{ donation.comment }}
      </p>
    </div>
    <div class="move-to-hide-show">
      <span class="to-show">Не скрывать</span>
      <span class="to-hide">Скрыть</span>
      <!-- TODO make it work -->
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
}
</script>
