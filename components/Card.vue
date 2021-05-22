<template>
  <div class="donates-container">
    <div class="donates__title">
      <span class="donates__author"> Александр </span>
      <div class="donates__time">5 мин</div>
    </div>
    <div class="donates__price">
      <div class="price price-level_1" donate-level="#FF4E1D">20 000 ฿</div>
      <div class="price price-level_2" donate-level="#CEAD21">5 000 ₽</div>
      <div class="price price-level_3" donate-level="#B237C8">1 000 ₽</div>
      <div class="price price-level_4" donate-level="#4993BA">600 ₽</div>
      <div class="price price-level_5" donate-level="#EDEDED/#29363F">
        599 ₽
      </div>
    </div>
    <div class="donates__text">
      <p>
        Подскажите, стоит ли вложить финансы в лайткоин, в биткоин вкладывать
        сейчас немного опасно, или какая крипта помимо биткоина, а также какие
        есть популярные площадки для обмена, которым можно доверять? п.с.
        Спасибо за творчество!
      </p>
    </div>
    <div class="move-to-hide-show">
      <span class="to-show">Не скрывать</span
      ><span class="to-hide">Скрыть</span>
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

<style scoped></style>
