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


export const newOrderFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().length(10, "Phone number should be at least 10 digits"),
  address: z.string().min(2, "The address is too short"),
 
  area: z.string().min(2, "Area is required"),
  city: z.string().min(2, "City is required"),
  state: z.enum(StateList, "State/UT invalids."),
  pincode: z.string().length(6, "Pincode should be at 6 digits"),
  payment: z.enum(["UPI Payment"], "invalid payment mode"),
  
  email: z.preprocess(
    val => (val === "" ? undefined : val),
    z.email("email format invalid").optional()
  ),
  notes: z.string().optional(),
  landmark: z.string().optional(),
}); 