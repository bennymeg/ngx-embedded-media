// Copyright 2019 Benny Megidish

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EmbeddedMediaService } from './services/media.service';
import { MediaComponent } from './components/media.component';

export { EmbeddedMediaService } from './services/media.service';
export { MediaComponent } from './components/media.component';


@NgModule({
	imports: [ CommonModule, HttpClientModule ],
	declarations: [ MediaComponent ],
	exports: [ MediaComponent ],
	providers: [ EmbeddedMediaService ]
})
export class EmbeddedMediaModule {
	static forRoot(): ModuleWithProviders<EmbeddedMediaModule> {
		return {
			ngModule: EmbeddedMediaModule,
			providers: [ EmbeddedMediaService ]
		};
	}
}
