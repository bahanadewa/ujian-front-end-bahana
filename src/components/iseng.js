
bintangAngka = (a) =>{
    var bintang =""
    for (i=0 ; i<a ; i++){
        for (j=1 ; j<=i+1; j++){
            bintang += j
        }
        if (i<a-1){
            bintang +='\n'
        }
        
    }
    return bintang
}

console.log(bintangAngka(5))


lassArr = (a) =>{
    if (a[a.length-1]>10){
        return a[a.length-1]
    } else {
       return a[0]
    }

}

console.log(lassArr([3,4,2,5]))

summarr = (a)=>{
   var res = []

   for (var i=0 ; i< a.length ; i++){
       var sum = 0
       for (var j=0 ; j<a[i].length ;j++){
           sum += a[i][j]
           if (a[i][j]<0){
               sum = 0
               break
           }
       }
       if (sum >0){
           res.push(sum)
       }
       
   }
    return res
}

var param = [
            [1,4,7,9],
            [2,-3,9],
            [1,6,-9]]

console.log(summarr(param))


