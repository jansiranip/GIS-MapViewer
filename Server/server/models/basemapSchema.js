const mongoose=require('mongoose');
let Schema=mongoose.Schema;

let basemapSchema=new Schema({
    basemapId:String,
    key:String,
    name:String,
    thumbnail:String,
    useForMobile:Boolean,
    layerId:String,
    zIndex:Number,
    visible:Boolean
    }
);

module.exports=mongoose.model('basemapSchema',basemapSchema,"basemaps")
