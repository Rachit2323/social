const app = require("./app");
const { connectDatabase } = require("./config/database");
const cloudinary = require("cloudinary");
connectDatabase();

cloudinary.config({
  cloud_name:"dyedquiym" ,
  api_key:"154218675918319" ,
  api_secret:"d_TyO6pmhjEMcj2-CUooPs93bhI" 
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
