declare module "events" {
    namespace EventEmitter {
        class EventEmitter extends NodeJS.EventEmitter {}
    }
    class EventEmitter extends NodeJS.EventEmitter {}
    export = EventEmitter;
}
