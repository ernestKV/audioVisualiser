function main(){
     const canvas=document.querySelector('#canvas1')
    const ctx=canvas.getContext('2d')
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight

    class bar{
        constructor(x,y,width,height,color,i) {
            this.x=x
            this.y=y
            this.width=width
            this.height=height
            this.color=color
this.index=i
        }
        update(micInput){

            const sound=micInput*1000
            if(sound>this.height){
                this.height=sound
            }
            else {
                this.height-=this.height*0.03
            }



        }
        draw(context,volume){
            context.strokeStyle=this.color
            context.save()
context.translate(0,0)
            context.rotate(this.index*0.03)
            context.scale(1+volume*0.2,1+volume*0.2)
            context.beginPath()

            context.moveTo(this.x,this.y)
            context.lineTo(this.y,this.height)
           // context.bezierCurveTo(0,0,this.height,this.height,this.x,this.y)
            context.stroke()
            context.rotate(this.index*0.03)
            context.strokeRect(this.y+this.height*1.5,this.height,this.height/2,this.height)
          context.rotate(this.index*0.02)
            //context.beginPath()
            //context.arc(this.x+this.index*2.5,this.y,this.height*0.5,0,Math.PI*2)
            context.stroke()
            context.restore()
        }
    }
    const fftSize=512
    const microphone=new Microphone(fftSize)
    let barsArray=[]
    const barWidth=canvas.width/(fftSize/2)
    function createBars(){
         for(let i=0;i<fftSize;i++){
             let color=`hsl(${i*2},100%,50%)`
barsArray.push(new bar(0,i*1.3,1,20,color,i))
         }
    }


    createBars()
    let angle=0
    function animate(){
         if(microphone.initialized){
             ctx.clearRect(0,0,canvas.width,canvas.height)
             const samples=microphone.getSamples()
             const volume=microphone.getVolume()
             angle+=0.0001+(volume*0.05)
             ctx.save()
             ctx.translate(canvas.width/2,canvas.height/2)
             ctx.rotate(angle)
             barsArray.forEach((el,i)=>{
                 el.update(samples[i])
                 el.draw(ctx,volume)
             })
             ctx.restore()
         }

        requestAnimationFrame(animate)
    }
    animate()
}
