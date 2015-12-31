// Modules
import core from './core/_core';
import controllers from './controllers/_controllers';
import partials from './partials/_partials';

const moduleName = 'app';

angular
    .module(moduleName, [
        core,
        controllers,
        partials,
        'layout'
    ]);

export default moduleName;