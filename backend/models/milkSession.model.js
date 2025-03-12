const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const milkingSessionSchema = new Schema({
   startTime:{
      type: Date,
      required: true
   },
   endTime:{
      type: Date,
      required: true
   },
   duration:{
      type: Number,
      required: true
   },
   milkQuantity:{
      type: Number,
      required: true
   }
},{
    timestamps: true
});

milkingSessionSchema.plugin(AutoIncrement, { inc_field: 'milkingSessionId' });

const MilkingSession = mongoose.model('MilkingSession', milkingSessionSchema);

module.exports = MilkingSession;