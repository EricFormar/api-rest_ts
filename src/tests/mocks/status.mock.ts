import Status, { StatusAttributes } from "../../database/models/status";

  export const getStatusMock = async (data : Partial<StatusAttributes>) => {

    const {id = 1, name} = data;

      const newStatus = await Status.create({
        id,
        name : name || "Test Status",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return newStatus;  
  }