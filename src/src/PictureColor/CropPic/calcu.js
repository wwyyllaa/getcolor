

/**
 * 三次方求根公式算法。
 * 返回根的数组，数组长度： 0 - 3
 * @param {*} param0 a,b,c 分别为三、二、一次项系数；d为常数项
 * @returns {Number[]}
 */


 const {pow, sqrt, sign, abs, sin, cos, acos, E, float} = Math;
 const One_third = 1.0 / 3.0;
 
 function isZero (value, ep = E) {
      return Math.abs(value) < ep;
 }

 export default function cal_cubic_ik([a, b, c, d]){
 
    let a_Threefold = 3 * a;
    let A = b ** 2 - a_Threefold * c,
        B = b * c - 9 * a * d,
        C = c ** 2 - 3 * b * d,
        delta = B ** 2 - 4 * A * C;  //总判别式
        console.log('delta',delta)
    
    // 一个三重实根
    if (isZero(A) && isZero(B)){
        
        return [-b / (a_Threefold)]
    }

    // 一个实根和一对共轭复根
    if (delta > 0){
        
        let y1 = A * b + a_Threefold * (( -B + sqrt(delta)) / 2.0),   
            y2 = A * b + a_Threefold * (( -B - sqrt(delta)) / 2.0);

        return [(-b - (sign(y1) * pow(abs(y1), One_third) + sign(y2) * pow(abs(y2), One_third)) ) / a_Threefold ]
    }

    //三个实根，其中有一个二重根
    if (isZero(delta)){
        
        let K = B / float(A);
        return [- b / float(a) + K, - K / 2.0]
    }

    //三个不等实根
    if (delta < 0){
        
        let theta = acos((2 * A * b - 3 * a * B) / (2 * sqrt(pow(A, 3))));
            let m = sqrt(A);
            let n = cos(theta / 3.0);
            let q = sqrt(3) * sin(theta / 3.0);

        return [
            (- b - 2 * m * n) / a_Threefold, 
            (- b + m * (n + q)) / a_Threefold, 
            (- b + m * (n - q)) / a_Threefold
        ]

    }
}