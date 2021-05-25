<template>
  <div class="donates__price">
    <div :class="priceClass">{{ amount }} ₽</div>
  </div>
</template>

<script>
export default {
  name: 'PriceBadge',
  props: {
    value: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      priceLevels: [20000, 5000, 1000, 600, 0],
    }
  },
  computed: {
    amount() {
      return this.value / 100
    },
    priceClass() {
      const level =
        this.priceLevels.findIndex((price) => this.amount >= price) + 1
      const cssClasses = {
        price: true,
      }

      cssClasses[`price-level_${level}`] = true

      return cssClasses
    },
  },
}
</script>
