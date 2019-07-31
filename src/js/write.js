let cur = 0, count = 0

function $(select) {
  return document.querySelector(select)
}

function init() {
  const tip = document.createElement('div')
  tip.className = 'add-note-tip hide'
  tip.innerHTML = `<i class="add-loading"></i>已经添加 <span id="tip-cur">0</span> 条日志，共 <span id="tip-count">0</span> 条日志`
  document.body.appendChild(tip)
}

function setValue(select, value) {
  $(select).innerHTML = value
}

function toggleTip() {
  const el = $('.add-note-tip')
  if (el.classList.contains('hide')) {
    el.classList.replace('hide', 'show')
  } else {
    el.classList.replace('show', 'hide')
  }
}

function tip() {
  const el = $('.add-note-tip')
  if (el.classList.contains('hide'))
    toggleTip()
  setValue('#tip-count', count)
  return function(cur) {
    setValue('#tip-cur', cur)
  }
}

export function write(data, Y, M) {
  init()
  count = data.length || 0

  const notify = tip()
  const atl_token = $('#atlassian-token').getAttribute('content')
  const id = parseInt($('#edit-issue').search.match(/\d+/)[0])
  const days = data.map(val => `${val.day}/${M}/${Y} 09:00 上午`)

  const submit = (comment, startDate) => {
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
        .then(() => {
          notify(++cur)
          console.log(`已添加${startDate}日工作日志`)
        })
        .catch(() => console.log(`${startDate}日添加失败`))
  }
  let i = 0
  let interval = setInterval(() => {
    submit(data[i].comment, days[i++])
    if (i == days.length) {
      clearInterval(interval)
      setTimeout(() => {
        location.search = '?page=com.atlassian.jira.plugin.system.issuetabpanels:worklog-tabpanel'
      }, 800)
    }
  }, 3000);
}