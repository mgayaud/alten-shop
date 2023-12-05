const db = require('./db');
const helper = require('../helper');

async function getAllProducts(){
  const rows = await db.query(
    `SELECT id, code, name, description, price, quantity, inventoryStatus, category, image, rating
    FROM products`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function createNewProduct(product){
  const result = await db.query(
    `INSERT INTO products
    (code, name, description, price, quantity, inventoryStatus, category, image, rating)
    VALUES
    ('${product.code}', '${product.name}', '${product.description}', '${product.price}', '${product.quantity}', '${product.inventoryStatus}', '${product.category}', '${product.image}', '${product.rating}')`
  );

  let message = 'Error in creating product';

  if (result.affectedRows) {
    message = 'Product created successfully';
  }

  return {message};
}

async function getProduct(id){
  const rows = await db.query(
    `SELECT id, code, name, description, price, quantity, inventoryStatus, category, image, rating
    FROM products
    WHERE id=${id}`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function updateProduct(id, product){
  const result = await db.query(
    `UPDATE products
    SET code="${product.code}", name="${product.name}", description="${product.description}", price="${product.price}", quantity="${product.quantity}",
    inventoryStatus="${product.inventoryStatus}", category="${product.category}", image="${product.image}", rating="${product.rating}"
    WHERE id=${id}`
  );

  let message = 'Error in updating product';

  if (result.affectedRows) {
    message = 'Product updated successfully';
  }

  return {message};
}

async function removeSelectedProducts(ids) {
  const result = await db.query(
    `DELETE FROM products WHERE id IN (${ids.toString()})`
  );

  let message = 'Error in deleting selected products';

  if (result.affectedRows) {
    message = 'Selected products deleted successfully';
  }

  return {message};
}

async function removeProduct(id){
  const result = await db.query(
    `DELETE FROM products WHERE id=${id}`
  );

  let message = 'Error in deleting product';

  if (result.affectedRows) {
    message = 'Product deleted successfully';
  }

  return {message};
}

module.exports = {
  getAllProducts,
  createNewProduct,
  getProduct,
  updateProduct,
  removeProduct,
  removeSelectedProducts
}