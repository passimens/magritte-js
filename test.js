const object = {
  uid: 3,
  name: 'Alex Kabanets',
  dob: '01.01.1990',
  height: 180.5
}

const description = new MAContainer()
const str = new MAStringDescription({ name: 'name', undefined: 'N/A' })

description.setChildren([
  new MAIntDescription({ name: 'uid', label: 'Uid', visible: false }),
  new MAStringDescription({ name: 'name', undefined: 'N/A', comment: 'comment name', priority: 1, required: true }),
  new MADateAndTimeDescription({ name: 'dob', label: 'Date of birth', priority: 0 }),
  new MAIntDescription({ name: 'height', label: 'Height', priority: 2 }),
  new MADateAndTimeDescription({ name: 'last_updated', label: 'Last Updated', visible: false })
])


viewGenerator(object, description)

function viewGenerator(object, description) {
  const view = document.getElementById('view')
  const childSorted = [...description.children].sort((a, b) => Number(a.priority) - Number(b.priority))

  for (const child of childSorted) {
    if (child.visible) {
      printRow(child, object[child.name])
    }
  }

  function printRow(child, objectName) {
    const row = document.createElement('p')
    const label = document.createElement('b')
    const name = document.createElement('span')
    const hint = child.comment ? document.createElement('span') : null

    label.innerHTML = `${child.label || child.undefined}: `
    name.innerHTML = objectName

    row.appendChild(label)
    row.appendChild(name)

    if (hint) {
      hint.innerHTML = ' \u24D8'
      hint.classList.add('hint')
      hint.setAttribute('title', child.comment)
      row.appendChild(hint)
    }
    
    view.appendChild(row)
  }
}