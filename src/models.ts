import mongoose from "mongoose";

interface IItem extends Document {
  _id: string; // Ensure that _id is represented as a string
  name: string;
  price: number;
}

const ItemSchema = new mongoose.Schema<IItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

ItemSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id; // Rename _id to id
    delete ret._id; // Remove _id from output
    delete ret.__v; // Remove __v from output
  },
});

const Item = mongoose.model("Item", ItemSchema);

export { Item, ItemSchema };
