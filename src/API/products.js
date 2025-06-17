import axios from 'axios'

export async function getProducts() {
    const api = "https://react-trainee-api.onrender.com/get/products";

    try {
        const response = await axios.get(api);
        // console.log(response.data);
        return response.data['products'];
    } catch (error) {
        console.log(error);
    }
}

export async function updateProducts(product) {
    const api = "https://react-trainee-api.onrender.com/update/product";

    try {
        const response = await axios.put(api, product);
        return response.data;
    } catch (error) {
        console.error("Error updating product: ", error);
        throw error;
    }

}

export async function deleteProduct(id) {
    const api = 'https://react-trainee-api.onrender.com/delete/product/'
    try {

        const response = axios.delete(api + id);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export async function createProduct(product) {
    const api = 'https://react-trainee-api.onrender.com/create/product';

    try {
        const response = await axios.post(api, product);
        return response.data;
    } catch (error) {
        console.error("Error creating product: ", error);
        throw error;
    }
}

