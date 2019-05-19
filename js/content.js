(function() {
  let canNotification = false

  let cur = 0, count = 0

  init()

  /**
   * @method
   * @param {String} select 
   * @return {HTMLElement}
   */
  function $(select) {
    return document.querySelector(select)
  }

  function toggleTip() {
    const el = $('.add-note-tip')
    if (el.classList.contains('hide')) {
      el.classList.replace('hide', 'show')
    } else {
      el.classList.replace('show', 'hide')
    }
  }

  /**
   * @method 给dom设置值
   * @param {String} select 
   * @param {Number} value 
   */
  function setValue(select, value) {
    $(select).innerHTML = value
  }


  
  function init() {
    // 获取通知权限
    if (Notification.permission === 'denied' || Notification.permission === 'default') {
      Notification.requestPermission()
        .then(p => {
          if (p === 'granted') {
            canNotification = true
          } else {
            canNotification = false
          }
        })
    } else {
      canNotification = true
    }

    // 添加补齐日志按钮
    const list = $('#log-work')
    const li = document.createElement('li')
    li.className = 'aui-list-item'
    li.innerHTML = `<a id="auto-note" class="aui-list-item-link " title="补齐日志" href="javascript:void(0)">补齐日志</a>`
    list.parentElement.parentElement.appendChild(li)
    li.addEventListener('click', handle)

    // 添加日志提示如果没有通知权限
    if (!canNotification) {
      const tip = document.createElement('div')
      tip.className = 'add-note-tip hide'
      tip.innerHTML = `已经添加 <span id="tip-cur">0</span> 条日志，共 <span id="tip-count">0</span> 条日志`
      document.body.appendChild(tip) 
    }
  }
  
  // 添加日志执行器
  function handle() {
    const comment = prompt('输入一条日志')
    const ds = prompt('请输入补写日期（example: 1,2,3,23）:')
    if (comment && ds) {
      const days = ds.match(/\d+/g)
      count = days.length
      write(comment, ...days)
    } else {
      alert('参数错误')
    }
  }
  
  function tip() {
    if (canNotification) {
      return cur => new Notification(`已添加 ${cur} 条工作日志，共 ${count} 条`)
    } else {
      const el = $('.add-note-tip')
      if (el.classList.contains('hide'))
        toggleTip()
      setValue('#tip-count', count)
      return function(cur) {
        setValue('#tip-cur', cur)
      }
    }
  }

  // 请求接口
  function write(commit, ...ds) {
    // 获取提示接口
    const notify = tip()
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
        .then(() => {
          notify(++cur)
          console.log(`已添加${startDate}日工作日志`)
        })
        .catch(() => console.log(`${startDate}日添加失败`))
    }
    let i = 0;
    let interval = setInterval(() => {
      submit(atl_token, id, days[i++])
      if (i == days.length) {
        clearInterval(interval)
        cur = 0
        count = 0
      }
    }, 3000)
  }
})();