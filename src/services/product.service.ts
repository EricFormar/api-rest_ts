import { BadRequestError, NotFoundError } from "../errors/HttpError";
import { IProduct } from "../interfaces/IProduct";
import { ProductTestingRespository } from "../tests/repositories/ProductTestingRespository";
export class ProductService {
   constructor(
      private productRepository : ProductTestingRespository
   ) {}

    // Get all products
    async getAllProducts() {
        return this.productRepository.findAll()
    }

    // Get product by id
    async getProductById(id: number) {
        const product =  await this.productRepository.findById(id);
        if(product === null){
            throw new NotFoundError('Producto no encontrado.');
        }
        return product
    }

   // Create product
    async createProduct(product: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>) {

      for (const key in product) {
         if(product[key as keyof typeof product] === ""){
            throw new BadRequestError('No se ha podido crear el producto. Faltan datos.');
         }
      }
      
      return this.productRepository.create(product);
    }
   // Update product
   async updateProduct(product: Omit<Partial<IProduct>, 'createdAt' | 'updatedAt'>) {
      const productToUpdate = await this.productRepository.findById(product.id as number);
      
      if(!productToUpdate){
         throw new NotFoundError('Producto no encontrado.');
      }
      return this.productRepository.update(product);
   }

   // Delete product
   async deleteProduct(id: number) {
      const product = await this.productRepository.findById(id);
      
      if(!product){
         throw new NotFoundError('Producto no encontrado.');
      }
      return this.productRepository.delete(id);
   }

   // Search product
   async searchProducts(data: Partial<IProduct>) {      
      return this.productRepository.search(data);
   }
}