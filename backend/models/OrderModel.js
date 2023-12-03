import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
            name: {
                type: String, 
                required: true
            },
            quantity: {
                type: Number, 
                required: true 
            },
            image: {
                type: String, 
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        }
    ],
    ShippingAddress: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String, 
            required: true
        },
        PostalCode: {
            type: String,
            required: true,
        }, 
        Country: {
            type: String,
            required: true,
        }
    },
    PaymentMethod:{
        type: String,
        required: true,
    },
    PaymentResults: {
        ID: {
            type: String
        },
        Status: {
            type: String,
        },
        UpdateTime: {
            type: String
        },
        EmailAddress: {
            type: String
        },
    },
    TotalOfItemsPrice: {
        type: Number,
        required: true, 
        default: 0.0,
    },
    TaxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    ShippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    TotalPrice: {
        type: Number, 
        required: true,
        default: 0.0,
    },
    IsPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    PaidAt: {
        type: Date,
    },
    IsDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    DeliveredAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;