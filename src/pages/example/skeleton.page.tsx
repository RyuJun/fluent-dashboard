import { PageTitle } from 'shared/components/page-title';
import React from 'react';
import { SkeletonTable } from 'shared/components/skeleton';

const SkeletonExample: React.FC = () => {
  return (
    <>
      <PageTitle />
      <SkeletonTable />
    </>
  );
};

export default SkeletonExample;
