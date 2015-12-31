// Config
import appConst from './core.const';
import routes from './core.routes';

const moduleName = 'app.core';

angular
    .module(moduleName, ['ui.router'])
    .constant('appConst', appConst)
    .config(routes)
    .run(($rootScope, $state) => {
        $rootScope.$on('$stateChangeSuccess', () => {
            $rootScope.title = $state.current.title;
        });
    });

export default moduleName;