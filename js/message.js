/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var language = {
        'en' : {
            message : {
                auth : {
                    unauthorized : 'You are not authorized.'
                },
                form : {
                    fieldNotFilled : 'Please enter the fields correctly and try again.'
                },
                success : {
                    create      : '%1 created successfully.',
                    save        : '%1 saved successfully.',
                    update      : '%1 updated successfully.',
                    delete      : '%1 deleted successfully.',
                    connect     : '%1 connected successfully.',
                    disconnect  : '%1 disconnected successfully.',
                    restore     : '%1 restored successfully.',
                    import      : '%1 imported successfully.',
                    set         : 'Successfully set %1.',
                    copy        : '%1 copied to your clipboard.'
                },
                error : {
                    view        : 'Error happened while viewing %1.',
                    list        : 'Error happened while getting %1 list.',
                    create      : 'Error happened while creating %1.',
                    save        : 'Error happened while saving %1.',
                    set         : 'Error happened while setting %1.',
                    get         : 'Error happened while getting %1.',
                    update      : 'Error happened while updating %1.',
                    restore     : 'Error happened while restoring %1.',
                    delete      : 'Error happened while deleting %1.',
                    connect     : 'Error happened while connecting %1.',
                    disconnect  : 'Error happened while disconnecting %1.',
                    select      : 'Please select at least one %1',
                    general     : 'Something went wrong.',
                    import_self : 'You cannot import self.',
                    user        : 'You cannot delete logged in user.'
                },
                confirm : {
                    simple               : 'Are you sure?',
                    delete               : 'Are you sure you want to delete this %1?'
                },
                notice : {
                    no_record   : 'Does not have any %1.'
                }
            }
        }
};

/**
 * Get the language
 *
 * @param key - the object accessor as string
 *
 * @returns the message
 */
function lang (key) {
    var value = language.en;
    var parts = key.split('.');

    for(var i = 0; i < parts.length; i++) {
        if (undefined == value[parts[i]]) {
            return key;
        }
        value = value[parts[i]];
    }

    if (arguments.length <= 1) {
        return value;
    }

    for (var i = 1; i < arguments.length; i++) {
        value = value.replace('%' + i, arguments[i]);
    }

    return value;
}

