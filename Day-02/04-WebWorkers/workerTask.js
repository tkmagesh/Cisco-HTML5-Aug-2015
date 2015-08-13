function doWork(){
    for(var i=0; i<10000; i++){
        for(var j=0; j<10000; j++)
            for(var k=0; k<100; k++){}
        if ((i+1) % 100 === 0){
            var percentCompleted = ((i+1) / 10000) * 100;
            self.postMessage({
                type : "progress",
                percentCompleted : percentCompleted
            });
        }
    }
}

self.addEventListener("message", function(evtArgs){
    if (evtArgs.data.type === "start"){
        doWork();
        self.postMessage({type : "done"});
    } else {
        console.log("invalid message ", evtArgs.data);
    }
})
