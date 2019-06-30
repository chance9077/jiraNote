function firstDay() {
  const time = new Date()
  const curMonth = time.getMonth() + 1
  const curYear = time.getFullYear()
  const calendar = new Date(`${curYear}-${curMonth}-1`)
  const firstDay = calendar.getDay()
  const index = [1, 2, 3, 4, 5, 6, 0].indexOf(firstDay)
  return index
}

const daysCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][new Date().getMonth()]

export const calendar = {
  index: firstDay(),
  count: daysCount,
  curDay: new Date().getDate()
}