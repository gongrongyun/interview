function MyPromise(executor) {
  const self = this;
  self.status = "pending";
  self.data = undefined;
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];

  function resolve(value) {
    if (self.status === "pending") {
      self.status = "fulfilled";
      self.data = value;
      for (let i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value);
      }
    }
  }

  function reject(reason) {
    if (self.status === "pending") {
      self.status = "rejected";
      self.data = reason;
      for (let i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reason);
      }
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function(onResolve, onReject) {
  const self = this;

  onResolve =
    typeof onResolve === "function"
      ? onResolve
      : function(value) {
          return value;
        };
  onReject =
    typeof onReject === "function"
      ? onReject
      : function(reason) {
          return reason;
        };

  if (self.status === "fulfilled") {
    return new MyPromise((resolve, reject) => {
      try {
        const result = onResolve(self.data);
        if (result instanceof MyPromise) {
          result.then(resolve, reject);
        }
        resolve(result);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }
  if (self.status === "rejected") {
    return new MyPromise((resolve, reject) => {
      try {
        const result = onReject(self.data);
        if (result instanceof MyPromise) {
          result.then(resolve, reject);
        }
        reject(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  if (self.status === "pending") {
    return new MyPromise((resolve, reject) => {
      self.onResolvedCallback.push(() => {
        try {
          const result = onResolve(self.data);
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          }
          resolve(result);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallback.push(() => {
        try {
          const result = onReject(self.data);
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          }
          reject(result);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
};

MyPromise.prototype.catch = function(onReject) {
  return this.then(null, onReject);
};

new MyPromise(resolve => resolve(8))
  .then()
  .then()
  .then(function(value) {
    console.log(value);
  });
