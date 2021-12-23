import { lazy } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const pageLazyImport = (filename: string) =>
  lazy(() =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    new Promise<void>((resolve) => {
      resolve();
    }).then(() => import(`${filename}`))
  );

export default pageLazyImport;
