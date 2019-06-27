import { Car } from '../classes/car';
import { Drone } from '../classes/drone';
import { ErrorData } from '../classes/errors';

export class FleetDataService {
  constructor() {
    this.cars = [];
    this.drones = [];
    this.errors = [];
  }

  loadData(fleet) {
    for (let data of fleet) {
      switch (data.type) {
        case 'drone':
          if (this.validateDroneData(data)) {
            let drone = this.loadDrone(data);
            if (drone) {
              this.drones.push(drone);
            } else {
              let e = new ErrorData('Invalid drone data', drone);
              this.errors.push(e);
            }
          }
          break;
        case 'car':
          if (this.validateCarData(data)) {
            let car = this.loadCar(data);
            if (car) {
              this.cars.push(car);
            } else {
              let e = new ErrorData('Invalid car data', car);
              this.errors.push(e);
            }
          }
          break;
        default:
          let e = new ErrorData('Invalid vehicle type', data);
          this.errors.push(e);
          break;
      }
    }
  }

  loadDrone(drone) {
    try {
      let d = new Drone(drone.license, drone.model, drone.latLong);
      d.airTimeHours = drone.airTimeHours;
      d.base = drone.base;
      return d;
    } catch (e) {
      this.errors.push(new ErrorData('Error loading drone', drone));
    }
    return null;
  }

  validateDroneData(drone) {
    let validProps = 'license, type, model, airTimeHours, base, latLong';
    let requiredProps = validProps.split(', ');
    let hasError = false;

    for (let prop of requiredProps) {
      // "!" turns drone[prop] value into a boolean
      // !drone[prop] --> truthy values have err e.g. "undefined"

      if (!drone[prop]) {
        this.errors.push(new ErrorData(`invalid property "(${prop})" `, drone));
        hasError = true;
      }
      //   check whether or not prop "airTimeHours" is a number
      if (isNaN(Number(drone['airTimeHours']))) {
        this.errors.push(new ErrorData(`"(${prop})" is not a number! `, drone));
        hasError = true;
      }
    }
    return !hasError;
  }

  loadCar(car) {
    try {
      let c = new Car(car.license, car.model, car.latLong);
      c.model = car.model;
      c.miles = car.miles;
      c.make = car.make;
      return c;
    } catch (e) {
      this.errors.push(new ErrorData('Error loading car', car));
    }
    return null;
  }

  validateCarData(car) {
    let validProps = 'license type make model latLong miles'.split(' ');
    let hasError = false;

    for (let prop of validProps) {
      if (!car[prop]) {
        hasError = true;
        this.errors.push(`invalid car property "${prop}"`, car);
      }
      if (!Number(car['miles'])) {
        hasError = true;
        this.errors.push(new ErrorData(`"(${prop})" is not a number!`, car));
      }
    }
    return !hasError;
  }

  getCarByLicense(license) {
    return this.cars.find((car, index, self) => car.license == license);
  }

  filterCarsByMake(searchTerm) {
    console.log(
      `TCL: FleetDataService -> filterCarsByMake -> searchTerm, "${searchTerm}"`
    );
    return this.cars.filter(
      (car, i, self) => car.make.indexOf(searchTerm) >= 0
    );
  }

  getCarsSortedbyLicence() {
    return this.cars.sort((car1, car2) => {
      return car1.license > car2.license ? 1 : -1;
    });
  }
}
