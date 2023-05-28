class Microphone{
    constructor(fftSize) {
        this.initialized=false
        navigator.mediaDevices.getUserMedia({audio:true}).then(function (stream){
            this.audioContext=new AudioContext()
            this.microphone=this.audioContext.createMediaStreamSource(stream)
            this.analyser=this.audioContext.createAnalyser()
            this.analyser.fftSize=fftSize
            const bufferLength=this.analyser.frequencyBinCount
            this.dataArray=new Uint8Array(bufferLength)
            this.microphone.connect(this.analyser)
            this.initialized=true
        }.bind(this)).catch(function (err){
            console.log(err)
        })
    }
    getSamples(){
this.analyser.getByteTimeDomainData(this.dataArray)
        let normalSamples=[...this.dataArray].map(el=>el/128-1)
        return normalSamples

    }
    getVolume(){
        this.analyser.getByteTimeDomainData(this.dataArray)
        let normalSamples=[...this.dataArray].map(el=>el/128-1)
        let sum=0
        for(let i=0;i<normalSamples.length;i++){
            sum+=normalSamples[i]**2
        }
        let volume=Math.sqrt(sum/normalSamples.length)
        return volume
    }
}


const microphone=new Microphone()