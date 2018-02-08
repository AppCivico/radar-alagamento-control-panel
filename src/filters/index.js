const urlParser = document.createElement('a')

export function domain (url) {
  urlParser.href = url
  return urlParser.hostname
}

export function count (arr) {
  return arr.length
}

export function prettyDate (date) {
  var a = new Date(date)
  return a.toDateString()
}

export function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }

  return time + label + 's'
}

export function formatDate (date) {
  if (date) {
    return date
      .split(' ')[0]
      .split('-')
      .reverse()
      .join('/')
  }

  return date
}

export function validate (data) {
  const validation = {
    status: false,
    errors: {}
  }

  Object.keys(data).map((item) => {
    if (data[item] === '') {
      validation.errors[item] = 'Campo obrigatório'
    }
    if (Array.isArray(data[item]) && data[item].length < 1) {
      validation.errors[item] = 'Campo obrigatório'
    }
  })

  if (Object.keys(validation.errors).length < 1) {
    validation.status = true
  }

  return validation
};
