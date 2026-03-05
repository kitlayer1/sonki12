import { createContextId } from "@builder.io/qwik";

export interface AppContext {
  mainBrandName?: any;
}

export const appContext = createContextId<AppContext>('app-context');