import { component$, isDev, useContextProvider, useStore } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import "./global.css";
import { appContext } from "./store/appContext";

export default component$(() => {

  const appContextStore = useStore<any>({
    mainBrandName: ''
  });




  useContextProvider(appContext, appContextStore);

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
    
  );
});
