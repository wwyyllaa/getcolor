
export default  function cal_x(a, b, c, d, y) {
  const x = Math.pow(10, c * Math.pow((a - y) / (y - d), 1/b) );
  console.log(a, b, c, d, y, x)
  return x;
}
