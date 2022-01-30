import { createWritableStore } from "./cart";
const defaultContact =  {firstName: '', lastName: '', email: '', address: {streetAdress1: '', co: '', postalCode: undefined, city: '',country: '', phone: '' }};
export const contactInfo = createWritableStore('contactInfo', defaultContact);