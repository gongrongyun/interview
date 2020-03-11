// 条例

// 1. Object.prototype为原型链顶端
Object.prototype.__proto__ === null;

// 2. Function.prototype与Function.__proto__为同一对象
Function.prototype === Function.__proto__;

// 3. Function.prototype继承于Object.prototype
Function.prototype.__proto__ === Object.prototype;

// 创建对象的几大模式

// 1. 工厂模式
function createPerson(name, age, job) {
  const obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.job = job;
  obj.sayName() = function() {
    console.log(this.name);
  };
  return obj;
}

// 2. 构造函数模式
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);
  };
}

// 3. 原型模式
function Person() {}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Teacher";
Person.prototype.sayName = function() {
  console.log(this.name);
};

// 4. 组合模式
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ["Tom", "Jerry"];
}

Person.prototype = {
  constructor: Person,
  sayName: function() {
    console.log(this.name);
  }
};

// 5. 动态原型模式
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;

  if (typeof this.sayName != "function") {
    Person.prototype.sayName = function() {
      console.log(this.name);
    };
  }
}

// 6. 寄生构造模式
// 7. 稳妥构造函数模式