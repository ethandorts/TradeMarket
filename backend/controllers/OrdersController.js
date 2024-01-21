import AsyncHandler from "../middleware/AsyncHandler.js";
import Order from '../models/OrderModel.js';

//@desc Creates a new order 
//@route POST /api/orders
//@access Private
const CreateOrder = AsyncHandler(async (req, res) => {
    const {
        orderItems,
        ShippingAddress,
        PaymentMethod,
        itemsPrice,
        TaxPrice,
        ShippingPrice,
        TotalPrice,
    } = req.body;

    console.log(req.body);
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            ShippingAddress,
            PaymentMethod,
            itemsPrice,
            TaxPrice,
            ShippingPrice,
            TotalPrice,
        });
    const OrderCreated = await order.save();
    res.status(201).json(OrderCreated);
}});

//@desc When logged in, you can view your orders
//@route GET /api/orders/myorders
//@access Private
const GetMyOrders = AsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

//@desc Get an Order By ID
//@route GET /api/orders/:id
//@access Private
const GetOrderById = AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc Update an order that is still to be paid
//@route PUT /api/orders/:id/pay
//@access Private
const UpdateOrderToBePaid = AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
    const UpdatedOrder = await order.save();
    res.status(200).json(UpdatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc Update an order that is yet to be delivered
//@route PUT /api/orders/:id/deliver
//@access Private
const UpdateOrderToBeDelivered = AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Cannot find orders');
    }
});

//@desc Get all orders
//@route GET /api/orders
//@access Admin
const GetAllOrders = AsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
});

export {
    CreateOrder,
    GetMyOrders,
    GetOrderById,
    UpdateOrderToBePaid,
    UpdateOrderToBeDelivered,
    GetAllOrders
};
