import { component$ } from "@builder.io/qwik";
import { Footer } from "~/components/global/footer/footer";
import { HomeHeader } from "~/components/global/header/homeHeader";


export default component$(() => {
  return (
    <>
      <HomeHeader />

    <Footer/>
    </>
  );
});
