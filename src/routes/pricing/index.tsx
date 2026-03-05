import { component$ } from "@builder.io/qwik";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { Pricing } from "~/components/pricing/cardModal/pricing";




export default component$(() => {
  return (
    <>
      <HomeHeader />
      <Pricing />
    </>
  );
});
