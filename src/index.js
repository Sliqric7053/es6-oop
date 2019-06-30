import { Button } from './ui/button';
import { drone1 } from '../images/image-urls';
import { Image } from './ui/image';
import { TitleBar } from './ui/title-bar';
import { FleetDataService } from './services/fleet-data-service';
import { DataTable } from './ui/data-table';
import { fleet } from './fleet-data';

let body = document.querySelector('body');

let title = new TitleBar('AI Vehicles');

title.addLink('Home', '');
title.addLink('Cars', '');
title.addLink('Drones', '');
title.addLink('Map', '');
title.addLink('Contact', '');
title.appendToElement(body);

let headers = 'License Make Model Miles'.split(' ');
let dataService = new FleetDataService();
console.log('TCL: dataService', dataService);
dataService.loadData(fleet);
let dt = new DataTable(headers, dataService.cars);
dt.appendToElement(body);
