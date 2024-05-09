
import { MAContainer } from './MAContainer.js';


export class MAPriorityContainer extends MAContainer
{
  setChildren(aCollection)
  {
    const c = aCollection.slice();
    c.sort((d1, d2) => d1.priority - d2.priority);
    super.setChildren(c);
  }

  append(aDescription)
  {
    const c = this.children;
    c.push(aDescription);
    this.setChildren(c);
  }

  extend(aCollection)
  {
    for (const item of aCollection)
    {
      this.append(item);
    }
  }

  acceptMagritte(aVisitor)
  {
    return aVisitor.visitPriorityContainer(this);
  }
}
