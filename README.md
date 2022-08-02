# sanaparlour

#table create

# node_modules/.bin/sequelize model:generate --name Users --attributes loginName:string,loginPwd:string,firstName:string,lastName:string,isActive:boolean,adminLevel:integer,pwdNeedsReset:boolean,loginToken:string,tokenExpires:integer,lastLogin:integer,usertype:integer;

# node_modules/.bin/sequelize model:generate --name UserEquipments --attributes name:string,pathMode:string,sourceLat:string,sourceLong:string,destinationLat:string,destinationLong:string,speed:integer,journeyStart:boolean,journeyEnd:boolean;

# node_modules/.bin/sequelize model:generate --name Tower --attributes name:string,lat:string,long:string;

# node_modules/.bin/sequelize model:generate --name Customer --attributes email:string,password:string,firstName:string,lastName:string,isActive:boolean,address:text,verified:boolean,loginToken:string,tokenExpires:integer,lastLogin:integer,usertype:integer;