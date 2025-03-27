fetch("http://3.136.18.203:8000/products/")
  .then((res = res.json()))
  .then((data) => {
    console.log(data);
  });
