const promise = new Promise((resolve) => {
  setTimeout(resolve, 500, "hello world");
});

function fun() {
  return promise.then((data) => console.log(data));
}

fun();
