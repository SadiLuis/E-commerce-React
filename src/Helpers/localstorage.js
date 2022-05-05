

export const getCartLocalStorage = () => {
  try {
    
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : {
      products: [],
      precioTotal: 0
    };
  } catch (err) {
    console.log(err);
  }
};

export const saveCartLocalStorage = (cart) => {
  cart = JSON.stringify(cart);
  localStorage.setItem('cart', cart);
};


export const getProductLocalStorage = () => {
  try {
    
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : []
  } catch (err) {
    console.log(err);
  }
};

export const saveProductLocalStorage = (product) => {
  product = JSON.stringify(product);
  localStorage.setItem('products', product);
};

export const getCartDb = () => {
  try {
    
    const cart = localStorage.getItem('cartDb');
    return cart ? JSON.parse(cart) : {
      products: [],
      precioTotal: 0
    };
  } catch (err) {
    console.log(err);
  }
};

export const saveCartDb = (cart) => {
  cart = JSON.stringify(cart);
  localStorage.setItem('cartDb', cart);
};