
import { MAReferenceDescription } from './MAReferenceDescription.js';
import { MAPriorityContainer } from './MAPriorityContainer.js';


export class MARelationDescription extends MAReferenceDescription
{
  constructor(args) {
    super(args);
    this.initWithArgs(args);
  }

  get reference()
  {
    let result = super.reference;
    if (result === undefined)
    {
      descriptionContainer = this.defaultReference();
      descriptionContainer.label = this.label;
      super.reference = descriptionContainer;
      return descriptionContainer;
    }
    else
    {
      return result;
    }
  }

  set reference(aDescription) {
    super.reference = aDescription;
  }

  static defaultReference() {
    return new MAPriorityContainer();
  }

  acceptMagritte(aVisitor) {
    aVisitor.visitRelationDescription(this);
  }

}
