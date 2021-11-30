import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export default function checkout(req, res) {
  console.log(req.body);
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:3000/cart",
      failure: "http://localhost:3000/api/feedback",
      pending: "http://localhost:3000/api/feedback",
    },
    auto_return: "approved",
  };
  mercadopago.preferences
    .create(preference)
    .then((response) => {
      res.json({ id: response.body.id });
    })
    .catch((err) => console.log(err));
}
