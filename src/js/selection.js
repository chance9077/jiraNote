import Selection from '@simonwep/selection-js'

export let selection

export function init() {
  // console.log(document.querySelector('.selection-date'))
  selection = Selection.create({
    class: 'selection',
    selectables: ['.selection-date > div'],
    boundaries: ['.selection-date'],
    selectionAreaContainer: '.swal2-content',

    onSelect({
      target,
      originalEvent,
      selectedElements
    }) {

      const selected = target.classList.contains('selected');
      if (!originalEvent.ctrlKey && !originalEvent.metaKey) {

        for (const el of selectedElements) {
          el.classList.remove('selected');
        }
        this.clearSelection();
      }

      if (!selected) {
        target.classList.add('selected');
        this.keepSelection();
      } else {
        target.classList.remove('selected');
        this.removeFromSelection(target);
      }
    },

    onStart({
      selectedElements,
      originalEvent
    }) {
      if (!originalEvent.ctrlKey && !originalEvent.metaKey) {
        for (const el of selectedElements) {
          el.classList.remove('selected');
        }
        this.clearSelection();
      }
    },

    onMove({
      selectedElements,
      changedElements: {
        removed
      }
    }) {
      for (const el of selectedElements) {
        el.classList.add('selected');
      }
      for (const el of removed) {
        el.classList.remove('selected');
      }
    },

    onStop() {
      this.keepSelection();
    }
  })
}