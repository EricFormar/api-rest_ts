import { CategoryAttributes } from "../database/models/category";

export interface CategoryPayload extends Partial<CategoryAttributes> {
   name : string;
   image : string;
}