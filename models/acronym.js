import { Schema as _Schema, model } from "mongoose";
import mongooseFuzzySearching from 'mongoose-fuzzy-searching';
import mongoosePaginate from 'mongoose-paginate-v2';
import random from 'mongoose-simple-random';

const acronymSchema = _Schema(
    {
        acronym: {
            type: String,
            required: true,
            trim: true,
          },
          definition: {
            type: String,
            required: true,
            trim: true,
          },
    },
    { timestamps: true }
);

acronymSchema.plugin(mongooseFuzzySearching, { fields: ['acronym'] });
acronymSchema.plugin(mongoosePaginate);
acronymSchema.plugin(random);

const Acronym = model("Acronym", acronymSchema);

module.exports = { Acronym };



