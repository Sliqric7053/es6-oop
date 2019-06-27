// class Drone {
//   constructor(id) {
//     this._id = id;
//   }

//   fly() {
//     console.log(`Drone ${this.name}-${this.id} is flying..`);
//   }

//   static getCompany(test) {
//     //   can only be used within Drone class
//     // console.log(`static getCompany exec`);
//     // console.log(`this.id is ${test}`);
//   }

//   //   Getter and Setters - get executed whenever you set/get a prop
//   // Good for validation / logging etc
//   get id() {
//     console.log('in getter');
//     return this._id;
//   }

//   set id(number) {
//     this._id = number;
//   }
// }

// let dron1 = new Drone(1234);
// // dron1.fly();
// // console.log(`ID is ${dron1.id}`);
// // dron1.id = 888;
// // console.log(`ID is ${dron1.id}`);

// class Vehicle {
//   constructor(licNum) {
//     this.licNum = licNum;
//   }
// }

// class Drone1 extends Vehicle {
//   constructor() {
//     super();
//     console.log(`this.name is ${this.licNum}`);
//   }
// }

// class Car extends Vehicle {
//   constructor(licNum) {
//     super(licNum);
//   }
// }

// let c = new Car(123);
// let b = new Drone1();
// console.log(b.licNum);

/**============BREAK POINT================= */

class Vehicle {
  start() {
    console.log('start vehicle');
  }
  static getCompany() {
    console.log('company name');
  }
}

class Car extends Vehicle {
  start() {
    super.start();
    console.log('start car');
  }
}

let c = new Car();
c.start();
Car.getCompany(); // can call static methods from derived class
// c.getCompany(); // can NOT call static methods from INSTANCE class

let dataService = new FleetDataService();
dataService.loadData(fleet);

for (let car of dataService.cars) {
}

for (let drone of dataService.drones) {
  console.table('TCL: drone', drone);
}

for (const e of dataService.errors) {
  console.table(e);
}

let search = dataService.filterCarsByMake('a');
for (let car of search) {
  console.table('TCL: search', car.make);
}

let lic = dataService.getCarByLicense('AT9900');
console.table('TCL: lic', lic);

let sort = dataService.getCarsSortedbyLicence();
console.table('TCL: sort', sort);
