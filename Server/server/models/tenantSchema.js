
const mongoose=require('mongoose');
let Schema=mongoose.Schema;

let tenantSchema=new Schema({
    tenantId:{type:String},
    tenantName:{type:String},
    applicationName:{type:String},
    applicationSubTitle:{type:String},
    applicationIcon:{type:String},
    splash:{
        show:Boolean,
        headerIcon:String,
        headerText:String,
        headerHtml:String,
        messageText:String
    },
     locale:{
        language:String,
        currency:{
            name:String,
            symbol:String,
        },
        unitSystem:String,
        dateFormat:String,
   
    },
    mapOptions:{
        scalebarStyle:String,
        scalebarUnit:String,
        basemaps:[],
        overviewMap:{
            serviceURL:String,
        },
        layers:[],
        advancedSearchQueries:[{ index:Number,layer:String,label:String,assessQuery:String,defaultValue:String}]
    },
    basemaps:[],
    layers:[],
    basemapLayers:[]
})

module.exports=mongoose.model('tenantSchema',tenantSchema,'tenants');