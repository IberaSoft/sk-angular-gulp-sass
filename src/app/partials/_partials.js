import view1 from './view1/view1';
import view2 from './view2/view2';

const moduleName = 'app.partials';

angular
    .module(moduleName, [
        view1,
        view2
    ]);

export default moduleName;