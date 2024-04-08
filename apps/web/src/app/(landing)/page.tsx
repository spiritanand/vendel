import VendelCheckout from "@spiritanandio/vendel-react/VendelCheckout.tsx";
import Header from "@/components/layout/Landing/header.tsx";

function Page() {
  return (
    <>
      <Header />
      <div>DESC</div>

      <VendelCheckout productId="gie0244w1kxwjtq3wog6qsfc" />
    </>
  );
}

export default Page;
