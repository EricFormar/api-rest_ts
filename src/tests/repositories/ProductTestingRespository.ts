import { IProduct } from "../../interfaces/IProduct";
import { IProductRepository } from "../../interfaces/IProductRepository";
import { getRandomNumber } from "../../utils/getRandomNumber";

// Esto simularía una base de datos en memoria

export class ProductTestingRespository implements IProductRepository {
    constructor(
        private products : IProduct[] = []
    ){
        this.products = products
    }
    async findAll() : Promise<IProduct[]> {
        return [...this.products]; // Retorna una copia para evitar mutaciones externas
    }
    async findById(id: number) : Promise<IProduct | null> {        
        return this.products.find(product => product.id === id) || null;
    }
    async create(product: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>) : Promise<IProduct> {
        const newProduct : IProduct = {
            id : getRandomNumber(1,1),
            createdAt : new Date,
            updatedAt : new Date,
            ...product
        }
        this.products.push(newProduct);
        return newProduct;
    }
    async update(dataToUpdate: Partial<IProduct>) : Promise<IProduct> {
        const index = this.products.findIndex((product) => product.id === dataToUpdate.id);
        
        this.products[index] = {
            ...this.products[index],
            ...dataToUpdate,
            updatedAt : new Date
        };
        
        return this.products[index];
    }
  
    async delete(id: number) : Promise<boolean> {
        const index = this.products.findIndex(product => product.id === id);
        this.products.splice(index, 1);
        return true;
    }

    async search(data: Partial<IProduct>) : Promise<IProduct[]> {
        
        let productsFiltered = [...this.products]

        if(data.name){
            productsFiltered = productsFiltered.filter(product => product.name.toLowerCase().includes(data.name!.toLowerCase()));
        }
        if(data.description){
            productsFiltered = productsFiltered.filter(product => product.description.toLowerCase().includes(data.description!.toLowerCase()));
        }
        if(data.subcategoryId){
            productsFiltered = productsFiltered.filter(product => product.subcategoryId === data.subcategoryId);
        }
        if(data.sectionId){
            productsFiltered = productsFiltered.filter(product => product.sectionId === data.sectionId);
        }
        if(data.brandId){
            productsFiltered = productsFiltered.filter(product => product.brandId === data.brandId);
        }
        if(data.categoryId){
            productsFiltered = productsFiltered.filter(product => product.categoryId === data.categoryId);
        }
        
        return productsFiltered
    }

    async count() : Promise<number> {
        return this.products.length;
    }
}