function viewGenerator(object, description) {
	const view = document.getElementById('view')

  for (const child of description.children) {
  	if (child.visible) {
  		printRow(child.label, object[child.name])
  	}
  }

  function printRow(labelVal, nameVal) {
  	const row = document.createElement('p')
  	const label = document.createElement('b')
  	const name = document.createElement('span')

  	label.innerHTML = `${labelVal}: `
  	name.innerHTML = nameVal

  	row.appendChild(label)
  	row.appendChild(name)
  	view.appendChild(row)
  }
}

const object = {
  uid: 3,
  name: 'Alex Kabanets',
  dob: '01.01.1990',
  height: 180.5
}

const description = new MAContainer()

description.setChildren([
  new MAIntDescription({name: 'uid', label: 'Uid', visible: false}),
  new MAStringDescription({name: 'name', label: 'Name'}),
  new MADateAndTimeDescription({name: 'dob', label: 'Date of birth'}),
  new MAIntDescription({name: 'height', label: 'Height'})
])


viewGenerator(object, description)