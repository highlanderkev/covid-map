import mitt, { Emitter } from 'mitt'
import { Events } from '@/models'

const eventEmitter: Emitter<Events> = mitt<Events>()

export default eventEmitter
