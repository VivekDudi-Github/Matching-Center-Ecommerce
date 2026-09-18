import { z } from "zod";

const StateList = [
  "Andaman and Nicobar Islands" ,
  "Andhra Pradesh", 
  "Arunachal Pradesh",
  "Assam",  
  "Bihar" ,
  "Chandigarh" , 
  "Chhattisgarh" ,
  "Dadra and Nagar Haveli and Daman and Diu" , 
  "Delhi"  , 
  "Goa" ,
  "Gujarat" ,
  "Haryana" ,
  "Himachal Pradesh" ,
  "Jammu and Kashmir" , 
  "Jharkhand" ,"Karnataka" ,
  "Kerala" ,
  "Ladakh" , 
  "Lakshadweep" , 
  "Madhya Pradesh" ,
  "Maharashtra" ,
  "Manipur" ,
  "Meghalaya" ,
  "Mizoram" ,
  "Nagaland" ,
  "Odisha" ,
  "Puducherry" , 
  "Punjab" ,
  "Rajasthan" ,
  "Sikkim" ,
  "Tamil Nadu" ,
  "Telangana" ,
  "Tripura" ,
  "Uttar Pradesh" ,
  "Uttarakhand" ,
  "West Bengal" ,
]


export const newOrderFormSchemaClient = z.object({
  name: z.string("Invalid Name").trim().min(2, "Name is required"),
  phone: z.string("Invalid phone").trim().length(10, "Phone number should be at least 10 digits"),
  address: z.string("Invalid address").trim().min(2, "The address is too short"),
 
  area: z.string("Invalid area").trim().min(2, "Area is required"),
  city: z.string("Invalid city").trim().min(2, "City is required"),
  state: z.enum(StateList, "State/UT invalids."),
  pincode: z.string("Invalid pincode").trim().length(6, "Pincode should be at 6 digits"),
  payment: z.enum(["UPI"], "invalid payment mode"),
  
  email: z.preprocess(
    val => (val === "" ? undefined : val),
    z.email("email format invalid").optional()
  ),
  notes: z.string("Invalid notes").trim().optional(),
  landmark: z.string("Invalid landmark").trim().optional(),
}); 

export const newOrderFormSchemaServer =  z.object({
  name: z.string("Invalid Name").trim().min(2, "Name is required"),
  phone: z.string("Invalid phone").trim().length(10, "Phone number should be 10 digits"),
  address: z.string("Invalid address").trim().min(2, "The address is too short"),
 
  area: z.string(" Invalid area").trim().min(2, "Area is required"),
  city: z.string(" Invalid city").trim().min(2, "City is required"),
  state: z.enum(StateList, "State/UT invalids."),
  pincode: z.string("Invalid pincode").trim().length(6, "Pincode should be at 6 digits"),
  payment: z.enum(["UPI"], "invalid payment mode"),
  
  email: z.preprocess(
    val => (val === "" ? undefined : val),
    z.email("email format invalid").optional()
  ),
  notes: z.string("Invalid notes").trim().optional(),
  landmark: z.string("Invalid landmark").trim().optional(),
  
  items: z.array(z.object({
    productId: z.coerce.number("invalid productId").min(1, "Product id is required"),
    productName: z.string("invalid productName").trim().min(1, "Product name is required"),
    productPrice: z.coerce.number("invalid productPrice").positive("Product price must be greater than 0"),
    color: z.array(z.object({
      colorId: z.coerce.number("invalid colorId").min(1, "Color id is required"),
      colorName: z.string("invalid colorName").trim().min(1, "Color name is required"),
      quantity: z.coerce.number("invalid colorName").positive("Quantity must be greater than 0")
    }))
  }), "invalid items format")
}); 

