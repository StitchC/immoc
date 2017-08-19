<template>
    <span class="seller-icon-template" v-bind:class="[iconTypeClass,iconSizeClass]"></span>
</template>

<script type="text/ecmascript-6">
  export default{
    data: function() {
      return {
        sellerIconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        iconTypeClass: '',
        iconSizeClass: ''
      };
    },
    props: {
      iconType: {
        type: Number
      },
      iconSize: {
        type: Number
      }
    },
    created: function() {
      this.iconTypeClass = this.sellerIconMap[this.iconType];
      this.iconSizeClass = this.iconTypeClass + '_' + this.iconSize;
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .seller-icon-template
    display: inline-block
    background-repeat: no-repeat
    &.decrease.decrease_1
      icon-size("decrease_1")
    &.decrease.decrease_2
      icon-size("decrease_2")
    &.decrease.decrease_3
      icon-size("decrease_3")
    &.discount.discount_1
      icon-size("discount_1")
    &.discount.discount_2
      icon-size("discount_2")
    &.discount.discount_3
      icon-size("discount_3")
    &.special.special_1
      icon-size("special_1")
    &.special.special_2
      icon-size("special_2")
    &.special.special_3
      icon-size("special_3")
    &.invoice.invoice_1
      icon-size("invoice_1")
    &.invoice.invoice_2
      icon-size("invoice_2")
    &.invoice.invoice_3
      icon-size("invoice_3")
    &.guarantee.guarantee_1
      icon-size("guarantee_1")
    &.guarantee.guarantee_2
      icon-size("guarantee_2")
    &.guarantee.guarantee_3
      icon-size("guarantee_3")
</style>
