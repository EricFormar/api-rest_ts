import Status, { StatusAttributes } from "../../database/models/status";
import { getRandomNumber } from "../../utils/getRandomNumber";

  export const getStatusMock = async (data : Partial<StatusAttributes>) => {

    const {id, name} = data;

      const newStatus = await Status.create({
        id : id || getRandomNumber(1,10),
        name : name || "Test Status",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return newStatus;  
  }