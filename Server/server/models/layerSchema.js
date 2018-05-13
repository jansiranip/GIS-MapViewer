const mongoose=require("mongoose");
let Schema=mongoose.Schema;

let layerSchema=new Schema({
    layerId:String,
    type:String,
    sourceType:String,
    isCached:Boolean,
    tileSize:Number,
    mapServerURL:String,
    tileURL:String,
    projection:String,
    maxZoom:Schema.Types.Mixed,
    wrapX:Boolean
});

module.exports=mongoose.model("layerSchema",layerSchema,"layers");