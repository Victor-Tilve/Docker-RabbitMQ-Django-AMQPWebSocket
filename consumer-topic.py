import pika
import sys

credentials = pika.credentials.PlainCredentials(
    username="USV",
    password="USV$1234"
)
parameters = pika.ConnectionParameters(
    host='localhost', # tried all above options
    port=5673,
    credentials=credentials,
    heartbeat=10,
)

connection = pika.BlockingConnection(parameters)
channel = connection.channel()

channel.exchange_declare(exchange='fpx', exchange_type='topic', durable='True')

result = channel.queue_declare('', exclusive=True)
queue_name = result.method.queue

# binding_keys = sys.argv[1:]
binding_keys = ["sensores.usv"]
if not binding_keys:
    sys.stderr.write("Usage: %s [binding_key]...\n" % sys.argv[0])
    sys.exit(1)

for binding_key in binding_keys:
    channel.queue_bind(
        exchange='fpx', queue=queue_name, routing_key=binding_key)

print(' [*] Waiting for logs. To exit press CTRL+C')


def callback(ch, method, properties, body):
    print(" [x] %r:%r" % (method.routing_key, body))


channel.basic_consume(
    queue=queue_name, on_message_callback=callback, auto_ack=False)

channel.start_consuming()