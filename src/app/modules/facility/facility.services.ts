import IFacility from "./facility.interface";
import { Facility } from "./facility.model";

const getAllFacility = async () => {
  const result = await Facility.find().lean();
  return result;
};

const createFacility = async (facility: IFacility) => {
  const result = await Facility.create(facility);
  return result;
};

const updateFacility = async (id: string, payload: Partial<IFacility>) => {
  const result = await Facility.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteFacility = async (id: string) => {
  const result = await Facility.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const FacilityServices = {
  getAllFacility,
  createFacility,
  updateFacility,
  deleteFacility,
};
