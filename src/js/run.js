import Swal from 'sweetalert2'
import { init, selection } from './selection.js'

const opt = {
  title: `<h3>写日志</h3>`,
  showCancelButton: true,
  cancelButtonColor: 'rgb(48, 133, 214)',
  confirmButtonColor: 'rgb(221, 51, 51)',
  cancelButtonText: '开始',
  confirmButtonText: '不写了',
  onOpen: init,
  onClose: close,
  html: `
    <div class="note-main">
      <div class="date-header">
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
        <div>日</div>
      </div>
      <div class="selection-date">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      </div>
    </div>
  `
}

function run() {
  console.log('begin')
}

function close() {
  selection.destroy()
}

export default function() {

  Swal.fire(opt)
    .then(result => {
      result.dismiss && run()
    })
}