import { browser } from '$app/env';
import type { Item, Print, Size } from '$lib/types';
import { get, writable } from 'svelte/store';

export const createWritableStore = (key: string, startValue: any) => {
  const { subscribe, set } = writable(startValue);
  
  return {
    subscribe,
    set,
    useLocalStorage: () => {
      const json = browser && localStorage.getItem(key);
      if (json && json !== 'undefined') {
        set(JSON.parse(json));
      }
      
      subscribe(current => {
        browser && localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}

export const cart = createWritableStore('cart', []);


export const changeCart = {
  addToCart(print: Print | Item, quantity: number, size: Size): void {
    const previousStore: Item[] = get(cart)
    
    let match = false;
    const newStore = previousStore.map(item => {
      if(item._id === print._id && item.size.size === size.size) {
          match = true;
          item.quantity = quantity;
      }    
      return item;
    })
    
    if(!match) {
        newStore.push({
            size, title: print.title, slug: print.slug, quantity, _id: print._id
        })
    }
    cart.set(newStore)
  },
  removeFromCart(item: Item): void {
    const previousStore: Item[] = get(cart)
    const newStore = previousStore.filter(i => i._id !== item._id)
    cart.set(newStore)
  }
}