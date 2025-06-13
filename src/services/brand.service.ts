import Brand from "../database/models/brand";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors/HttpError";

export type BrandModelRequest = Pick<Brand, "name" | "image">;

export class BrandService {

   // Get all brands
   async getAllBrands() {
      try {
         const brands = await Brand.findAll();
         return brands;
      } catch (error) {
         throw error;
      }
   }
   // Get brand by id
   async getBrandById(id : number){
      try {
         const brand = await Brand.findByPk(id);
         if(!brand){
            throw new NotFoundError("Brand not found");
         }
         return brand; 
      }  
      catch (error) {
         throw error;
      }
   }
   // Create brand
   async createBrand(brand : Brand){
      try {
         if(brand.name === "" || brand.image === ""){
            throw new  BadRequestError("Bad Request");
         }
         const newBrand = await Brand.create(brand);
         return newBrand;
      }catch (error) {
         throw error;
      }
   }
   // Update brand
   async updateBrand(id:number, data : Brand){
      
      try {
         if(data.name === "" || data.image === ""){
            throw new  BadRequestError("Bad Request");
         }

         const brand = await Brand.findByPk(id);
         if(!brand){
            throw new NotFoundError("Brand not found");
         }

         const updatedBrand = await Brand.update(data, {
            where: {
               id,
            },
         });
         
         return updatedBrand;
      }catch (error) {
         throw error;
      }
   }
   // Delete brand 
   async deleteBrand(id : number){
      try {
         const brand = await Brand.findByPk(id);
         if(!brand){
            throw new NotFoundError("Brand not found");
         }
         const deletedBrand = await Brand.destroy({
            where: {
               id,
            },
         });
         return deletedBrand;
      }catch (error) {
         throw error;
      }
   }
}