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
    <div>
      <h2>{product?.name}</h2>
      <p>{product?.description}</p>
      <p>Price: {product?.price}</p>
    </div>
  );
}

export default Product;
