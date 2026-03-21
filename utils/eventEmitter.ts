import mitt from 'mitt'
import type { Emitter } from 'mitt'
import type { Events } from '@/models'

const eventEmitter: Emitter<Events> = mitt<Events>()

export default eventEmitter
