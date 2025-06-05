export class MAModel {

    static readUsingWrapper(model, description) {
        if (description['_accessor'] == 'MAIdentityAccessor'){
            return model;
        }
        if (model['readUsing'] !== undefined) {
            const readUsing = model['readUsing'];
            return readUsing(description);
        }
        // const result = description.accessor.read(model);
        const result = model[description.name];
        return result === undefined ? description.undefinedValue : result;
    }

    static writeUsingWrapper(model, description, value) {
        if (description['_accessor'] == 'MAIdentityAccessor'){
            throw new Error('Cannot write to MAIdentityAccessor');
        }
        if (model['writeUsing'] !== undefined) {
            const writeUsing = model['writeUsing'];
            return writeUsing(description, value);
        }
        // description.accessor.write(model, value);
        model[description.name] = value;
    }
}
