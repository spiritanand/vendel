function Product({
  product,
}: {
  product:
    | {
        id: string;
        name: string;
        price: number;
        description: string;
        userId: string;
      }
    | undefined;
}) {
  return (
    <div className="product">
      <h2>{product?.name}</h2>
      <p className="product-desc">{product?.description}</p>
      <p className="product-price">
        Total: <span className="product-price-value">{product?.price} SOL</span>
      </p>
    </div>
  );
}

export default Product;
