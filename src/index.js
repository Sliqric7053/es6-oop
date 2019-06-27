import { Button } from './ui/button';
import { drone1 } from '../images/image-urls';
import { Image } from './ui/image';
import { TitleBar } from './ui/title-bar';
import { FleetDataService } from './services/fleet-data-service';
import { DataTable } from './ui/data-table';

let body = document.querySelector('body');

// let btn = new Button('Click Me!');
// let image = new Image(drone1);
let title = new TitleBar('AI Vehicles');

// btn.appendToElement(body);
// image.appendToElement(body);

title.addLink('Home', '');
title.addLink('Cars', '');
title.addLink('Drones', '');
title.addLink('Map', '');
title.addLink('Contact', '');
title.appendToElement(body);

let headers = 'License Make Model Miles'.split(' ');
let dataService = new FleetDataService();
console.log('TCL: dataService', dataService);
dataService.loadData('car');
let dt = new DataTable(headers, dataService.cars);
// console.log('TCL: dataService.cadrors', dataService.drones);
// console.log('TCL: dt', dt);
dt.appendToElement(body);
