
import { MAValidationError } from '../errors/MAValidationError.js';
import { MAMultipleErrors } from '../errors/MAMultipleErrors.js';


export class MAVisitor
{
  visit(anObject)
  {
    const errors = [];
    try
    {
      return anObject.acceptMagritte(this);
    }
    catch (e)
    {
      if (e instanceof MAValidationError)
      {
        errors.push(e);
      }
      else
      {
        throw e;
      }
    }
    if (errors.length > 0)
    {
       const multipleErrors = new MAMultipleErrors(this, errors, anObject.label);
       throw multipleErrors;
    }
  }

  visitAll(aCollection)
  {
    for (const element of aCollection)
    {
      this.visit(element);
    }
  }

  visitDescription(anObject)
  {
  }

  visitBlockDescription(anObject)
  {
    return this.visitElementDescription(anObject);
  }

  visitBooleanDescription(anObject)
  {
    return this.visitElementDescription(anObject);
  }

  visitClassDescription(anObject)
  {
    return this.visitElementDescription(anObject);
  }

  visitColorDescription(anObject)
  {
    return this.visitElementDescription(anObject);
  }

  visitContainer(anObject)
  {
    return this.visitDescription(anObject);
  }

  visitDirectoryDescription(anObject)
  {
    return this.visitFileDescription(anObject);
  }

  visitDateAndTimeDescription(anObject)
  {
    return this.visitMagnitudeDescription(anObject);
  }

  visitDateDescription(anObject)
  {
    return this.visitMagnitudeDescription(anObject);
  }

  visitDurationDescription(anObject)
  {
    return this.visitMagnitudeDescription(anObject);
  }

  visitElementDescription(anObject)
  {
    return this.visitDescription(anObject);
  }

  visitFileDescription(anObject)
  {
    return this.visitElementDescription(anObject);
  }

  visitMagnitudeDescription(anObject)
  {
    return this.visitElementDescription(anObject);
  }

  visitMemoDescription(anObject)
  {
    return this.visitStringDescription(anObject);
  }

  visitMultipleOptionDescription(anObject)
  {
    return this.visitOptionDescription(anObject);
  }

  visitNumberDescription(anObject)
  {
    return this.visitMagnitudeDescription(anObject);
  }

  visitIntDescription(anObject)
  {
    return this.visitNumberDescription(anObject);
  }

  visitFloatDescription(anObject)
  {
    return this.visitNumberDescription(anObject);
  }

  visitOptionDescription(anObject)
  {
    return this.visitReferenceDescription(anObject);
  }

  visitPasswordDescription(anObject)
  {
    return this.visitStringDescription(anObject);
  }

  visitPriorityContainer(anObject)
  {
    return this.visitContainer(anObject);
  }

  visitReferenceDescription(anObject)
  {
    return this.visitElementDescription(anObject);
  }

  visitRelationDescription(anObject)
  {
    return this.visitReferenceDescription(anObject);
  }

  visitReportContainer(anObject)
  {
    return this.visitContainer(anObject);
  }

  visitSingleOptionDescription(anObject)
  {
    return this.visitOptionDescription(anObject);
  }

  visitStringDescription(anObject)
  {
    return this.visitElementDescription(anObject);
  }

  visitSymbolDescription(anObject)
  {
    return this.visitStringDescription(anObject);
  }

  visitTableDescription(anObject)
  {
    return this.visitReferenceDescription(anObject);
  }

  visitTableReference(anObject)
  {
    return this.visitReferenceDescription(anObject);
  }

  visitTimeDescription(anObject)
  {
    return this.visitMagnitudeDescription(anObject);
  }

  visitTimeStampDescription(anObject)
  {
    return this.visitMagnitudeDescription(anObject);
  }

  visitToManyRelationDescription(anObject)
  {
    return this.visitRelationDescription(anObject);
  }

  visitToManyScalarRelationDescription(anObject)
  {
    return this.visitToManyRelationDescription(anObject);
  }

  visitToOneRelationDescription(anObject)
  {
    return this.visitRelationDescription(anObject);
  }

  visitTokenDescription(anObject)
  {
    return this.visitReferenceDescription(anObject);
  }

  visitUrlDescription(aMAUrlDescription)
  {
    return this.visitElementDescription(aMAUrlDescription);
  }
}
