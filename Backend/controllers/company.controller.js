import { Company } from "../models/company.model.js";

//to register a new company by a recruiter
export const registerCompany = async (req, res) => {
  try {
    const { companyName, description, location, website } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register same company",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
      ...(description && { description }), // Add description if provided
      ...(location && { location }), // Add location if provided
      ...(website && { website }), // Add website if provided
    });
    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "kuch to gadbad hai daya",
      success: true,
    });
  }
};

//to get all the companies whose jobs are posted by a recruiter
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: true,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//getting the company information just by telling the id of the company
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id; //taking the id from the url itself
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

//updating the company information by using the comapany id
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    //!idhar cloudinary aaega

    const updateData = { name, description, website, location };
    //taking the comapny id from the url itself
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
