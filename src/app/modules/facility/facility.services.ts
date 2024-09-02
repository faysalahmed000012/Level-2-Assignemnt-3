import QueryBuilder from "../../../builder/queryBuilder";
import IFacility from "./facility.interface";
import { Facility } from "./facility.model";

const getAllFacility = async (query: any) => {
  const facilityQuery = new QueryBuilder(
    Facility.find({ isDeleted: false }),
    query
  )
    .filter()
    .paginate();

  const meta = await facilityQuery.countTotal();

  const facilities = await facilityQuery.modelQuery;

  return { facilities, meta };
};

const getFacilityById = async (id: string) => {
  const result = await Facility.findOne({ _id: id });
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
  getFacilityById,
  createFacility,
  updateFacility,
  deleteFacility,
};
