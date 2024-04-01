// ToDo- implement this custom hook
import { useState } from 'react';

function usePackageManagement(initialPackages) {
  const [packages, setPackages] = useState(initialPackages);

  const addPackage = (newPackage) => {
    setPackages([...packages, newPackage]);
  };

  const deletePackage = (packageId) => {
    setPackages(packages.filter(pkg => pkg.id !== packageId));
  };

  return { packages, addPackage, deletePackage };
}

export default usePackageManagement;
