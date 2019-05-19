(function() {
  console.log('note is runing')
  init()
})();

function $(select) {
  return document.querySelector(select)
}

function init() {
  // 添加补齐日志按钮
  const list = $('#log-work')
  const li = document.createElement('li')
  li.className = 'aui-list-item'
  li.innerHTML = `<a id="auto-note" class="aui-list-item-link " title="补齐日志" href="javascript:void(0)">补齐日志</a>`
  list.parentElement.parentElement.appendChild(li)
  li.addEventListener('click', handle)

  // 提示
  // const tip = document.createElement('div')
  // div.id = 'noteLogs'
  // div.innerHTML = ``
}

function handle() {
  const comment = confirm('输入一条日志')
  const ds = prompt('请输入补写日期（example: 1,2,3,23）:')
  write(comment, ...ds.match(/\d+/g))
}

function write(commit, ...ds) {
  let $ = select => document.querySelector(select)
  let atl_token = $('#atlassian-token').getAttribute('content')
  let id = parseInt($('#edit-issue').search.match(/\d+/)[0])
  let days = () => {
    let M = ['一','二','三','四','五','六','七','八','九','十','十一','十二'][new Date().getMonth()] + '月'
    let Y = 19
    return ds.map(day => `${day}/${M}/${Y} 09:00 上午`)
  }
  days = days()
  let submit = (atl_token, id, startDate) => {
    let params = {
      inline: true,
      decorator: 'dialog',
      atl_token,
      worklogId: '',
      id,
      timeLogged: '8h',
      startDate,
      adjustEstimate: 'auto',
      comment: comment || '解决bug',
      commentLevel: ''
    }
    fetch('http://jira.up366.com:8080/secure/CreateWorklog.jspa', {
      method: 'POST',
      headers: {
        'Accept': 'text/html, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(params).toString()
    })
      .then(() => console.log(`已添加${startDate}日工作日志`))
      .catch(() => console.log(`${startDate}日添加失败`))
  }
  let i = 0;
  let interval = setInterval(() => {
    submit(atl_token, id, days[i++])
    if (i == days.length)
      clearInterval(interval)
  }, 3000)
}