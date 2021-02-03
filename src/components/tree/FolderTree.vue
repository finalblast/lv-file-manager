<template>
    <div class="fm-tree">
        <div class="fm-tree-disk sticky-top">
            <i class="far fa-hdd"></i> {{ selectedDisk }}
        </div>
        <branch v-bind:parent-id="0"></branch>
        <tag v-bind:manager="manager"></tag>
    </div>
</template>

<script>
import Branch from './Branch';
import Tag from './../Tag';

export default {
  name: 'FolderTree',
  props: {
    manager: { type: String, required: true },
  },
  components: {
    branch: Branch,
    tag: Tag
  },
  computed: {
    // Selected Disk
    selectedDisk() {
      return this.$store.getters['fm/selectedDisk'];
    },
  },
};
</script>

<style lang="scss">
    .fm-tree {
        overflow: auto;
        border-right: 1px solid #6d757d;

        & > .fm-folders-tree {
            padding-left: 0.2rem;
        }

        .fm-tree-disk {
            padding: 0.2rem 0.3rem;
            margin-bottom: 0.3rem;
            background-color: white;
        }

        .fm-tree-disk > i {
            padding-left: 0.2rem;
            padding-right: 0.5rem;
        }
    }
</style>
