import './styles/note.css'
import run from './js/run.js'

const list = document.querySelector('#log-work')
const li = document.createElement('li')
li.className = 'aui-list-item'
li.id = 'write-note'
li.innerHTML = `<a id="auto-note" class="aui-list-item-link " title="补写日志" href="javascript:void(0)">补写日志</a>`
list.parentElement.parentElement.appendChild(li)

li.onclick = run






