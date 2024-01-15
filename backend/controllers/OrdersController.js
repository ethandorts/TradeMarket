import AsyncHandler from "../middleware/AsyncHandler.js";
import Order from '../models/OrderModel.js';

//@desc Creates a new order 
//@route POST /api/orders
//@access Private
const CreateOrder = AsyncHandler (async (req, res) => {
    const {
        orderItems,
        ShippingAddress,
        PaymentMethod,
        itemsPrice,
        TaxPrice,
        ShippingPrice,
        TotalPrice
    } = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No ordered items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x.product,
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
    }
});

//@desc When logged in, you can view your orders
//@route GET /api/orders/myorders
//@access Private
const GetMyOrders = AsyncHandler (async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

//@desc Get an Order By ID
//@route GET /api/orders/:id
//@access Private
const GetOrderById = AsyncHandler (async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name', 'email');

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
const UpdateOrderToBePaid = AsyncHandler (async (req, res) => {
    res.send('Update order that is still to be paid');
});

//@desc Update an order that is yet to be delivered
//@route PUT /api/orders/:id/deliver
//@access Private
const UpdateOrderToBeDelivered = AsyncHandler (async (req, res) => {
    res.send('Update order that is still to be delivered');
});

//@desc Get all orders
//@route GET /api/orders
//@access Admin
const GetAllOrders = AsyncHandler (async (req, res) => {
    res.send('Get All Orders');
});


export { CreateOrder, GetMyOrders, GetOrderById, UpdateOrderToBePaid, UpdateOrderToBeDelivered, GetAllOrders};


