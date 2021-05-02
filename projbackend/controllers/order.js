const { Order, ProductCart } = require("../models/order")

exports.getOrderById = (req, res, next, id)=>{

    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, oreder)=>{
        if(err){
            return res.status(400).json({
                error: "No orders found in DB"
            })
        }

        req.order = oreder;
        next();
    })
}

exports.createOrder = (req, res) => {
    try{
    
    req.body.order.user = req.profile;
      console.log(req.body.order)
  
    const order = new Order(req.body.order);
    console.log(order)
    order.save((err, order) => {
    console.log(err)
  
      if (err || !order) {
        return res.status(400).json({
          error: "Failed to save your order in DB"
        });
      }
      res.json(order);
    });
    }
    
    catch(err){
    console.log(err)
    }
  };

exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name")
    .exec((err, order)=>{
        if(err){
            return res.status(400).json({
                error: "No Orders found in DB"
            })
        }

        res.json(order);
    })
}

exports.getOrderStatus = (req, res)=>{

    res.json(Order.schema.path("status").enumValues);

}

exports.updateStatus = (req, res)=>{

    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order)=>{
            if(err){
                return res.status(400).json({
                    error: "Cannot update order status"
                });
            }
            res.json(order);
        }
    )

}
