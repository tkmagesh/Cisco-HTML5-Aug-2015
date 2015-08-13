function isPrime(n){
    if (n <= 3) return true;
    for(var i=2; i<= (n/2); i++)
        if (n % i === 0) return false;
    return true;
}

function findPrimes(start, end){
    var result = 0;
    for(var i=start; i<= end; i++)
        if (isPrime(i)) ++result;
    return result;
}

self.addEventListener("message", function(evtArg){
    var message = evtArg.data;
    if (message.type === "findPrimes"){
        var primeCount = findPrimes(message.start, message.end);
        var outputMessage = {
            type : "done",
            primeCount : primeCount
        };
        self.postMessage(outputMessage);
    } else {
        console.log("invalid message ", message);
    }
});

