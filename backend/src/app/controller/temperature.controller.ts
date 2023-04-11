import { io, Socket } from 'socket.io-client'
import Subscriber from '../../utils/subscriber'
import { TemperatureModel } from '../model/device.model'

class TemperatureController implements Subscriber {
    private socket: Socket
    private name: String = 'temperatureController'

    constructor() {
        this.socket = io('http://localhost:3000')

        this.socket.on('connect', () => {
            this.socket.emit('join controller room', this.name)
        })
    }

    public update(context): void {
        this.socket.emit('transmission', context)
        // let model = new TemperatureModel({
        //     value: context.data.temperature,
        // })
        // model.save().then(() => console.log('updated'))
        // TemperatureModel.countDocuments().then(data => console.log(data))
    }

    public getSocket(): Socket {
        return this.socket
    }
}

export default TemperatureController
