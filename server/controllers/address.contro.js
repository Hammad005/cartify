import Address from "../models/Address.js";
import User from "../models/User.js";

export const createAddress = async (req, res) => {
    try {
        const { id, address, appartment, city, postalCode, phone } = req.body;
        const data = {
            address,
            appartment,
            city,
            postalCode,
            phone,
        }

        if(id){
            const addressWithId = await Address.findByIdAndUpdate(id, data, {
                new: true
            });
            return res.status(200).json({addressWithId, message: "Address updated successfully"});
        }

        const addressExists = await Address.find({ userId: req.user._id });
        if (addressExists.length >= 3) {
            return res.status(400).send({ error: "You can't add more than 3 addresses" });
        }

        const newAddress = new Address({
            userId: req.user._id,
            address,
            appartment,
            city,
            postalCode,
            phone,
        });
        await newAddress.save();

        res.status(200).json({ message: "Address added successfully", newAddress });
    } catch (error) {
        console.error("Error creating address:", error.message);
        res.status(500).send({ error: error.message || "Internal Server Error" });
    }
};
export const getAddress = async (req, res) => {
    try {
        const user = req.user;
        const address = await Address.find({ userId: user._id });
        res.status(200).json(address);
    } catch (error) {
        console.error("Error fetching address:", error.message);
        res.status(500).send({ error: error.message || "Internal Server Error" });
    }
};
export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findByIdAndDelete(id);
        if (!address) {
            return res.status(404).json({ error: "Address not found or already deleted" });
        }
        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        console.error("Error deleting address:", error.message);
        res.status(500).send({ error: error.message || "Internal Server Error" });
    }
};