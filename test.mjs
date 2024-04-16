
import { MAContainer } from './Magritte/descriptions/MAContainer.js';
import { MAIntDescription } from './Magritte/descriptions/MAIntDescription.js';
import { MAStringDescription } from './Magritte/descriptions/MAStringDescription.js';
import { MADateAndTimeDescription } from './Magritte/descriptions/MADateAndTimeDescription.js';

import data from './test-data.json' assert { type: 'json' }

const description = new MAContainer()
const descriptionChilds = data.descriptionChilds

for (const child of descriptionChilds) {
  description.append(getClassInstance(Object.keys(child)[0], Object.values(child)[0]))
}

viewGenerator(data.object, description)

function getClassInstance(className, args) {
  switch (className) {
    case 'MAIntDescription':
      return new MAIntDescription(args)
      break;
    case 'MAStringDescription':
      return new MAStringDescription(args)
      break;
    case 'MADateAndTimeDescription':
      return new MADateAndTimeDescription(args)
      break;
  }
}

function viewGenerator(object, description) {
  //const view = document.getElementById('view')
  const childSorted = [...description.children].sort((a, b) => Number(a.priority) - Number(b.priority))

  for (const child of childSorted) {
    if (child.visible) {
      printRow(child, object[child.name])
    }
  }

  function printRow(child, value)
  {
    console.log(`value=${value}, \t label=${child.label}, \t comment=${child.comment}`);
  }

  function printRow_html(child, objectName) {
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
