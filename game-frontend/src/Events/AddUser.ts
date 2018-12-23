import EventsAbstract from "./EventsAbstract";

let instance: AddUser = null;

export interface AddUserOptionsInterface {
    token: string,
}

class AddUser extends EventsAbstract {
    public static getInstance(): AddUser {
        if (null === instance) {
            instance = new this();
        }

        return instance;
    }
}

const event: EventsAbstract = AddUser.getInstance();

export default event;
