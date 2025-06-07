
export const Pricingplans = [
  {
    name: "Basic",
    id: "basic",
    price: 9,
    description: " basic plan for occasional users",
    items: [
      "5 PDF summaries",
      "basic processing",
      "email support",
      "markdown export",
    ],
    paymentLink:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_3cIfZh811arG9xhcLCeQM01"
        : "https://buy.stripe.com/test_3cIfZh811arG9xhcLCeQM01",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1RTRclFVcghxbGQ726B22zht"
        : "price_1RTRclFVcghxbGQ726B22zht",
  },

  {
    name: "Pro",
    id: "pro",
    price: 19,
    description: "best for regular users and teams",
    items: [
      "unlimited PDF summaries",
      "priority processing",
      "24/7 support",
      "markdown export",
    ],
    paymentLink:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_aFaaEXepp57mbFpfXOeQM00"
        : "https://buy.stripe.com/test_aFaaEXepp57mbFpfXOeQM00",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1RTRdmFVcghxbGQ70cOP98sH"
        : "price_1RTRdmFVcghxbGQ70cOP98sH",
  },
];