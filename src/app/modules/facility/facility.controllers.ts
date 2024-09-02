import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { FacilityServices } from "./facility.services";

const getAllFacility = async (req: Request, res: Response) => {
  const facilities = await FacilityServices.getAllFacility(req.query);
  if (!facilities) {
    res.status(400).json({
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    message: "All Facility Retrieved successfully",
    data: facilities,
  });
};

const getFacilityById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const facility = await FacilityServices.getFacilityById(id);
  if (!facility) {
    res.status(400).json({
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    message: "Facility Retrieved successfully",
    data: facility,
  });
};

const createFacility = async (req: Request, res: Response) => {
  const facility = req.body;
  const facilities = await FacilityServices.createFacility(facility);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Facility Created successfully",
    data: facilities,
  });
};

const updateFacility = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await FacilityServices.updateFacility(id, body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Facility updated successfully",
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacilityServices.deleteFacility(id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Facility deleted Successfully",
    data: result,
  });
});

export const FacilityControllers = {
  getAllFacility,
  getFacilityById,
  createFacility,
  updateFacility,
  deleteFacility,
};
