import Swal from 'sweetalert2'
import { initSelection, selection } from './selection.js'
import { calendar } from './date.js'
import { write } from './write.js'

const month = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][new Date().getMonth()]

const opt = {
  title: `${month}月日志`,
  showCancelButton: true,
  cancelButtonColor: 'rgb(48, 133, 214)',
  confirmButtonColor: 'rgb(221, 51, 51)',
  cancelButtonText: '开始',
  confirmButtonText: '不写了',
  allowOutsideClick: false,
  width: '512px',
  onOpen: open,
  onClose: close,
  html: `
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
      <div style="font-size: 14px">单击选中日期，按住鼠标左键拖动多选，按住 Ctrl 单击多选，按住 Shift 单击连续多选</div>
      <div class="input-container" style="display: none;">
        <input class="note-input swal2-input" placeholder="你想记录什么呢？" type="text">

        </input>
        <i class="swal2-confirm swal2-styled">ok</i>
      </div>
    </div>
  `,
  input: 'textarea',
  inputPlaceholder: '在这里输入一条默认日志，将用于所有选中的日期，你也可以鼠标右击一个日期记录单独的日志',
  inputClass: 'note-textarea'
}

let defaultComment = ''

function open() {
  initSelection()

  //定义鼠标右击事件
  const els = document.querySelector('.selection-date')
  const inputEl = document.querySelector('.input-container')
  const ok = document.querySelector('.input-container i')
  const input = inputEl.firstElementChild
  let curClickELe
  renderCalendar(els, calendar)
  if (els) {
    els.oncontextmenu = e => e.preventDefault()
    els.onmousedown = e => {
      if (e.button == 2 || e.buttons == 2) {
        e.stopPropagation()
        let comment = e.target.getAttribute('title')
        if (comment) {
          input.value = comment
        } else if (defaultComment) {
          input.value = ''
          input.setAttribute('placeholder', defaultComment)
        } else {
          input.value = ''
        }
        inputEl.style.display = 'flex'
        setTimeout(() => {
          input.focus()
        }, 100);
        curClickELe = e.target
      }
    }
  }

  let saveInputComment = () => {
    inputEl.style.display = 'none'
    let comment = input.value
    curClickELe && (curClickELe.setAttribute('title', comment))
  }

  // 点击ok
  ok && (ok.onclick = saveInputComment)

  // input回车
  input.onkeyup = ({key}) => {
    key == 'Enter' && saveInputComment()
  }

  // textarea事件
  const textarea = document.querySelector('textarea.note-textarea')
  textarea && (textarea.oninput = () => defaultComment = textarea.value)
}

function close() {
  selection.destroy()
}

/**
 * @param {HTMLElement} el 
 */
function renderCalendar(el, {index, count, curDay}) {
  const children = el.children
  for(let i = index, j = 1; j <= count; i++) {
    let span = document.createElement('span')
    span.className = 'day-number'
    j == curDay && (span.style.cssText = 'color: #3085d6; font-weight: bold;')
    span.innerText = j++
    children[i].setAttribute('data-number', j - 1)
    children[i].appendChild(span)
  }
}

function getList() {
  const list = selection.getSelection()
  return list.map(el => {
    let comment = el.getAttribute('title') || defaultComment || '开发和修改BUG'
    let day = el.getAttribute('data-number')
    return {
      comment, day
    }
  })
}

function run() {
  write(getList(), calendar.Y, calendar.M)
}

export default function() {
  Swal.fire(opt)
    .then(result => {
      result.dismiss && run()
    })
}