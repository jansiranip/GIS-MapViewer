module.exports = function (app) {
    var tenantModel = require("../models/tenantSchema");
    var basemapModel = require("../models/basemapSchema")
    var layerModel = require("../models/layerSchema");

    //Get Tenants Information
    var tenantData, tenantBasemaps, tenantLayers, basemapData, layerData;
    app.get('/NGEM/:tenantId', function (req, res) {
        console.log("tenantId: "+req.params.tenantId);
        var tenantIdParams=req.params.tenantId;
      tenantModel.find({tenantId:{"$in":tenantIdParams}}).exec()
            .then(function (tenantResponse) {             
                tenantData = tenantResponse[0];               
                var result=[];
                if (tenantData) {                  
                    tenantLayers = tenantData.mapOptions.layers;
                    return layerModel.find({layerId: { "$in": tenantLayers }}).exec()
                    .then(function(data){
                        layerData = data;
                        return [tenantData,layerData]
                    })                   
                }

            })
            .then(function(result){
                var tempTenantData = result[0];
                tenantBasemaps = tempTenantData.mapOptions.basemaps;
                return basemapModel.find({basemapId:{"$in":tenantBasemaps}}).exec()
                .then(function(data){
                    basemapData = data;
                    result.push(basemapData);
                    return result;
                })
            })
            .then(function(result){
                var tempBaseData =[];
                tempBaseData=result[2];
                var basemapLayerIds=[];
                tempBaseData.find(function(obj){basemapLayerIds.push(obj.layerId)});                
                return layerModel.find({layerId:{"$in":basemapLayerIds}}).exec()
                .then(function(data){
                    var tempbasemapData = data;
                    result.push(tempbasemapData);                   
                    return result;
                })               
            })
          
            .then(function (result) {
               // console.log("final result");
               // console.log(result);
                var tenantDataFinal = result[0];
                var layerData1 = result[1];
               
                tenantDataFinal["layers"]=layerData1;
                var basemapData1 = result[2];
                var basemapLayers=result[3];               
                tenantDataFinal["basemaps"]=basemapData1;
                tenantDataFinal["basemapLayers"]=basemapLayers;               
                res.json(tenantDataFinal);
            }) 
            .then(undefined, function (err) {
                //Handle error
            })    
                   
  
    });

app.get('/NGEM/Search',function(req,res){
    console.log(req);
    res.json("Welcome");
});

app.get('/NGEM/Identify',function(req,res){
    res.json("Identify");
});
}