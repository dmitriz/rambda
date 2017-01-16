const R = require("./_inc/compose")

const add = (a, b) => {
  if (b === undefined) {
    return c => add(a, c)
  }

  return a + b
}

const adjust = (fn, index, arr) => {
  if (index === undefined) {
    return (indexHolder, arrHolder) => adjust(fn, indexHolder, arrHolder)
  } else if (arr === undefined) {
    return holder => adjust(fn, index, holder)
  }

  return arr.map((val, key) => {
    if (key === index) {
      return fn(arr[ index ])
    }

    return val
  })
}

const any = (fn, arr) => {
  if (arr === undefined) {
    return holder => any(fn, holder)
  }

  let flag = false
  arr.map(val => {
    if (fn(val) === true) {
      flag = true
    }
  })

  return flag
}

const append = (val, arr) => {
  if (arr === undefined) {
    return holder => append(val, holder)
  }
  const clone = arr
  clone.unshift(val)

  return clone
}

const contains = (val, arr) => {
  if (arr === undefined) {
    return holder => contains(val, holder)
  }

  return any(value => val === value, arr)
}

const filter = (fn, arr) => {
  if (arr === undefined) {
    return holder => filter(fn, holder)
  }

  return arr.filter(fn)
}

const find = (fn, arr) => {
  if (arr === undefined) {
    return holder => find(fn, holder)
  }

  return arr.find(fn)
}

const findIndex = (fn, arr) => {
  if (arr === undefined) {
    return holder => findIndex(fn, holder)
  }

  return arr.findIndex(fn)
}

const flatten = arr => {
  let willReturn = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[ i ])) {
      willReturn = willReturn.concat(flatten(arr[ i ]))
    } else {
      willReturn.push(arr[ i ])
    }
  }

  return willReturn
}

const drop = (dropNumber, arr) => {
  if (arr === undefined) {
    return holder => drop(dropNumber, holder)
  }
  const arrClone = arr

  return arrClone.slice(dropNumber)
}

const dropLast = (dropNumber, arr) => {
  if (arr === undefined) {
    return holder => dropLast(dropNumber, holder)
  }
  const arrClone = arr

  return arrClone.slice(0, -dropNumber)
}

const equals = (a, b) => {
  if (b === undefined) {
    return holder => equals(a, holder)
  } else if (a === b) {
    return a !== 0 || 1 / a === 1 / b
  }
  const aType = type(a)
  if (aType !== type(b)) {
    return false
  }

  if (aType === "Array") {
    const aClone = a
    const bClone = b

    return aClone.sort().toString() === bClone.sort().toString()
  }

  if (aType === "Object") {
    const aKeys = Object.keys(a)
    if (aKeys.length === Object.keys(b).length) {
      if (aKeys.length === 0) {
        return true
      }
      let flag = true
      aKeys.map(val => {
        if (flag) {
          const aValType = type(a[ val ])
          const bValType = type(b[ val ])
          if (aValType === bValType) {
            if (aValType === "Object") {
              if (Object.keys(a[ val ]).length === Object.keys(b[ val ]).length) {
                if (Object.keys(a[ val ]).length !== 0) {
                  if (!equals(a[ val ], b[ val ])) {
                    flag = false
                  }
                }
              } else {
                flag = false
              }
            } else if (!equals(a[ val ], b[ val ])) {
              flag = false
            }
          } else {
            flag = false
          }
        }
      })

      return flag
    }
  }

  return false
}

const head = arr => dropLast(arr.length - 1, arr)

const indexOf = (question, arr) => {
  if (arr === undefined) {
    return holder => indexOf(question, holder)
  }

  return arr.indexOf(question)
}

const init = arr => dropLast(1, arr)

const join = (glue, arr) => {
  if (arr === undefined) {
    return holder => join(glue, holder)
  }

  return arr.join(glue)
}

const map = (fn, arr) => {
  if (arr === undefined) {
    return holder => map(fn, holder)
  }

  return arr.map(fn)
}

const last = arr => arr[ arr.length - 1 ]

const length = arr => arr.length

const match = (regex, str) => {
  if (str === undefined) {
    return holder => match(regex, holder)
  }
  const willReturn = str.match(regex)

  return willReturn === null ?
    [] :
    willReturn
}

const merge = (obj, newProps) => {
  if (newProps === undefined) {
    return holder => merge(obj, holder)
  }

  return Object.assign({}, obj, newProps)
}

const omit = (keys, obj) => {
  if (obj === undefined) {
    return holder => omit(keys, holder)
  }
  const willReturn = {}
  for (key in obj) {
    if (!keys.includes(key)) {
      willReturn[ key ] = obj[ key ]
    }
  }

  return willReturn
}

const path = (pathArr, obj) => {
  if (obj === undefined) {
    return holder => path(pathArr, holder)
  }

  let holder = obj
  let counter = 0
  while (counter < pathArr.length) {
    if (holder === null) {
      return undefined
    }
    holder = holder[ pathArr[ counter ] ]
    counter++
  }

  return holder
}

const prepend = (val, arr) => {
  if (arr === undefined) {
    return holder => prepend(val, holder)
  }

  const clone = arr
  clone.push(val)

  return clone
}

const pick = (keys, obj) => {
  if (obj === undefined) {
    return holder => pick(keys, holder)
  }
  const willReturn = {}
  for (key in obj) {
    if (keys.includes(key)) {
      willReturn[ key ] = obj[ key ]
    }
  }

  return willReturn
}

const prop = (key, obj) => {
  if (obj === undefined) {
    return holder => prop(key, holder)
  }

  return obj[ key ]
}

const propEq = (key, val, obj) => {
  if (val === undefined) {
    return (valHolder, objHolder) => propEq(key, valHolder, objHolder)
  } else if (obj === undefined) {
    return holder => propEq(key, val, holder)
  }

  return obj[ key ] === val
}

const range = (start, end) => {
  const willReturn = []
  for (let i = start; i < end; i++) {
    willReturn.push(i)
  }

  return willReturn
}

const repeat = (a, num) => {
  if (num === undefined) {
    return holder => repeat(a, holder)
  }
  const willReturn = range(0, num)

  return willReturn.fill(a)
}

const replace = (regex, replacer, str) => {
  if (replacer === undefined) {
    return (replacerHolder, strHolder) => replace(regex, replacerHolder, strHolder)
  } else if (str === undefined) {
    return holder => replace(regex, replacer, holder)
  }

  return str.replace(regex, replacer)
}

const subtract = (a, b) => {
  if (b === undefined) {
    return c => subtract(a, c)
  }

  return a - b
}

const sort = (fn, arr) => {
  if (arr === undefined) {
    return holder => sort(fn, holder)
  }
  const arrClone = arr

  return arrClone.sort(fn)
}

const sortBy = (fn, arr) => {
  if (arr === undefined) {
    return holder => sortBy(fn, holder)
  }
  const arrClone = arr

  return arrClone.sort((a, b) => {
    const fnA = fn(a)
    const fnB = fn(b)

    return fnA < fnB ?
      -1 :
      fnA > fnB ?
        1 :
        0
  })
}

const split = (glue, str) => {
  if (str === undefined) {
    return holder => split(glue, holder)
  }

  return str.split(glue)
}

const splitEvery = (num, a) => {
  if (a === undefined) {
    return holder => splitEvery(num, holder)
  }
  num = num > 1 ?
  num :
  1
  const willReturn = []
  let counter = 0
  while (counter < a.length) {
    willReturn.push(a.slice(counter, counter += num))
  }

  return willReturn
}

const tail = arr => drop(1, arr)

const take = (takeNumber, arr) => {
  if (arr === undefined) {
    return holder => take(takeNumber, holder)
  }
  const arrClone = arr

  return arrClone.slice(0, takeNumber)
}

const takeLast = (takeNumber, arr) => {
  if (arr === undefined) {
    return holder => dropLast(takeNumber, holder)
  }
  const arrClone = arr
  takeNumber = takeNumber > arrClone.length ?
  arrClone.length :
  takeNumber

  return arrClone.slice(arrClone.length - takeNumber)
}

const toLower = a => a.toLowerCase()

const toUpper = a => a.toUpperCase()

const test = (regex, str) => {
  if (str === undefined) {
    return holder => test(regex, holder)
  }

  return str.search(regex) === -1 ?
  false :
  true
}

const trim = str => str.trim()

const type = a => {
  if (a === null) {
    return "Null"
  } else if (Array.isArray(a)) {
    return "Array"
  } else if (typeof a === "boolean") {
    return "Boolean"
  } else if (typeof a === "number") {
    return "Number"
  } else if (typeof a === "string") {
    return "String"
  } else if (a === undefined) {
    return "Undefined"
  } else if (a instanceof RegExp) {
    return "RegExp"
  }

  return "Object"
}

const values = obj => {
  const willReturn = []
  for (key in obj) {
    willReturn.push(obj[ key ])
  }

  return willReturn
}

const uniq = arr => {
  const holder = []

  return arr.filter(val => {
    if (holder.includes(val)) {
      return false
    }
    holder.push(val)

    return true
  })
}

const update = (newValue, index, arr) => {
  if (index === undefined) {
    return (indexHolder, arrHolder) => update(newValue, indexHolder, arrHolder)
  } else if (arr === undefined) {
    return holder => update(newValue, index, holder)
  }

  return arr.fill(newValue, index, index + 1)
}

module.exports.add = add
module.exports.adjust = adjust
module.exports.any = any
module.exports.append = append
module.exports.compose = R.compose
module.exports.contains = contains
module.exports.drop = drop
module.exports.dropLast = dropLast
module.exports.equals = equals
module.exports.filter = filter
module.exports.find = find
module.exports.findIndex = findIndex
module.exports.flatten = flatten
module.exports.head = head
module.exports.indexOf = indexOf
module.exports.init = init
module.exports.join = join
module.exports.last = last
module.exports.length = length
module.exports.map = map
module.exports.match = match
module.exports.merge = merge
module.exports.omit = omit
module.exports.path = path
module.exports.pick = pick
module.exports.prepend = prepend
module.exports.prop = prop
module.exports.propEq = propEq
module.exports.range = range
module.exports.repeat = repeat
module.exports.replace = replace
module.exports.sort = sort
module.exports.sortBy = sortBy
module.exports.split = split
module.exports.splitEvery = splitEvery
module.exports.subtract = subtract
module.exports.tail = tail
module.exports.take = take
module.exports.takeLast = takeLast
module.exports.test = test
module.exports.toLower = toLower
module.exports.toUpper = toUpper
module.exports.trim = trim
module.exports.type = type
module.exports.uniq = uniq
module.exports.update = update
module.exports.values = values
