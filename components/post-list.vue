<template>
  <li class="list-item">
    <div class="entry">
      <a :href="'http://fe.qiangdada.cn/entry/' + item.objectId" target="_blank" class="entry-link">
        <div class="content-box">
          <div class="info-box">
            <slot></slot>
          </div>
          <div class="thumb" v-show="item.screenshot">
            <img :src="handleImgSrc(item.screenshot)">
          </div>
        </div>
      </a>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleImgSrc (src) {
      return `${src}?imageView2/1/w/160/h/103`
    }
  }
}
</script>