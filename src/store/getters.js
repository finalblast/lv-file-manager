export default {
  /**
   * Selected disk for active manager
   * @param state
   * @returns {selectedDisk|null|*|computed.selectedDisk}
   */
  selectedDisk(state) {
    return state[state.activeManager].selectedDisk;
  },

  /**
   * Selected directory for active manager
   * @param state
   * @returns {selectedDirectory|computed.selectedDirectory|string|*}
   */
  selectedDirectory(state) {
    return state[state.activeManager].selectedDirectory;
  },

  /**
   * List of selected files and folders for the active manager
   * @param state
   * @param getters
   * @returns {*}
   */
  selectedItems(state, getters) {
    return getters[`${state.activeManager}/selectedList`];
  },

  /**
   * Inactive manager name
   * @param state
   * @returns {string}
   */
  inactiveManager(state) {
    return state.activeManager === 'left' ? 'right' : 'left';
  },

  /**
   * Get navbar visibility
   * @param state
   * @returns {boolean}
   */
  navbarVisibility(state) {
    return state.navbarVisibility;
  },

  /**
   * Get Selection Type
   * @param state
   * @returns {string}
   */
  selectionType(state) {
    return state.selectionType;
  }
};
