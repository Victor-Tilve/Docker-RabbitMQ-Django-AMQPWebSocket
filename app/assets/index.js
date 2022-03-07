import AMQPClient from '@cloudamqp/amqp-client/dist/amqp-websocket-client.mjs'

const textarea = document.getElementById("textarea")
const input = document.getElementById("message")

const tls = window.location.scheme === "https:"

//const url = `${tls ? "wss" : "ws"}://${window.location.host}`
const url = `${tls ? "wss" : "ws"}://127.0.0.1:15671/ws/amqp`
// const url = " https://127.0.0.1:15671"

const exchange = "fpx"
const topic = "sensores.usv"

const start= async(url,exchange,topic)=> {
  try {        
    const amqp = new AMQPClient(url, "/", "guest", "guest") //vhost, username, password, name, platform
    const connection =  amqp.connect().then(async (connection)=>{
      
      const channel = await connection.channel()    
      await channel.exchangeDeclare(exchange, "topic", { durable: true });
      const queue  = "test" 
      await channel.queueDeclare(queue,{ exclusive: true, durable:false });
      //const { queue } = await channel.queueDeclare("test",{ exclusive: true, durable:false });
      // Enviar desde formulario
      attachPublish(channel,exchange,topic)    
      await channel.queueBind(queue, exchange, topic); 
      await channel.basicConsume(
        queue,{ noAck: true },
        (message) => {
          const body = message.bodyToString()
          console.log(`from Queue:${queue}, content: ${body}`);        
          textarea.value += body + "\n"
        }      
      );  
    },(error)=>{
      
      console.log("Ha ocurrido un error al conectarse al broker", error)
    })

  } catch (err) {
    console.error("Error", err, "reconnecting in 1s")
    disablePublish()
    setTimeout(start, 1000)
  }
}

function attachPublish(ch,exchange,topic) {
  
  document.forms[0].onsubmit = async (e) => {
    e.preventDefault()
    
    try {
      await ch.basicPublish(exchange,topic, Buffer.from(input.value), { contentType: "text/plain" })
    } catch (err) {
      console.error("Error", err, "reconnecting in 1s")
      disablePublish()
      setTimeout(start, 1000)
    }
    input.value = ""
  }
}

function disablePublish() {
  document.forms[0].onsubmit = (e) => { alert("Disconnected, waiting to be reconnected") }
}

start(url,exchange,topic)