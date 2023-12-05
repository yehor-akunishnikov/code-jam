import {Module} from '@nestjs/common';

import {SearchUtilsService} from './services/search-utils.service';

@Module({
    providers: [SearchUtilsService],
    exports: [SearchUtilsService]
})
export class SharedModule {
}
