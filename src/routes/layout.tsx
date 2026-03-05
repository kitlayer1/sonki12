
import { component$, Slot } from '@builder.io/qwik';
import { DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { get } from 'http';
import { resolve } from 'path';
import { getMetaData } from '~/services/services';

export const useMetaTags = routeLoader$(async(requestEvents) => {

    let result = await getMetaData(requestEvents.url.pathname);
    if(result && result.success){
        return result.success;
    }
    

   
});

export default component$(() => {
  return <div>
    <Slot />
  </div>
});


export const head: DocumentHead = ({resolveValue,url}) => {
    const metaData = resolveValue(useMetaTags);
  
    return {
      title: metaData?.title || 'Default Title',
      meta: [
        {
          name: 'description',
          content: metaData?.description ,
        },
        {
          property: 'og:title',
          content: metaData?.title ,
        },
        {
          property: 'og:description',
          content: metaData?.description ,
        },
        {
            property: 'og:url',
            content: url.href,
        },
        {
            property: 'og:image',
            content: metaData?.image || '/default-image.png',
        },
        {
            name: 'canonical',
            content: url.href
        },
        {
            name:"og:type",
            content:"website"
        },
        {
            name: "twitter:card",
            content: "summary_large_image"
        },
        {
            name: "twitter:title",
            content: metaData?.title ,
        },
        {
            name: "twitter:description",
            content: metaData?.description ,
        },
        {
            name: "twitter:image",
            content: metaData?.image || '/default-image.png',
        }
      ],
    };
  }