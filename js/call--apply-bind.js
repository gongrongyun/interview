Function.prototype.Call = function(context, ...args) {
  context = typeof context === "object" ? context : window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

Function.prototype.Apply = function(context, args) {
  context = typeof context === "object" ? context : window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

Function.prototype.Bind = function(context, ...args1) {
  context = typeof context === "object" ? context : window;
  return (...args2) => {
    return this.Call(context, ...args1, ...args2);
  };
};
