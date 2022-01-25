import { browser } from '$app/env';
import { writable } from 'svelte/store';

const createWritableStore = (key, startValue) => {
  const { subscribe, set } = writable(startValue);
  
  return {
    subscribe,
    set,
    useLocalStorage: () => {
      const json = browser && localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }
      
      subscribe(current => {
        browser && localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}

export const cart = createWritableStore('cart', []);



