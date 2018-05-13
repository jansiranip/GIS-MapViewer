var config = {
	name:'NGEMS',
	version:'0.0.1',
	expressPort: process.env.PORT||3000,
	mongodb: {
			defaultDatabase: "NGEMS",
			defaultCollection: "tenants",
			defaultUri: "mongodb://localhost:27017/NGEMS"
		}
	
};

module.exports = config;



