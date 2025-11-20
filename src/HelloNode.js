// Task 1 - Hello Node
// Name: Abdul Hadi Asad

console.log("Line # 1: Start - This runs first (synchronous)");

setTimeout(() => {
    console.log("Line # 2: Delayed - This runs last (asynchronous)");
}, 0);

console.log("Line # 3: End - This runs second (synchronous)");

