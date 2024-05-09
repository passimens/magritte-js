
import { MAVisitor } from './MAVisitor.js';
MAContainer
MAToOneRelationDescription


class _Context
{
  parent_context = undefined;
  context_index = undefined;
  source = undefined;
  description = undefined;
  subcontexts = undefined;
  ref_count = 1;
}

class WalkerVisitor extends MAVisitor
{
  _context = undefined;
  _contexts = undefined;
  _contexts_by_source_id = undefined;
  _sources = undefined;
  _sources_by_source_index = undefined;
  _source_indices_by_identifier = undefined;
  _source_indices_by_context_index = undefined;
  _descriptions_attachments = undefined;

  constructor()
  {
    this._clear();
  }

  _clear()
  {
    this._context = undefined;
    this._contexts = new Array();
    this._contexts_by_source_id = new Map();
    this._sources = new Array();
    this._sources_by_source_index = new Map();
    this._source_indices_by_identifier = new Map();
    this._source_indices_by_context_index = new Map();
    this._descriptions_attachments = new Map();
  }

  _createEmptyContext()
  {
    const context_index = this._contexts.length;
    this._context = new _Context();
    this._contexts.push(this._context);
    this._context.context_index = context_index;
    return this._context;
  }

  _addSource(source)
  {
    const source_index = this._sources.length;
    this._sources.push(source);
    this._sources_by_source_index.set(source_index, source);
    return source_index;
  }

  _addSourceOnce(source)
  {
    let was_added;
    if (this._source_indices_by_identifier.has(source))
    {
      was_added = false;
      source_index = this._source_indices_by_identifier.get(source);
    }
    else
    {
      was_added = true;
      source_index = this._sources.length;
      this._sources.push(source);
      this._source_indices_by_identifier.set(source, source_index);
      this._sources_by_source_index.set(source_index, source);
    }
    return [source_index, was_added,];
  }

  _descriptionClone(description)
  {
    const clone = Object.assign(Object.create(Object.getPrototypeOf(description)), description);
    return clone;
  }

  _shouldProcessDescription(description)
  {
    return description.isVisible() && !description.isReadOnly();
  }

  _shouldSkipDescription(description)
  {
    return !this._shouldProcessDescription(description);
  }

  _walkFromCurrent()
  {
    const description = this._context.description;
    if (this._shouldSkipDescription(description))
    {
      return;
    }
    description.acceptMagritte(this);
  }

  visitElementDescription(description)
  {
    const context = this._context;
    const source = this.processElementDescriptionContext(context);
    const source_index = this._addSource(source);
    this._source_indices_by_context_index.set(context.context_index, source_index);
  }

  visitContainer(description)
  {
    const context = this._context;
    const subsource = this.processContainerContext(context);
    const [subsource_index, was_added,] = this._addSourceOnce(subsource);
    this._contexts_by_source_id.set(subsource_index, context);
    context.subcontexts = [];
    const children = description.children();
    for (const subdescription of children)
    {
      const subcontext = this._createEmptyContext();
      subcontext.parent_context = context;
      context.subcontexts.push(subcontext);
      subcontext.source = subsource;
      subcontext.description = subdescription;
      this._walkFromCurrent();
    }
  }

  visitToOneRelationDescription(description)
  {
    const context = this._context;
    const subsource = this.processToOneRelationContext(context);
    const [subsource_index, was_added,] = this._addSourceOnce(subsource);
    if (was_added)
    {
      const subcontext = this._createEmptyContext();
      subcontext.parent_context = context;
      subcontext.source = subsource;
      subcontext.description = description.reference;
      this._contexts_by_source_id.set(subsource_index, subcontext);
      this._walkFromCurrent();
    }
    else
    {
      subcontext = this._contexts_by_source_id.get(subsource_index);
      subcontext.ref_count += 1;
    }
    context.subcontexts = [subcontext];
  }

  visitToManyRelationDescription(description)
  {
    const context = this._context;
    const subsources = this.processToManyRelationContext(context);
    context.subcontexts = [];
    for (const subsource of subsources)
    {
        const [subsource_index, was_added,] = this._addSourceOnce(subsource);
        if (was_added)
        {
          const subcontext = this._createEmptyContext();
          subcontext.parent_context = context;
          subcontext.source = subsource;
          subcontext.description = description.reference;
          this._contexts_by_source_id.set(subsource_index, subcontext);
          this._walkFromCurrent();
        }
        else
        {
          subcontext = this._contexts_by_source_id.get(subsource_index);
          subcontext.ref_count += 1;
        }
        context.subcontexts.push(subcontext);
    }
  }

  visitSingleOptionDescription(description)
  {
    const context = this._context;
    const description = context.description;
    const isContainer = description.reference instanceof MAContainer;

    let subcontext_description;
    if (isContainer)
    {
      subcontext_description = MAToOneRelationDescription();
      subcontext_description.reference = description.reference;
    }
    else
    {
      subcontext_description = this._descriptionClone(description.reference);
    }
    subcontext_description.name = description.name;
    subcontext_description.accessor = description.accessor;

    context.description = subcontext_description;

    this._walkFromCurrent();
  }

  processContainerContext(context)
  {
    return undefined;
  }

  processElementDescriptionContext(context)
  {
    return undefined;
  }

  processToOneRelationContext(context)
  {
    return undefined;
  }

  processToManyRelationContext(context)
  {
    return [];
  }

  walkDescription(aSource, aDescription)
  {
    this._clear();
    this._createEmptyContext();
    this._context.source = aSource;
    this._context.description = this._descriptionClone(aDescription);
    this._descriptions_attachments.set(this._context.description, { accessor: 'MAIdentityAccessor' });
    this._walkFromCurrent();
  }

  rewalkDescription()
  {
    if (this._contexts.length > 0)
    {
      this._context = this._contexts[0];
    }
    else
    {
      this._context = undefined;
    }
    this._walkFromCurrent();
  }
}
