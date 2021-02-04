<template>
  <div class="fm-tag-list">
    <span v-for="(tag, index) in tags" :key="index" v-on:click.prevent="selectTagState(tag.name, index)" class="badge badge-pill" :class="{ 'badge-info': tag.active }">{{ tag.name }}</span>
  </div>
</template>

<script>
import manager from './../mixins/manager';

import GET from './../http/get-queries';

export default {
  name: 'Tag',
  mixins: [manager],
  props: {
    manager: { type: String, required: true },
  },
  data() {
    return {
      tags: []
    };
  },
  computed: {

  },
  mounted() {
    this.getTags()
  },
  methods: {
    getTags() {
      GET.tags().then((response) => {
        this.tags = response.data
        this.$store.commit('fm/setExistingTags', this.tags);
      })
    },

    selectTagState(tag, index) {
      let tagInstance = this.tags[index]
      tagInstance.active = !tagInstance.active
      this.tags.splice(index, 1, tagInstance)
      this.selectTag()
    }
  },
};
</script>

<style lang="scss">
  .fm-tag-list {
    span {
      cursor: pointer;
    }
  }
</style>
