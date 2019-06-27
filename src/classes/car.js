import { Vehicle } from './vehicle';

export class Car extends Vehicle {
  constructor(license, model, latLong) {
    super(license, model, latLong);
  }
}
