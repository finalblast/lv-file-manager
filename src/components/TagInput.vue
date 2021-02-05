<template>
  <div class="tag-input">
    <div v-for="(tag, index) in tags" :key="tag" class="tag-input__tag">
      {{ tag }}
      <span @click="removeTag(index)">x</span>
    </div>
    <div class="autocomplete">
      <input type="text" placeholder="Enter a Tag" class="tag-input__text" @click="onClick" @input="onChange" @keydown.enter="addTag" @keydown.188="addTag" @keydown.delete="removeLastTag" v-model="search" />
      <ul v-show="isOpen" class="autocomplete-results">
        <li v-for="(result, i) in results" :key="i" class="autocomplete-result" @click="setResult(result.name)">
          {{ result.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import manager from './../mixins/manager';

export default {
  name: 'tag-input',
  mixins: [manager],
  props: {
    tags: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      results: [],
      search: '',
      isOpen: false
    }
  },

  mounted() {

  },
  methods: {
    addTag(event) {
      event.preventDefault()
      var val = this.search.trim()
      if (val.length > 0 && this.tags.indexOf(val) === -1) {
        this.tags.push(val)
        this.search = ''
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1)
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1)
      }
    },
    onChange() {
      if (this.search == '') {
        this.isOpen = false
        return;
      }
      this.results = this.existingTags.filter(item => item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      this.isOpen = this.results.length
    },
    setResult(result) {
      if (result.length > 0 && this.tags.indexOf(result) === -1) {
        this.tags.push(result)
        this.search = ''
      }
    },
    onClick() {
      this.isOpen = false
    }
  }
}
</script>
<style scoped>
.tag-input {
  width: 100%;
  font-size: 0.9em;
  height: 40px;
  box-sizing: border-box;
}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #ddd;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input__tag > span {
  cursor: pointer;
}

.tag-input__text {
  border: none;
  outline: none;
  height: 30px;
  margin-top: 10px;
  line-height: 40px;
  background: none;
  float: left;
}
.autocomplete {
  position: relative;
  z-index: 100;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  top: 5px;
  position: relative;
  background: #ddd;
  max-height: 120px;
  overflow-y: scroll;
  width: 100%;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 5px 10px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #ccc;
}
</style>